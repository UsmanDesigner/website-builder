"use client"

import { useState, useEffect } from "react"
import { ComponentSelector } from "@/components/component-selector"
import { EditorCanvas } from "@/components/editor-canvas"
import { StyleEditor } from "@/components/style-editor"
import { initialComponents } from "@/lib/initial-components"
import { initialStyles } from "@/lib/initial-styles"
import { ExportPanel } from "@/components/export-panel"
import { Button } from "@/components/ui/button"
import { Download } from 'lucide-react'
import type { ComponentType } from "@/lib/types"

export function WebsiteBuilder() {
  const [components, setComponents] = useState(initialComponents)
  const [selectedComponentId, setSelectedComponentId] = useState<string | null>(null)
  const [styles, setStyles] = useState(initialStyles)
  const [showExportPanel, setShowExportPanel] = useState(false)
  const [sectionIds, setSectionIds] = useState<string[]>([])

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

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Left Sidebar - Component Selection */}
      <div className="w-64 border-r border-border bg-card overflow-y-auto">
        <ComponentSelector onAddComponent={handleAddComponent} />
      </div>

      {/* Main Canvas */}
      <div className="flex-1 flex flex-col">
        {/* Top toolbar */}
        <div className="p-2 border-b flex justify-end gap-2 bg-card">
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
      <div className="w-80 border-l border-border bg-card overflow-y-auto">
        <StyleEditor
          selectedComponent={selectedComponent}
          styles={styles}
          onUpdateStyles={handleUpdateStyles}
          onUpdateComponent={handleUpdateComponent}
          sectionIds={sectionIds}
          allComponents={components}
        />
      </div>

      {/* Export Panel */}
      {showExportPanel && (
        <ExportPanel components={components} styles={styles} onClose={() => setShowExportPanel(false)} />
      )}
    </div>
  )
}
