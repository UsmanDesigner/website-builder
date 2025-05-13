"use client"

import { useRef } from "react"
import { useDrag, useDrop } from "react-dnd"
import { Trash2, Move, ChevronUp, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { ComponentType } from "@/lib/types"
import { headerTemplates } from "@/lib/header-templates"
import { contentTemplates } from "@/lib/content-templates"
import { portfolioTemplates } from "@/lib/portfolio-templates"
import { skillsTemplates } from "@/lib/skills-templates"
import { ecommerceTemplates } from "@/lib/ecommerce-templates"
import { footerTemplates } from "@/lib/footer-templates"

interface EditorCanvasProps {
  components: ComponentType[]
  selectedComponentId: string | null
  setSelectedComponentId: (id: string | null) => void
  onUpdateComponent: (id: string, updates: Partial<ComponentType>) => void
  onRemoveComponent: (id: string) => void
  onMoveComponent: (dragIndex: number, hoverIndex: number) => void
  styles: any
}

// Combine all templates for easier lookup
const allTemplates = [
  ...headerTemplates,
  ...contentTemplates,
  ...portfolioTemplates,
  ...skillsTemplates,
  ...ecommerceTemplates,
  ...footerTemplates,
]

// Helper function to ensure all component properties are properly initialized
const ensureComponentPropertiesInitialized = (component: ComponentType): ComponentType => {
  const updatedComponent = { ...component }

  // Initialize portfolio items if needed
  if (component.template === "portfolio-grid" || component.template === "portfolio-masonry") {
    updatedComponent.content.portfolioItems = component.content.portfolioItems || []
    updatedComponent.content.heading = component.content.heading || "My Portfolio"
    updatedComponent.content.subheading = component.content.subheading || "Check out my recent work"
  }

  // Initialize product items if needed
  if (component.template === "product-grid") {
    updatedComponent.content.products = component.content.products || []
    updatedComponent.content.columns = component.content.columns || 3
    updatedComponent.content.heading = component.content.heading || "Our Products"
    updatedComponent.content.subheading = component.content.subheading || "Browse our collection"
  }

  // Initialize skills if needed
  if (component.template === "skills-expertise") {
    updatedComponent.content.skills = component.content.skills || []
    updatedComponent.content.heading = component.content.heading || "Skills & Expertise"
    updatedComponent.content.subheading = component.content.subheading || "What I bring to the table"
  }

  // Initialize features if needed
  if (component.template === "features-grid") {
    updatedComponent.content.features = component.content.features || []
    updatedComponent.content.heading = component.content.heading || "Our Features"
  }

  // Initialize product detail properties if needed
  if (component.template === "product-detail") {
    updatedComponent.content.productImages = component.content.productImages || [null, null]
    updatedComponent.content.productFeatures = component.content.productFeatures || []
    updatedComponent.content.addToCartText = component.content.addToCartText || "Add to Cart"
  }

  return updatedComponent
}

const ComponentItem = ({
  component,
  index,
  isSelected,
  onSelect,
  onRemove,
  onMoveComponent,
  styles,
  componentsCount,
}: {
  component: ComponentType
  index: number
  isSelected: boolean
  onSelect: () => void
  onRemove: () => void
  onMoveComponent: (dragIndex: number, hoverIndex: number) => void
  styles: any
  componentsCount: number
}) => {
  const ref = useRef<HTMLDivElement>(null)

  // Initialize drag and drop
  const [{ isDragging }, drag] = useDrag({
    type: "COMPONENT",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const [, drop] = useDrop({
    accept: "COMPONENT",
    hover(item: { index: number }, monitor) {
      if (!ref.current) {
        return
      }

      const dragIndex = item.index
      const hoverIndex = index

      if (dragIndex === hoverIndex) {
        return
      }

      onMoveComponent(dragIndex, hoverIndex)
      item.index = hoverIndex
    },
  })

  drag(drop(ref))

  // Find the template for this component
  const template = allTemplates.find((t) => t.id === component.template)

  if (!template) {
    return (
      <div className="p-4 border border-red-500 my-2 rounded">
        <p className="text-red-500">Template not found: {component.template}</p>
      </div>
    )
  }

  // Ensure component has all required properties
  const initializedComponent = ensureComponentPropertiesInitialized(component)

  return (
    <div
      ref={ref}
      className={`relative my-4 ${isDragging ? "opacity-50" : ""} ${
        isSelected ? "ring-2 ring-primary ring-offset-2" : ""
      }`}
      onClick={onSelect}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <div className="absolute -top-3 right-2 z-10 flex gap-1">
        <Button
          size="icon"
          variant="outline"
          className="h-6 w-6 bg-background"
          onClick={(e) => {
            e.stopPropagation()
            onMoveComponent(index, Math.max(0, index - 1))
          }}
          disabled={index === 0}
        >
          <ChevronUp className="h-4 w-4" />
        </Button>
        <Button
          size="icon"
          variant="outline"
          className="h-6 w-6 bg-background"
          onClick={(e) => {
            e.stopPropagation()
            onMoveComponent(index, Math.min(componentsCount - 1, index + 1))
          }}
          disabled={index === componentsCount - 1}
        >
          <ChevronDown className="h-4 w-4" />
        </Button>
        <Button
          size="icon"
          variant="outline"
          className="h-6 w-6 bg-background cursor-move"
          onClick={(e) => e.stopPropagation()}
        >
          <Move className="h-4 w-4" />
        </Button>
        <Button
          size="icon"
          variant="outline"
          className="h-6 w-6 bg-background"
          onClick={(e) => {
            e.stopPropagation()
            onRemove()
          }}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      <div
        className={`overflow-hidden ${isSelected ? "outline outline-2 outline-primary" : "outline outline-1 outline-border"}`}
        style={{
          backgroundColor: initializedComponent.styles.backgroundColor || styles.backgroundColor,
          padding: `${initializedComponent.styles.padding || styles.padding}px`,
          color: initializedComponent.styles.color || styles.textColor,
          fontFamily: initializedComponent.styles.fontFamily
            ? initializedComponent.styles.fontFamily === "sans"
              ? "ui-sans-serif, system-ui, sans-serif"
              : initializedComponent.styles.fontFamily === "serif"
                ? "ui-serif, Georgia, serif"
                : "ui-monospace, monospace"
            : styles.fontFamily === "sans"
              ? "ui-sans-serif, system-ui, sans-serif"
              : styles.fontFamily === "serif"
                ? "ui-serif, Georgia, serif"
                : "ui-monospace, monospace",
          fontSize: `${initializedComponent.styles.fontSize || styles.fontSize}px`,
          textAlign: initializedComponent.styles.textAlign || "left",
          fontWeight: initializedComponent.styles.fontWeight || "normal",
          fontStyle: initializedComponent.styles.fontStyle || "normal",
          textDecoration: initializedComponent.styles.textDecoration || "none",
          borderRadius: initializedComponent.styles.borderRadius
            ? `${initializedComponent.styles.borderRadius}px`
            : "0",
          width: initializedComponent.styles.width || "100%",
          height: initializedComponent.styles.height || "auto",
          backgroundImage:
            initializedComponent.styles.backgroundType === "image"
              ? `url(${initializedComponent.styles.backgroundImage})`
              : initializedComponent.styles.backgroundType === "gradient"
                ? initializedComponent.styles.gradientType === "linear"
                  ? `linear-gradient(${initializedComponent.styles.gradientDirection || "to right"}, ${initializedComponent.styles.gradientStartColor || "#ffffff"}, ${initializedComponent.styles.gradientEndColor || "#000000"})`
                  : `radial-gradient(circle, ${initializedComponent.styles.gradientStartColor || "#ffffff"}, ${initializedComponent.styles.gradientEndColor || "#000000"})`
                : initializedComponent.styles.backgroundType === "colorWithGradient"
                  ? initializedComponent.styles.gradientType === "linear"
                    ? `linear-gradient(${initializedComponent.styles.gradientDirection || "to right"}, ${initializedComponent.styles.gradientStartColor || "#ffffff"}${
                        initializedComponent.styles.gradientOpacity !== undefined
                          ? Math.round(initializedComponent.styles.gradientOpacity * 0.01 * 255)
                              .toString(16)
                              .padStart(2, "0")
                          : "ff"
                      }, ${initializedComponent.styles.gradientEndColor || "#000000"}${
                        initializedComponent.styles.gradientOpacity !== undefined
                          ? Math.round(initializedComponent.styles.gradientOpacity * 0.01 * 255)
                              .toString(16)
                              .padStart(2, "0")
                          : "ff"
                      }), url(${initializedComponent.styles.backgroundImage})`
                    : `radial-gradient(circle, ${initializedComponent.styles.gradientStartColor || "#ffffff"}${
                        initializedComponent.styles.gradientOpacity !== undefined
                          ? Math.round(initializedComponent.styles.gradientOpacity * 0.01 * 255)
                              .toString(16)
                              .padStart(2, "0")
                          : "ff"
                      }, ${initializedComponent.styles.gradientEndColor || "#000000"}${
                        initializedComponent.styles.gradientOpacity !== undefined
                          ? Math.round(initializedComponent.styles.gradientOpacity * 0.01 * 255)
                              .toString(16)
                              .padStart(2, "0")
                          : "ff"
                      }), url(${initializedComponent.styles.backgroundImage})`
                  : "none",
          backgroundSize: initializedComponent.styles.backgroundSize || "cover",
          backgroundPosition: initializedComponent.styles.backgroundPosition || "center",
          backgroundRepeat: initializedComponent.styles.backgroundRepeat || "no-repeat",
        }}
      >
        {template.render(initializedComponent.content, initializedComponent.styles)}
      </div>
    </div>
  )
}

export function EditorCanvas({
  components,
  selectedComponentId,
  setSelectedComponentId,
  onUpdateComponent,
  onRemoveComponent,
  onMoveComponent,
  styles,
}: EditorCanvasProps) {
  return (
    <div className="p-4 min-h-full">
      {components.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed rounded-lg p-6 text-center">
          <p className="text-muted-foreground mb-4">Your canvas is empty</p>
          <p className="text-sm text-muted-foreground">Add components from the left sidebar to get started</p>
        </div>
      ) : (
        components.map((component, index) => (
          <ComponentItem
            key={component.id}
            component={component}
            index={index}
            isSelected={selectedComponentId === component.id}
            onSelect={() => setSelectedComponentId(component.id)}
            onRemove={() => onRemoveComponent(component.id)}
            onMoveComponent={onMoveComponent}
            styles={styles}
            componentsCount={components.length}
          />
        ))
      )}
    </div>
  )
}
