"use client"

import type { ComponentType } from "@/lib/types"
import { contentTemplates } from "@/lib/component-templates"

interface ContentComponentProps {
  component: ComponentType
  styles: any
}

export function ContentComponent({ component, styles }: ContentComponentProps) {
  const template = contentTemplates.find((t) => t.id === component.template)

  if (!template) {
    return <div>Content template not found</div>
  }

  // Combine global styles with component-specific styles
  const combinedStyles = {
    fontFamily: component.styles.fontFamily || styles.fontFamily || "sans",
    fontSize: component.styles.fontSize || styles.fontSize || 16,
    color: component.styles.color || styles.textColor || "#000000",
    backgroundColor: component.styles.backgroundColor || styles.backgroundColor || "#ffffff",
    textAlign: component.styles.textAlign || "left",
    fontWeight: component.styles.fontWeight || "normal",
    fontStyle: component.styles.fontStyle || "normal",
    textDecoration: component.styles.textDecoration || "none",
    padding: component.styles.padding || styles.padding || 16,
    borderRadius: component.styles.borderRadius || styles.borderRadius || 0,
    width: component.styles.width || "full",
    borderWidth: component.styles.borderWidth || 0,
    borderColor: component.styles.borderColor || "#e5e7eb",
    boxShadow: component.styles.boxShadow || "none",
    backgroundImage: component.styles.backgroundImage || null,
    backgroundSize: component.styles.backgroundSize || "cover",
    backgroundPosition: component.styles.backgroundPosition || "center",
    backgroundRepeat: component.styles.backgroundRepeat || "repeat",
    backgroundOverlay: component.styles.backgroundOverlay || 0,
    backgroundType: component.styles.backgroundType || "color",
    backgroundGradient: component.styles.backgroundGradient || null,
  }

  // Apply styles to the component
  const containerStyle: any = {
    fontFamily:
      combinedStyles.fontFamily === "sans"
        ? "ui-sans-serif, system-ui, sans-serif"
        : combinedStyles.fontFamily === "serif"
          ? "ui-serif, Georgia, serif"
          : "ui-monospace, SFMono-Regular, monospace",
    fontSize: `${combinedStyles.fontSize}px`,
    color: combinedStyles.color,
    backgroundColor: combinedStyles.backgroundType === "color" ? combinedStyles.backgroundColor : "transparent",
    textAlign: combinedStyles.textAlign as any,
    fontWeight: combinedStyles.fontWeight,
    fontStyle: combinedStyles.fontStyle,
    textDecoration: combinedStyles.textDecoration,
    padding: `${combinedStyles.padding}px`,
    borderRadius: `${combinedStyles.borderRadius}px`,
    borderWidth: `${combinedStyles.borderWidth}px`,
    borderStyle: combinedStyles.borderWidth ? "solid" : "none",
    borderColor: combinedStyles.borderColor,
    position: "relative",
    overflow: "hidden",
  }

  // Add box shadow based on selection
  if (combinedStyles.boxShadow === "sm") {
    containerStyle.boxShadow = "0 1px 2px 0 rgba(0, 0, 0, 0.05)"
  } else if (combinedStyles.boxShadow === "md") {
    containerStyle.boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
  } else if (combinedStyles.boxShadow === "lg") {
    containerStyle.boxShadow = "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
  } else if (combinedStyles.boxShadow === "xl") {
    containerStyle.boxShadow = "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
  }

  // Generate background styles
  let backgroundElement = null

  if (combinedStyles.backgroundType === "image" && combinedStyles.backgroundImage) {
    backgroundElement = (
      <>
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url(${combinedStyles.backgroundImage})`,
            backgroundSize: combinedStyles.backgroundSize,
            backgroundPosition: combinedStyles.backgroundPosition,
            backgroundRepeat: combinedStyles.backgroundRepeat,
            zIndex: 0,
          }}
        />
        {combinedStyles.backgroundOverlay > 0 && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, " + combinedStyles.backgroundOverlay / 100 + ")",
              zIndex: 1,
            }}
          />
        )}
      </>
    )
  } else if (combinedStyles.backgroundType === "gradient" && combinedStyles.backgroundGradient) {
    const gradient = combinedStyles.backgroundGradient
    const colorStops = gradient.colors.map((c: any) => `${c.color} ${c.position}%`).join(", ")

    const gradientStyle =
      gradient.type === "linear"
        ? `linear-gradient(${gradient.direction}, ${colorStops})`
        : `radial-gradient(circle at center, ${colorStops})`

    backgroundElement = (
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: gradientStyle,
          zIndex: 0,
        }}
      />
    )
  }

  // Render the component with background
  return (
    <div style={containerStyle} className={combinedStyles.width !== "full" ? "max-w-screen-xl mx-auto" : ""}>
      {backgroundElement}
      <div style={{ position: "relative", zIndex: 2 }}>{template.render(component.content, combinedStyles)}</div>
    </div>
  )
}
