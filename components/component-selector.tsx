"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { LayoutTemplate, ListTree, FootprintsIcon as FooterIcon } from "lucide-react"
import { headerTemplates, contentTemplates, footerTemplates } from "@/lib/component-templates"
import type { ComponentType } from "@/lib/types"
import { v4 as uuidv4 } from "uuid"

interface ComponentSelectorProps {
  onAddComponent: (component: ComponentType) => void
}

export function ComponentSelector({ onAddComponent }: ComponentSelectorProps) {
  const [activeTab, setActiveTab] = useState("headers")

  const handleAddComponent = (template: any) => {
    onAddComponent({
      id: uuidv4(),
      type: activeTab.slice(0, -1), // Remove 's' from the end (headers -> header)
      template: template.id,
      content: template.defaultContent,
      styles: template.defaultStyles || {},
    })
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Components</h2>

      <Tabs defaultValue="headers" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="headers">
            <LayoutTemplate className="h-4 w-4 mr-2" />
            Headers
          </TabsTrigger>
          <TabsTrigger value="contents">
            <ListTree className="h-4 w-4 mr-2" />
            Content
          </TabsTrigger>
          <TabsTrigger value="footers">
            <FooterIcon className="h-4 w-4 mr-2" />
            Footers
          </TabsTrigger>
        </TabsList>

        <TabsContent value="headers" className="mt-0">
          <ScrollArea className="h-[calc(100vh-180px)]">
            <div className="space-y-4">
              {headerTemplates.map((template) => (
                <div key={template.id} className="border rounded-md p-2">
                  <div className="h-20 bg-muted rounded-md mb-2 flex items-center justify-center text-xs text-muted-foreground overflow-hidden">
                    {template.preview}
                  </div>
                  <Button variant="outline" size="sm" className="w-full" onClick={() => handleAddComponent(template)}>
                    {template.name}
                  </Button>
                </div>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="contents" className="mt-0">
          <ScrollArea className="h-[calc(100vh-180px)]">
            <div className="space-y-4">
              {contentTemplates.map((template) => (
                <div key={template.id} className="border rounded-md p-2">
                  <div className="h-20 bg-muted rounded-md mb-2 flex items-center justify-center text-xs text-muted-foreground overflow-hidden">
                    {template.preview}
                  </div>
                  <Button variant="outline" size="sm" className="w-full" onClick={() => handleAddComponent(template)}>
                    {template.name}
                  </Button>
                </div>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="footers" className="mt-0">
          <ScrollArea className="h-[calc(100vh-180px)]">
            <div className="space-y-4">
              {footerTemplates.map((template) => (
                <div key={template.id} className="border rounded-md p-2">
                  <div className="h-20 bg-muted rounded-md mb-2 flex items-center justify-center text-xs text-muted-foreground overflow-hidden">
                    {template.preview}
                  </div>
                  <Button variant="outline" size="sm" className="w-full" onClick={() => handleAddComponent(template)}>
                    {template.name}
                  </Button>
                </div>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  )
}
