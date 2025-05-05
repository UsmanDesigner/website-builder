"use client"

import { useRef } from "react"
import { useDrag, useDrop, DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import type { ComponentType } from "@/lib/types"
import { HeaderComponent } from "@/components/templates/header-component"
import { ContentComponent } from "@/components/templates/content-component"
import { FooterComponent } from "@/components/templates/footer-component"
import { Button } from "@/components/ui/button"
import { Trash2, MoveVertical, Edit } from 'lucide-react'

interface EditorCanvasProps {
  components: ComponentType[]
  selectedComponentId: string | null
  setSelectedComponentId: (id: string | null) => void
  onUpdateComponent: (id: string, updates: Partial<ComponentType>) => void
  onRemoveComponent: (id: string) => void
  onMoveComponent: (dragIndex: number, hoverIndex: number) => void
  styles: any
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
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-full p-4 flex flex-col">
        {components.length === 0 ? (
          <div className="flex items-center justify-center h-[calc(100vh-8rem)] border-2 border-dashed border-muted-foreground/20 rounded-lg">
            <div className="text-center">
              <p className="text-muted-foreground mb-4">Drag components from the left sidebar to start building</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {components.map((component, index) => (
              <DraggableComponent
                key={component.id}
                component={component}
                index={index}
                isSelected={component.id === selectedComponentId}
                onSelect={() => setSelectedComponentId(component.id)}
                onUpdate={onUpdateComponent}
                onRemove={onRemoveComponent}
                onMove={onMoveComponent}
                styles={styles}
              />
            ))}
          </div>
        )}
      </div>
    </DndProvider>
  )
}

interface DraggableComponentProps {
  component: ComponentType
  index: number
  isSelected: boolean
  onSelect: () => void
  onUpdate: (id: string, updates: Partial<ComponentType>) => void
  onRemove: (id: string) => void
  onMove: (dragIndex: number, hoverIndex: number) => void
  styles: any
}

function DraggableComponent({
  component,
  index,
  isSelected,
  onSelect,
  onUpdate,
  onRemove,
  onMove,
  styles,
}: DraggableComponentProps) {
  const ref = useRef<HTMLDivElement>(null)

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

      onMove(dragIndex, hoverIndex)
      item.index = hoverIndex
    },
  })

  drag(drop(ref))

  const renderComponent = () => {
    switch (component.type) {
      case "header":
        return <HeaderComponent component={component} styles={styles} />
      case "content":
        return <ContentComponent component={component} styles={styles} />
      case "footer":
        return <FooterComponent component={component} styles={styles} />
      default:
        return <div>Unknown component type</div>
    }
  }

  return (
    <div
      ref={ref}
      className={`relative border-2 rounded-md ${
        isSelected ? "border-primary" : "border-transparent"
      } ${isDragging ? "opacity-50" : "opacity-100"} ${component.type === "footer" ? "mt-auto" : ""}`}
      onClick={onSelect}
      style={{ cursor: isDragging ? "grabbing" : "pointer" }}
      id={component.content.sectionId || undefined}
    >
      {isSelected && (
        <div className="absolute top-2 right-2 z-10 flex gap-2 bg-background/80 p-1 rounded-md backdrop-blur-sm">
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation()
              onSelect()
            }}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="cursor-grab">
            <MoveVertical className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation()
              onRemove(component.id)
            }}
          >
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
        </div>
      )}
      {component.content.sectionId && (
        <div className="absolute top-2 left-2 z-10 bg-background/80 px-2 py-1 rounded-md text-xs text-muted-foreground backdrop-blur-sm">
          #{component.content.sectionId}
        </div>
      )}
      {renderComponent()}
    </div>
  )
}
