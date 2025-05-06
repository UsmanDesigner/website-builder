"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { headerTemplates, contentTemplates, footerTemplates } from "@/lib/component-templates"
import { v4 as uuidv4 } from "uuid"
import type { ComponentType } from "@/lib/types"

interface ComponentSelectorProps {
  onAddComponent: (component: ComponentType) => void
}

export function ComponentSelector({ onAddComponent }: ComponentSelectorProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredHeaders = headerTemplates.filter((template) =>
    template.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredContent = contentTemplates.filter((template) =>
    template.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredFooters = footerTemplates.filter((template) =>
    template.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddComponent = (type: "header" | "content" | "footer", templateId: string) => {
    let template

    if (type === "header") {
      template = headerTemplates.find((t) => t.id === templateId)
    } else if (type === "content") {
      template = contentTemplates.find((t) => t.id === templateId)
    } else {
      template = footerTemplates.find((t) => t.id === templateId)
    }

    if (template) {
      const newComponent: ComponentType = {
        id: uuidv4(),
        type,
        template: templateId,
        content: { ...template.defaultContent },
        styles: { ...template.defaultStyles },
      }

      onAddComponent(newComponent)
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b">
        <h2 className="text-xl font-bold mb-4">Add Components</h2>
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search components..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="header" className="flex-1 flex flex-col">
        <TabsList className="grid grid-cols-3 mx-4 mt-2">
          <TabsTrigger value="header">Headers</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="footer">Footers</TabsTrigger>
        </TabsList>

        <TabsContent value="header" className="flex-1 p-0 m-0">
          <ScrollArea className="h-full">
            <div className="p-4 grid grid-cols-1 gap-4">
              {filteredHeaders.length > 0 ? (
                filteredHeaders.map((template) => (
                  <ComponentCard
                    key={template.id}
                    name={template.name}
                    preview={template.preview}
                    onClick={() => handleAddComponent("header", template.id)}
                  />
                ))
              ) : (
                <p className="text-center text-muted-foreground py-8">No headers found</p>
              )}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="content" className="flex-1 p-0 m-0">
          <ScrollArea className="h-full">
            <div className="p-4 grid grid-cols-1 gap-4">
              {filteredContent.length > 0 ? (
                filteredContent.map((template) => (
                  <ComponentCard
                    key={template.id}
                    name={template.name}
                    preview={template.preview}
                    onClick={() => handleAddComponent("content", template.id)}
                  />
                ))
              ) : (
                <p className="text-center text-muted-foreground py-8">No content sections found</p>
              )}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="footer" className="flex-1 p-0 m-0">
          <ScrollArea className="h-full">
            <div className="p-4 grid grid-cols-1 gap-4">
              {filteredFooters.length > 0 ? (
                filteredFooters.map((template) => (
                  <ComponentCard
                    key={template.id}
                    name={template.name}
                    preview={template.preview}
                    onClick={() => handleAddComponent("footer", template.id)}
                  />
                ))
              ) : (
                <p className="text-center text-muted-foreground py-8">No footers found</p>
              )}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  )
}

interface ComponentCardProps {
  name: string
  preview: string
  onClick: () => void
}

function ComponentCard({ name, preview, onClick }: ComponentCardProps) {
  return (
    <div
      className="border rounded-md overflow-hidden cursor-pointer hover:border-primary transition-colors"
      onClick={onClick}
    >
      <div className="p-3 border-b bg-muted/50">
        <div className="h-20 flex items-center justify-center bg-background rounded">
          <span className="text-sm text-muted-foreground">{preview}</span>
        </div>
      </div>
      <div className="p-3 flex justify-between items-center">
        <span className="font-medium">{name}</span>
        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Add {name}</span>
          <span className="text-lg">+</span>
        </Button>
      </div>
    </div>
  )
}
