"use client"

import { useState, useEffect } from "react"
import { ComponentSelector } from "@/components/component-selector"
import { EditorCanvas } from "@/components/editor-canvas"
import { StyleEditor } from "@/components/style-editor"
import { initialComponents } from "@/lib/initial-components"
import { initialStyles } from "@/lib/initial-styles"
import { ExportPanel } from "@/components/export-panel"
import { Button } from "@/components/ui/button"
import { Download, PanelLeft, PanelRight, X } from "lucide-react"
import type { ComponentType } from "@/lib/types"
import { useMediaQuery } from "@/hooks/use-media-query"

export function WebsiteBuilder() {
  const [components, setComponents] = useState(initialComponents)
  const [selectedComponentId, setSelectedComponentId] = useState<string | null>(null)
  const [styles, setStyles] = useState(initialStyles)
  const [showExportPanel, setShowExportPanel] = useState(false)
  const [sectionIds, setSectionIds] = useState<string[]>([])
  const [leftPanelOpen, setLeftPanelOpen] = useState(true)
  const [rightPanelOpen, setRightPanelOpen] = useState(true)

  const isDesktop = useMediaQuery("(min-width: 1024px)")

  // Close panels on mobile by default
  useEffect(() => {
    if (!isDesktop) {
      setLeftPanelOpen(false)
      setRightPanelOpen(false)
    } else {
      setLeftPanelOpen(true)
      setRightPanelOpen(true)
    }
  }, [isDesktop])

  const selectedComponent = selectedComponentId ? components.find((c) => c.id === selectedComponentId) : null

  // Update section IDs whenever components change
  useEffect(() => {
    const ids = components
      .filter((component) => component.content.sectionId)
      .map((component) => component.content.sectionId)
    setSectionIds(ids)
  }, [components])

  const handleAddComponent = (component: ComponentType) => {
    setComponents([...components, component])
    // On mobile, close the component selector after adding a component
    if (!isDesktop) {
      setLeftPanelOpen(false)
    }
  }

  const handleUpdateComponent = (id: string, updates: Partial<ComponentType>) => {
    setComponents(components.map((comp) => (comp.id === id ? { ...comp, ...updates } : comp)))
  }

  const handleRemoveComponent = (id: string) => {
    setComponents(components.filter((comp) => comp.id !== id))
    if (selectedComponentId === id) {
      setSelectedComponentId(null)
    }
  }

  const handleUpdateStyles = (newStyles: any) => {
    setStyles({ ...styles, ...newStyles })
  }

  const handleMoveComponent = (dragIndex: number, hoverIndex: number) => {
    const draggedComponent = components[dragIndex]
    const newComponents = [...components]
    newComponents.splice(dragIndex, 1)
    newComponents.splice(hoverIndex, 0, draggedComponent)
    setComponents(newComponents)
  }

  // When a component is selected, automatically open the style editor on mobile
  useEffect(() => {
    if (selectedComponentId && !isDesktop) {
      setRightPanelOpen(true)
    }
  }, [selectedComponentId, isDesktop])

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Left Sidebar - Component Selection */}
      <div
        className={`${
          leftPanelOpen ? "w-64" : "w-0"
        } border-r border-border bg-card overflow-y-auto transition-all duration-300 absolute md:relative z-10 h-full`}
      >
        {leftPanelOpen && (
          <div className="relative h-full">
            <ComponentSelector onAddComponent={handleAddComponent} />
            {!isDesktop && (
              <Button
                size="sm"
                variant="ghost"
                className="absolute top-2 right-2 h-8 w-8 p-0"
                onClick={() => setLeftPanelOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Main Canvas */}
      <div className="flex-1 flex flex-col">
        {/* Top toolbar */}
        <div className="p-2 border-b flex justify-between gap-2 bg-card">
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={() => setLeftPanelOpen(!leftPanelOpen)} className="md:hidden">
              <PanelLeft className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setRightPanelOpen(!rightPanelOpen)}
              className="md:hidden"
            >
              <PanelRight className="h-4 w-4" />
            </Button>
          </div>
          <Button size="sm" variant="outline" onClick={() => setShowExportPanel(true)}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>

        {/* Canvas area */}
        <div className="flex-1 overflow-y-auto bg-muted/30 flex flex-col">
          <EditorCanvas
            components={components}
            selectedComponentId={selectedComponentId}
            setSelectedComponentId={setSelectedComponentId}
            onUpdateComponent={handleUpdateComponent}
            onRemoveComponent={handleRemoveComponent}
            onMoveComponent={handleMoveComponent}
            styles={styles}
          />
        </div>
      </div>

      {/* Right Sidebar - Style Editing */}
      <div
        className={`${
          rightPanelOpen ? "w-80" : "w-0"
        } border-l border-border bg-card overflow-y-auto transition-all duration-300 absolute md:relative right-0 z-10 h-full`}
      >
        {rightPanelOpen && (
          <div className="relative h-full">
            <StyleEditor
              selectedComponent={selectedComponent}
              styles={styles}
              onUpdateStyles={handleUpdateStyles}
              onUpdateComponent={handleUpdateComponent}
              sectionIds={sectionIds}
              allComponents={components}
              onClose={() => !isDesktop && setRightPanelOpen(false)}
            />
            {!isDesktop && !selectedComponent && (
              <Button
                size="sm"
                variant="ghost"
                className="absolute top-2 right-2 h-8 w-8 p-0"
                onClick={() => setRightPanelOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Export Panel */}
      {showExportPanel && (
        <ExportPanel components={components} styles={styles} onClose={() => setShowExportPanel(false)} />
      )}
    </div>
  )
}
