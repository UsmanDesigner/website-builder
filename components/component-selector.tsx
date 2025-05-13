"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { v4 as uuidv4 } from "uuid"
import type { ComponentType } from "@/lib/types"

// Import all template categories
import { headerTemplates } from "@/lib/header-templates"
import { contentTemplates as baseContentTemplates } from "@/lib/content-templates"
import { portfolioTemplates } from "@/lib/portfolio-templates"
import { skillsTemplates } from "@/lib/skills-templates"
import { ecommerceTemplates } from "@/lib/ecommerce-templates"
import { footerTemplates } from "@/lib/footer-templates"

// Combine all content-related templates
const allContentTemplates = [...baseContentTemplates, ...portfolioTemplates, ...skillsTemplates, ...ecommerceTemplates]

interface ComponentSelectorProps {
  onAddComponent: (component: ComponentType) => void
}

export function ComponentSelector({ onAddComponent }: ComponentSelectorProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("content")

  const filteredHeaderTemplates = headerTemplates.filter(
    (template) =>
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.preview.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const filteredContentTemplates = allContentTemplates.filter(
    (template) =>
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.preview.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const filteredFooterTemplates = footerTemplates.filter(
    (template) =>
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.preview.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleAddComponent = (type: "header" | "content" | "footer", templateId: string) => {
    let template

    if (type === "header") {
      template = headerTemplates.find((t) => t.id === templateId)
    } else if (type === "content") {
      template = allContentTemplates.find((t) => t.id === templateId)
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
    <div className="border rounded-md shadow-sm bg-background">
      <div className="p-4 border-b">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search components..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="content" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full justify-start rounded-none border-b p-0">
          <TabsTrigger
            value="header"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
          >
            Headers
          </TabsTrigger>
          <TabsTrigger
            value="content"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
          >
            Content
          </TabsTrigger>
          <TabsTrigger
            value="footer"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
          >
            Footers
          </TabsTrigger>
        </TabsList>
        <ScrollArea className="h-full">
          <TabsContent value="header" className="p-4 m-0">
            <div className="grid grid-cols-1 gap-4">
              {filteredHeaderTemplates.length > 0 ? (
                filteredHeaderTemplates.map((template) => (
                  <div
                    key={template.id}
                    className="border rounded-md p-4 hover:border-primary transition-colors cursor-pointer"
                    onClick={() => handleAddComponent("header", template.id)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{template.name}</h3>
                        <p className="text-sm text-muted-foreground">{template.preview}</p>
                      </div>
                      <Button size="sm" variant="outline" onClick={() => handleAddComponent("header", template.id)}>
                        Add
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-muted-foreground py-4">No header templates found</p>
              )}
            </div>
          </TabsContent>
          <TabsContent value="content" className="p-4 m-0">
            <div className="grid grid-cols-1 gap-4">
              {filteredContentTemplates.length > 0 ? (
                filteredContentTemplates.map((template) => (
                  <div
                    key={template.id}
                    className="border rounded-md p-4 hover:border-primary transition-colors cursor-pointer"
                    onClick={() => handleAddComponent("content", template.id)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{template.name}</h3>
                        <p className="text-sm text-muted-foreground">{template.preview}</p>
                      </div>
                      <Button size="sm" variant="outline" onClick={() => handleAddComponent("content", template.id)}>
                        Add
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-muted-foreground py-4">No content templates found</p>
              )}
            </div>
          </TabsContent>
          <TabsContent value="footer" className="p-4 m-0">
            <div className="grid grid-cols-1 gap-4">
              {filteredFooterTemplates.length > 0 ? (
                filteredFooterTemplates.map((template) => (
                  <div
                    key={template.id}
                    className="border rounded-md p-4 hover:border-primary transition-colors cursor-pointer"
                    onClick={() => handleAddComponent("footer", template.id)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{template.name}</h3>
                        <p className="text-sm text-muted-foreground">{template.preview}</p>
                      </div>
                      <Button size="sm" variant="outline" onClick={() => handleAddComponent("footer", template.id)}>
                        Add
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-muted-foreground py-4">No footer templates found</p>
              )}
            </div>
          </TabsContent>
        </ScrollArea>
      </Tabs>
    </div>
  )
}
