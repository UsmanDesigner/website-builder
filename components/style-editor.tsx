"use client"

import type React from "react"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import {
  Type,
  Palette,
  Layout,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Bold,
  Italic,
  Underline,
  ImageIcon,
  Trash2,
  Plus,
  Minus,
  LinkIcon,
  Anchor,
  ExternalLink,
} from "lucide-react"
import type { ComponentType } from "@/lib/types"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { GradientPicker } from "@/components/gradient-picker"
import { Switch } from "@/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface StyleEditorProps {
  selectedComponent: ComponentType | null
  styles: any
  onUpdateStyles: (styles: any) => void
  onUpdateComponent: (id: string, updates: Partial<ComponentType>) => void
  sectionIds: string[]
  allComponents: ComponentType[]
}

export function StyleEditor({
  selectedComponent,
  styles,
  onUpdateStyles,
  onUpdateComponent,
  sectionIds,
  allComponents,
}: StyleEditorProps) {
  const [activeTab, setActiveTab] = useState("typography")

  if (!selectedComponent) {
    return (
      <div className="p-6 text-center">
        <p className="text-muted-foreground">Select a component to edit its styles</p>
      </div>
    )
  }

  const updateComponentContent = (key: string, value: any) => {
    if (!selectedComponent) return

    const updatedContent = {
      ...selectedComponent.content,
      [key]: value,
    }

    onUpdateComponent(selectedComponent.id, {
      content: updatedContent,
    })
  }

  const updateComponentStyle = (key: string, value: any) => {
    if (!selectedComponent) return

    const updatedStyles = {
      ...selectedComponent.styles,
      [key]: value,
    }

    onUpdateComponent(selectedComponent.id, {
      styles: updatedStyles,
    })
  }

  const updateGlobalStyle = (key: string, value: any) => {
    onUpdateStyles({
      [key]: value,
    })
  }

  // Handle logo image upload
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        updateComponentContent("logoImage", event.target?.result)
      }
      reader.readAsDataURL(file)
    }
  }

  // Handle background image upload
  const handleBackgroundImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        updateComponentStyle("backgroundImage", event.target?.result)
      }
      reader.readAsDataURL(file)
    }
  }

  // Handle content image upload
  const handleContentImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        updateComponentContent("image", event.target?.result)
      }
      reader.readAsDataURL(file)
    }
  }

  // Handle feature image upload
  const handleFeatureImageUpload = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && selectedComponent.content.features) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const updatedFeatures = [...selectedComponent.content.features]
        updatedFeatures[index] = { ...updatedFeatures[index], image: event.target?.result }
        updateComponentContent("features", updatedFeatures)
      }
      reader.readAsDataURL(file)
    }
  }

  // Add a new button to the component
  const handleAddButton = () => {
    if (!selectedComponent || selectedComponent.type !== "content") return

    const currentButtons = selectedComponent.content.buttons || []
    const newButton = {
      text: "New Button",
      variant: "outline",
      borderRadius: 4,
      url: "#",
      linkType: "external",
      targetSection: "",
    }

    updateComponentContent("buttons", [...currentButtons, newButton])
  }

  // Remove a button from the component
  const handleRemoveButton = (index: number) => {
    if (!selectedComponent || selectedComponent.type !== "content") return

    const currentButtons = [...(selectedComponent.content.buttons || [])]
    currentButtons.splice(index, 1)
    updateComponentContent("buttons", currentButtons)
  }

  // Update menu item URL
  const updateMenuItemUrl = (index: number, url: string) => {
    if (!selectedComponent || !selectedComponent.content.menuItems) return

    const updatedMenuItems = [...(selectedComponent.content.menuItemUrls || [])]
    updatedMenuItems[index] = url
    updateComponentContent("menuItemUrls", updatedMenuItems)
  }

  // Update menu item link type
  const updateMenuItemLinkType = (index: number, linkType: string) => {
    if (!selectedComponent || !selectedComponent.content.menuItems) return

    const updatedLinkTypes = [...(selectedComponent.content.menuItemLinkTypes || [])]
    updatedLinkTypes[index] = linkType
    updateComponentContent("menuItemLinkTypes", updatedLinkTypes)
  }

  // Update menu item target section
  const updateMenuItemTargetSection = (index: number, sectionId: string) => {
    if (!selectedComponent || !selectedComponent.content.menuItems) return

    const updatedTargetSections = [...(selectedComponent.content.menuItemTargetSections || [])]
    updatedTargetSections[index] = sectionId
    updateComponentContent("menuItemTargetSections", updatedTargetSections)
  }

  // Update footer link URL
  const updateFooterLinkUrl = (index: number, url: string) => {
    if (!selectedComponent || !selectedComponent.content.links) return

    const updatedLinkUrls = [...(selectedComponent.content.linkUrls || [])]
    updatedLinkUrls[index] = url
    updateComponentContent("linkUrls", updatedLinkUrls)
  }

  // Update footer link type
  const updateFooterLinkType = (index: number, linkType: string) => {
    if (!selectedComponent || !selectedComponent.content.links) return

    const updatedLinkTypes = [...(selectedComponent.content.linkTypes || [])]
    updatedLinkTypes[index] = linkType
    updateComponentContent("linkTypes", updatedLinkTypes)
  }

  // Update footer link target section
  const updateFooterLinkTargetSection = (index: number, sectionId: string) => {
    if (!selectedComponent || !selectedComponent.content.links) return

    const updatedTargetSections = [...(selectedComponent.content.linkTargetSections || [])]
    updatedTargetSections[index] = sectionId
    updateComponentContent("linkTargetSections", updatedTargetSections)
  }

  // Generate a unique section ID suggestion
  const generateSectionIdSuggestion = () => {
    const baseId =
      selectedComponent.type === "header"
        ? "header"
        : selectedComponent.type === "footer"
          ? "footer"
          : selectedComponent.content.heading
            ? selectedComponent.content.heading
                .toLowerCase()
                .replace(/\s+/g, "-")
                .replace(/[^a-z0-9-]/g, "")
            : `section-${allComponents.indexOf(selectedComponent) + 1}`

    // Check if this ID already exists
    if (!sectionIds.includes(baseId)) {
      return baseId
    }

    // If it exists, add a number
    let counter = 1
    let newId = `${baseId}-${counter}`
    while (sectionIds.includes(newId)) {
      counter++
      newId = `${baseId}-${counter}`
    }

    return newId
  }

  // Find any buttons in the component content
  const hasButtons = selectedComponent.type === "content" && selectedComponent.content.buttons

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Style Editor</h2>

      <div className="mb-6">
        <h3 className="font-medium mb-2">Component Content</h3>

        {/* Section ID for all component types */}
        <div className="mb-4 p-3 border rounded-md">
          <div className="flex items-center justify-between mb-2">
            <Label htmlFor="sectionId" className="font-medium">
              Section ID
            </Label>
            {!selectedComponent.content.sectionId && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => updateComponentContent("sectionId", generateSectionIdSuggestion())}
              >
                Generate ID
              </Button>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Anchor className="h-4 w-4 text-muted-foreground" />
            <Input
              id="sectionId"
              value={selectedComponent.content.sectionId || ""}
              onChange={(e) => updateComponentContent("sectionId", e.target.value)}
              placeholder="Enter a unique section ID"
            />
          </div>
          <p className="text-xs text-muted-foreground mt-1">This ID can be used to link directly to this section</p>
        </div>

        {selectedComponent.type === "header" && (
          <>
            <div className="mb-4">
              <div className="flex items-center justify-between mb-1">
                <Label htmlFor="showLogoText">Show Logo Text</Label>
                <Switch
                  id="showLogoText"
                  checked={selectedComponent.content.showLogoText !== false}
                  onCheckedChange={(checked) => updateComponentContent("showLogoText", checked)}
                />
              </div>

              {selectedComponent.content.showLogoText !== false && (
                <div className="mt-2">
                  <Label htmlFor="logoText" className="mb-1 block">
                    Logo Text
                  </Label>
                  <Input
                    id="logoText"
                    value={selectedComponent.content.logoText || ""}
                    onChange={(e) => updateComponentContent("logoText", e.target.value)}
                  />
                </div>
              )}
            </div>
            <div className="mb-4">
              <Label htmlFor="logoImage" className="mb-1 block">
                Logo Image
              </Label>
              <div className="flex flex-col gap-2">
                {selectedComponent.content.logoImage && (
                  <div className="relative w-32 h-12 mb-2 border rounded overflow-hidden">
                    <img
                      src={selectedComponent.content.logoImage || "/placeholder.svg"}
                      alt="Logo"
                      className="object-contain w-full h-full"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-0 right-0 bg-background/80 rounded-full h-5 w-5"
                      onClick={() => updateComponentContent("logoImage", null)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                )}
                <Input id="logoImage" type="file" accept="image/*" onChange={handleLogoUpload} className="text-sm" />
              </div>
            </div>
            <div className="mb-4">
              <Label htmlFor="menuItems" className="mb-1 block">
                Menu Items (comma separated)
              </Label>
              <Input
                id="menuItems"
                value={selectedComponent.content.menuItems?.join(", ") || ""}
                onChange={(e) =>
                  updateComponentContent(
                    "menuItems",
                    e.target.value.split(",").map((item) => item.trim()),
                  )
                }
              />
            </div>

            {/* Menu Item URLs */}
            {selectedComponent.content.menuItems && selectedComponent.content.menuItems.length > 0 && (
              <div className="mb-4 border rounded-md p-3">
                <Label className="mb-2 block font-medium">Menu Item Links</Label>
                {selectedComponent.content.menuItems.map((item: string, index: number) => (
                  <div key={index} className="mb-4 pb-3 border-b last:border-b-0 last:mb-0 last:pb-0">
                    <Label className="text-sm font-medium mb-2 block">{item}</Label>

                    <RadioGroup
                      value={(selectedComponent.content.menuItemLinkTypes || [])[index] || "external"}
                      onValueChange={(value) => updateMenuItemLinkType(index, value)}
                      className="mb-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="external" id={`link-type-external-${index}`} />
                        <Label htmlFor={`link-type-external-${index}`} className="flex items-center">
                          <ExternalLink className="h-3 w-3 mr-1" /> External URL
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="section" id={`link-type-section-${index}`} />
                        <Label htmlFor={`link-type-section-${index}`} className="flex items-center">
                          <Anchor className="h-3 w-3 mr-1" /> Section Link
                        </Label>
                      </div>
                    </RadioGroup>

                    {((selectedComponent.content.menuItemLinkTypes || [])[index] || "external") === "external" ? (
                      <div className="flex items-center gap-2">
                        <LinkIcon className="h-3 w-3 text-muted-foreground" />
                        <Input
                          value={(selectedComponent.content.menuItemUrls || [])[index] || "#"}
                          onChange={(e) => updateMenuItemUrl(index, e.target.value)}
                          placeholder="https://example.com"
                          className="text-xs"
                        />
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Anchor className="h-3 w-3 text-muted-foreground" />
                        <Select
                          value={(selectedComponent.content.menuItemTargetSections || [])[index] || ""}
                          onValueChange={(value) => updateMenuItemTargetSection(index, value)}
                        >
                          <SelectTrigger className="text-xs">
                            <SelectValue placeholder="Select a section" />
                          </SelectTrigger>
                          <SelectContent>
                            {sectionIds.length > 0 ? (
                              sectionIds.map((id) => (
                                <SelectItem key={id} value={id}>
                                  {id}
                                </SelectItem>
                              ))
                            ) : (
                              <SelectItem value="" disabled>
                                No sections available
                              </SelectItem>
                            )}
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {selectedComponent.type === "content" && (
          <>
            <div className="mb-4">
              <Label htmlFor="heading" className="mb-1 block">
                Heading
              </Label>
              <Input
                id="heading"
                value={selectedComponent.content.heading || ""}
                onChange={(e) => updateComponentContent("heading", e.target.value)}
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="subheading" className="mb-1 block">
                Subheading
              </Label>
              <Input
                id="subheading"
                value={selectedComponent.content.subheading || ""}
                onChange={(e) => updateComponentContent("subheading", e.target.value)}
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="text" className="mb-1 block">
                Text Content
              </Label>
              <textarea
                id="text"
                className="w-full min-h-[100px] rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                value={selectedComponent.content.text || ""}
                onChange={(e) => updateComponentContent("text", e.target.value)}
              />
            </div>

            {/* Image upload for text-with-image template */}
            {selectedComponent.template === "text-with-image" && (
              <div className="mb-4">
                <Label htmlFor="contentImage" className="mb-1 block">
                  Content Image
                </Label>
                <div className="flex flex-col gap-2">
                  {selectedComponent.content.image && (
                    <div className="relative w-full h-32 mb-2 border rounded overflow-hidden">
                      <img
                        src={selectedComponent.content.image || "/placeholder.svg"}
                        alt="Content"
                        className="object-cover w-full h-full"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 bg-background/80 rounded-full"
                        onClick={() => updateComponentContent("image", null)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                  <Input
                    id="contentImage"
                    type="file"
                    accept="image/*"
                    onChange={handleContentImageUpload}
                    className="text-sm"
                  />
                </div>
              </div>
            )}

            {/* Feature images for features-grid template */}
            {selectedComponent.template === "features-grid" && selectedComponent.content.features && (
              <div className="mb-4 border-t pt-4">
                <h4 className="font-medium mb-3">Feature Images</h4>
                {selectedComponent.content.features.map((feature: any, index: number) => (
                  <div key={index} className="mb-4 p-3 border rounded-md">
                    <Label className="mb-1 block font-medium">{feature.title} Image</Label>
                    <div className="flex flex-col gap-2">
                      {feature.image && (
                        <div className="relative w-full h-24 mb-2 border rounded overflow-hidden">
                          <img
                            src={feature.image || "/placeholder.svg"}
                            alt={feature.title}
                            className="object-cover w-full h-full"
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            className="absolute top-2 right-2 bg-background/80 rounded-full"
                            onClick={() => {
                              const updatedFeatures = [...selectedComponent.content.features]
                              updatedFeatures[index] = { ...feature, image: null }
                              updateComponentContent("features", updatedFeatures)
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFeatureImageUpload(index, e)}
                        className="text-sm"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Buttons section with add/remove functionality */}
            <div className="mb-4 border-t pt-4">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium">Buttons</h4>
                <Button size="sm" variant="outline" onClick={handleAddButton}>
                  <Plus className="h-3 w-3 mr-1" />
                  Add Button
                </Button>
              </div>

              {selectedComponent.content.buttons && selectedComponent.content.buttons.length > 0 ? (
                selectedComponent.content.buttons.map((button: any, index: number) => (
                  <div key={index} className="mb-4 p-3 border rounded-md relative">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="absolute top-2 right-2 h-6 w-6 p-0"
                      onClick={() => handleRemoveButton(index)}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <div className="mb-2">
                      <Label htmlFor={`button-${index}-text`} className="mb-1 block">
                        Button {index + 1} Text
                      </Label>
                      <Input
                        id={`button-${index}-text`}
                        value={button.text || ""}
                        onChange={(e) => {
                          const updatedButtons = [...selectedComponent.content.buttons]
                          updatedButtons[index] = { ...button, text: e.target.value }
                          updateComponentContent("buttons", updatedButtons)
                        }}
                      />
                    </div>

                    <div className="mb-3">
                      <Label className="mb-1 block">Link Type</Label>
                      <RadioGroup
                        value={button.linkType || "external"}
                        onValueChange={(value) => {
                          const updatedButtons = [...selectedComponent.content.buttons]
                          updatedButtons[index] = { ...button, linkType: value }
                          updateComponentContent("buttons", updatedButtons)
                        }}
                        className="mb-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="external" id={`button-${index}-link-external`} />
                          <Label htmlFor={`button-${index}-link-external`} className="flex items-center">
                            <ExternalLink className="h-3 w-3 mr-1" /> External URL
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="section" id={`button-${index}-link-section`} />
                          <Label htmlFor={`button-${index}-link-section`} className="flex items-center">
                            <Anchor className="h-3 w-3 mr-1" /> Section Link
                          </Label>
                        </div>
                      </RadioGroup>

                      {(button.linkType || "external") === "external" ? (
                        <div className="flex items-center gap-2">
                          <LinkIcon className="h-3 w-3 text-muted-foreground" />
                          <Input
                            id={`button-${index}-url`}
                            value={button.url || "#"}
                            onChange={(e) => {
                              const updatedButtons = [...selectedComponent.content.buttons]
                              updatedButtons[index] = { ...button, url: e.target.value }
                              updateComponentContent("buttons", updatedButtons)
                            }}
                            placeholder="https://example.com"
                          />
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Anchor className="h-3 w-3 text-muted-foreground" />
                          <Select
                            value={button.targetSection || ""}
                            onValueChange={(value) => {
                              const updatedButtons = [...selectedComponent.content.buttons]
                              updatedButtons[index] = { ...button, targetSection: value }
                              updateComponentContent("buttons", updatedButtons)
                            }}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select a section" />
                            </SelectTrigger>
                            <SelectContent>
                              {sectionIds.length > 0 ? (
                                sectionIds.map((id) => (
                                  <SelectItem key={id} value={id}>
                                    {id}
                                  </SelectItem>
                                ))
                              ) : (
                                <SelectItem value="" disabled>
                                  No sections available
                                </SelectItem>
                              )}
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                    </div>

                    <div className="mb-2">
                      <Label htmlFor={`button-${index}-variant`} className="mb-1 block">
                        Button Style
                      </Label>
                      <Select
                        value={button.variant || "primary"}
                        onValueChange={(value) => {
                          const updatedButtons = [...selectedComponent.content.buttons]
                          updatedButtons[index] = { ...button, variant: value }
                          updateComponentContent("buttons", updatedButtons)
                        }}
                      >
                        <SelectTrigger id={`button-${index}-variant`}>
                          <SelectValue placeholder="Select style" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="primary">Primary</SelectItem>
                          <SelectItem value="secondary">Secondary</SelectItem>
                          <SelectItem value="outline">Outline</SelectItem>
                          <SelectItem value="ghost">Ghost</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="mb-2">
                      <Label htmlFor={`button-${index}-radius`} className="mb-1 block">
                        Border Radius
                      </Label>
                      <div className="flex items-center gap-4">
                        <Slider
                          id={`button-${index}-radius`}
                          min={0}
                          max={32}
                          step={2}
                          value={[button.borderRadius || 4]}
                          onValueChange={([value]) => {
                            const updatedButtons = [...selectedComponent.content.buttons]
                            updatedButtons[index] = { ...button, borderRadius: value }
                            updateComponentContent("buttons", updatedButtons)
                          }}
                          className="flex-1"
                        />
                        <span className="w-12 text-right">{button.borderRadius || 4}px</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No buttons added yet. Click "Add Button" to add one.</p>
              )}
            </div>
          </>
        )}

        {selectedComponent.type === "footer" && (
          <>
            <div className="mb-4">
              <Label htmlFor="companyName" className="mb-1 block">
                Company Name
              </Label>
              <Input
                id="companyName"
                value={selectedComponent.content.companyName || ""}
                onChange={(e) => updateComponentContent("companyName", e.target.value)}
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="links" className="mb-1 block">
                Links (comma separated)
              </Label>
              <Input
                id="links"
                value={selectedComponent.content.links?.join(", ") || ""}
                onChange={(e) =>
                  updateComponentContent(
                    "links",
                    e.target.value.split(",").map((item) => item.trim()),
                  )
                }
              />
            </div>

            {/* Footer Link URLs */}
            {selectedComponent.content.links && selectedComponent.content.links.length > 0 && (
              <div className="mb-4 border rounded-md p-3">
                <Label className="mb-2 block font-medium">Footer Link URLs</Label>
                {selectedComponent.content.links.map((link: string, index: number) => (
                  <div key={index} className="mb-4 pb-3 border-b last:border-b-0 last:mb-0 last:pb-0">
                    <Label className="text-sm font-medium mb-2 block">{link}</Label>

                    <RadioGroup
                      value={(selectedComponent.content.linkTypes || [])[index] || "external"}
                      onValueChange={(value) => updateFooterLinkType(index, value)}
                      className="mb-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="external" id={`footer-link-type-external-${index}`} />
                        <Label htmlFor={`footer-link-type-external-${index}`} className="flex items-center">
                          <ExternalLink className="h-3 w-3 mr-1" /> External URL
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="section" id={`footer-link-type-section-${index}`} />
                        <Label htmlFor={`footer-link-type-section-${index}`} className="flex items-center">
                          <Anchor className="h-3 w-3 mr-1" /> Section Link
                        </Label>
                      </div>
                    </RadioGroup>

                    {((selectedComponent.content.linkTypes || [])[index] || "external") === "external" ? (
                      <div className="flex items-center gap-2">
                        <LinkIcon className="h-3 w-3 text-muted-foreground" />
                        <Input
                          id={`footer-link-${index}-url`}
                          value={(selectedComponent.content.linkUrls || [])[index] || "#"}
                          onChange={(e) => updateFooterLinkUrl(index, e.target.value)}
                          placeholder="https://example.com"
                          className="text-xs"
                        />
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Anchor className="h-3 w-3 text-muted-foreground" />
                        <Select
                          value={(selectedComponent.content.linkTargetSections || [])[index] || ""}
                          onValueChange={(value) => updateFooterLinkTargetSection(index, value)}
                        >
                          <SelectTrigger className="text-xs">
                            <SelectValue placeholder="Select a section" />
                          </SelectTrigger>
                          <SelectContent>
                            {sectionIds.length > 0 ? (
                              sectionIds.map((id) => (
                                <SelectItem key={id} value={id}>
                                  {id}
                                </SelectItem>
                              ))
                            ) : (
                              <SelectItem value="" disabled>
                                No sections available
                              </SelectItem>
                            )}
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            <div className="mb-4">
              <Label htmlFor="copyright" className="mb-1 block">
                Copyright Text
              </Label>
              <Input
                id="copyright"
                value={selectedComponent.content.copyright || ""}
                onChange={(e) => updateComponentContent("copyright", e.target.value)}
              />
            </div>
          </>
        )}
      </div>

      <Tabs defaultValue="typography" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="typography">
            <Type className="h-4 w-4 mr-2" />
            Text
          </TabsTrigger>
          <TabsTrigger value="colors">
            <Palette className="h-4 w-4 mr-2" />
            Colors
          </TabsTrigger>
          <TabsTrigger value="background">
            <ImageIcon className="h-4 w-4 mr-2" />
            Background
          </TabsTrigger>
          <TabsTrigger value="layout">
            <Layout className="h-4 w-4 mr-2" />
            Layout
          </TabsTrigger>
        </TabsList>

        <TabsContent value="typography" className="mt-0 space-y-4">
          <div>
            <Label className="mb-1 block">Font Family</Label>
            <Select
              value={selectedComponent.styles.fontFamily || styles.fontFamily || "sans"}
              onValueChange={(value) => updateComponentStyle("fontFamily", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select font family" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sans">Sans-serif</SelectItem>
                <SelectItem value="serif">Serif</SelectItem>
                <SelectItem value="mono">Monospace</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="mb-1 block">Font Size</Label>
            <div className="flex items-center gap-4">
              <Slider
                min={12}
                max={48}
                step={1}
                value={[selectedComponent.styles.fontSize || styles.fontSize || 16]}
                onValueChange={([value]) => updateComponentStyle("fontSize", value)}
                className="flex-1"
              />
              <span className="w-12 text-right">{selectedComponent.styles.fontSize || styles.fontSize || 16}px</span>
            </div>
          </div>

          <div>
            <Label className="mb-1 block">Text Alignment</Label>
            <div className="flex gap-2">
              <Button
                variant={selectedComponent.styles.textAlign === "left" ? "default" : "outline"}
                size="icon"
                onClick={() => updateComponentStyle("textAlign", "left")}
              >
                <AlignLeft className="h-4 w-4" />
              </Button>
              <Button
                variant={selectedComponent.styles.textAlign === "center" ? "default" : "outline"}
                size="icon"
                onClick={() => updateComponentStyle("textAlign", "center")}
              >
                <AlignCenter className="h-4 w-4" />
              </Button>
              <Button
                variant={selectedComponent.styles.textAlign === "right" ? "default" : "outline"}
                size="icon"
                onClick={() => updateComponentStyle("textAlign", "right")}
              >
                <AlignRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div>
            <Label className="mb-1 block">Text Style</Label>
            <div className="flex gap-2">
              <Button
                variant={selectedComponent.styles.fontWeight === "bold" ? "default" : "outline"}
                size="icon"
                onClick={() =>
                  updateComponentStyle("fontWeight", selectedComponent.styles.fontWeight === "bold" ? "normal" : "bold")
                }
              >
                <Bold className="h-4 w-4" />
              </Button>
              <Button
                variant={selectedComponent.styles.fontStyle === "italic" ? "default" : "outline"}
                size="icon"
                onClick={() =>
                  updateComponentStyle(
                    "fontStyle",
                    selectedComponent.styles.fontStyle === "italic" ? "normal" : "italic",
                  )
                }
              >
                <Italic className="h-4 w-4" />
              </Button>
              <Button
                variant={selectedComponent.styles.textDecoration === "underline" ? "default" : "outline"}
                size="icon"
                onClick={() =>
                  updateComponentStyle(
                    "textDecoration",
                    selectedComponent.styles.textDecoration === "underline" ? "none" : "underline",
                  )
                }
              >
                <Underline className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="colors" className="mt-0 space-y-4">
          <div>
            <Label className="mb-1 block">Text Color</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start">
                  <div
                    className="h-4 w-4 rounded-full mr-2"
                    style={{ backgroundColor: selectedComponent.styles.color || styles.textColor || "#000000" }}
                  />
                  {selectedComponent.styles.color || styles.textColor || "#000000"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0" align="start">
                <div className="p-3">
                  <div className="grid grid-cols-5 gap-2">
                    {[
                      "#000000",
                      "#ffffff",
                      "#ff0000",
                      "#00ff00",
                      "#0000ff",
                      "#ffff00",
                      "#00ffff",
                      "#ff00ff",
                      "#c0c0c0",
                      "#808080",
                    ].map((color) => (
                      <button
                        key={color}
                        className="h-6 w-6 rounded-md border"
                        style={{ backgroundColor: color }}
                        onClick={() => updateComponentStyle("color", color)}
                      />
                    ))}
                  </div>
                  <div className="mt-2">
                    <Input
                      type="color"
                      value={selectedComponent.styles.color || styles.textColor || "#000000"}
                      onChange={(e) => updateComponentStyle("color", e.target.value)}
                      className="w-full h-8"
                    />
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <Label className="mb-1 block">Background Color</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start">
                  <div
                    className="h-4 w-4 rounded-full mr-2"
                    style={{
                      backgroundColor: selectedComponent.styles.backgroundColor || styles.backgroundColor || "#ffffff",
                    }}
                  />
                  {selectedComponent.styles.backgroundColor || styles.backgroundColor || "#ffffff"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0" align="start">
                <div className="p-3">
                  <div className="grid grid-cols-5 gap-2">
                    {[
                      "#ffffff",
                      "#f8f9fa",
                      "#e9ecef",
                      "#dee2e6",
                      "#ced4da",
                      "#6c757d",
                      "#495057",
                      "#343a40",
                      "#212529",
                      "#000000",
                    ].map((color) => (
                      <button
                        key={color}
                        className="h-6 w-6 rounded-md border"
                        style={{ backgroundColor: color }}
                        onClick={() => updateComponentStyle("backgroundColor", color)}
                      />
                    ))}
                  </div>
                  <div className="mt-2">
                    <Input
                      type="color"
                      value={selectedComponent.styles.backgroundColor || styles.backgroundColor || "#ffffff"}
                      onChange={(e) => updateComponentStyle("backgroundColor", e.target.value)}
                      className="w-full h-8"
                    />
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <Label className="mb-1 block">Border Color</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start">
                  <div
                    className="h-4 w-4 rounded-full mr-2"
                    style={{
                      backgroundColor: selectedComponent.styles.borderColor || "#e5e7eb",
                    }}
                  />
                  {selectedComponent.styles.borderColor || "#e5e7eb"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0" align="start">
                <div className="p-3">
                  <div className="grid grid-cols-5 gap-2">
                    {[
                      "#e5e7eb",
                      "#d1d5db",
                      "#9ca3af",
                      "#6b7280",
                      "#4b5563",
                      "#000000",
                      "#ffffff",
                      "#3b82f6",
                      "#ef4444",
                      "#10b981",
                    ].map((color) => (
                      <button
                        key={color}
                        className="h-6 w-6 rounded-md border"
                        style={{ backgroundColor: color }}
                        onClick={() => updateComponentStyle("borderColor", color)}
                      />
                    ))}
                  </div>
                  <div className="mt-2">
                    <Input
                      type="color"
                      value={selectedComponent.styles.borderColor || "#e5e7eb"}
                      onChange={(e) => updateComponentStyle("borderColor", e.target.value)}
                      className="w-full h-8"
                    />
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </TabsContent>

        <TabsContent value="background" className="mt-0 space-y-4">
          <div className="mb-4">
            <Label className="mb-1 block">Background Type</Label>
            <Select
              value={selectedComponent.styles.backgroundType || "color"}
              onValueChange={(value) => updateComponentStyle("backgroundType", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select background type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="color">Solid Color</SelectItem>
                <SelectItem value="image">Image</SelectItem>
                <SelectItem value="gradient">Gradient</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Image background options */}
          {selectedComponent.styles.backgroundType === "image" && (
            <>
              <div>
                <Label className="mb-1 block">Background Image</Label>
                <div className="flex flex-col gap-2">
                  {selectedComponent.styles.backgroundImage && (
                    <div className="relative w-full h-24 mb-2 border rounded overflow-hidden">
                      <div
                        className="w-full h-full bg-center bg-cover"
                        style={{ backgroundImage: `url(${selectedComponent.styles.backgroundImage})` }}
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 bg-background/80 rounded-full"
                        onClick={() => updateComponentStyle("backgroundImage", null)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                  <Input
                    id="backgroundImage"
                    type="file"
                    accept="image/*"
                    onChange={handleBackgroundImageUpload}
                    className="text-sm"
                  />
                </div>
              </div>

              {selectedComponent.styles.backgroundImage && (
                <>
                  <div>
                    <Label className="mb-1 block">Background Size</Label>
                    <Select
                      value={selectedComponent.styles.backgroundSize || "cover"}
                      onValueChange={(value) => updateComponentStyle("backgroundSize", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select background size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cover">Cover</SelectItem>
                        <SelectItem value="contain">Contain</SelectItem>
                        <SelectItem value="auto">Auto</SelectItem>
                        <SelectItem value="100%">100%</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="mb-1 block">Background Position</Label>
                    <Select
                      value={selectedComponent.styles.backgroundPosition || "center"}
                      onValueChange={(value) => updateComponentStyle("backgroundPosition", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select position" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="center">Center</SelectItem>
                        <SelectItem value="top">Top</SelectItem>
                        <SelectItem value="bottom">Bottom</SelectItem>
                        <SelectItem value="left">Left</SelectItem>
                        <SelectItem value="right">Right</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <Label htmlFor="bg-repeat">No Repeat</Label>
                      <Switch
                        id="bg-repeat"
                        checked={selectedComponent.styles.backgroundRepeat === "no-repeat"}
                        onCheckedChange={(checked) =>
                          updateComponentStyle("backgroundRepeat", checked ? "no-repeat" : "repeat")
                        }
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="mb-1 block">Background Overlay</Label>
                    <div className="flex items-center gap-4">
                      <Slider
                        min={0}
                        max={100}
                        step={5}
                        value={[selectedComponent.styles.backgroundOverlay || 0]}
                        onValueChange={([value]) => updateComponentStyle("backgroundOverlay", value)}
                        className="flex-1"
                      />
                      <span className="w-12 text-right">{selectedComponent.styles.backgroundOverlay || 0}%</span>
                    </div>
                  </div>
                </>
              )}
            </>
          )}

          {/* Gradient background options */}
          {selectedComponent.styles.backgroundType === "gradient" && (
            <GradientPicker
              value={
                selectedComponent.styles.backgroundGradient || {
                  type: "linear",
                  direction: "to right",
                  colors: ["#6366f1", "#8b5cf6"],
                }
              }
              onChange={(gradient) => updateComponentStyle("backgroundGradient", gradient)}
            />
          )}
        </TabsContent>

        <TabsContent value="layout" className="mt-0 space-y-4">
          <div>
            <Label className="mb-1 block">Padding</Label>
            <div className="flex items-center gap-4">
              <Slider
                min={0}
                max={100}
                step={4}
                value={[selectedComponent.styles.padding || styles.padding || 16]}
                onValueChange={([value]) => updateComponentStyle("padding", value)}
                className="flex-1"
              />
              <span className="w-12 text-right">{selectedComponent.styles.padding || styles.padding || 16}px</span>
            </div>
          </div>

          <div>
            <Label className="mb-1 block">Border Width</Label>
            <div className="flex items-center gap-4">
              <Slider
                min={0}
                max={10}
                step={1}
                value={[selectedComponent.styles.borderWidth || 0]}
                onValueChange={([value]) => updateComponentStyle("borderWidth", value)}
                className="flex-1"
              />
              <span className="w-12 text-right">{selectedComponent.styles.borderWidth || 0}px</span>
            </div>
          </div>

          <div>
            <Label className="mb-1 block">Border Radius</Label>
            <div className="flex items-center gap-4">
              <Slider
                min={0}
                max={32}
                step={2}
                value={[selectedComponent.styles.borderRadius || styles.borderRadius || 0]}
                onValueChange={([value]) => updateComponentStyle("borderRadius", value)}
                className="flex-1"
              />
              <span className="w-12 text-right">
                {selectedComponent.styles.borderRadius || styles.borderRadius || 0}px
              </span>
            </div>
          </div>

          <div>
            <Label className="mb-1 block">Box Shadow</Label>
            <Select
              value={selectedComponent.styles.boxShadow || "none"}
              onValueChange={(value) => updateComponentStyle("boxShadow", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select shadow" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="sm">Small</SelectItem>
                <SelectItem value="md">Medium</SelectItem>
                <SelectItem value="lg">Large</SelectItem>
                <SelectItem value="xl">Extra Large</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="mb-1 block">Width</Label>
            <Select
              value={selectedComponent.styles.width || "full"}
              onValueChange={(value) => updateComponentStyle("width", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select width" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="full">Full Width</SelectItem>
                <SelectItem value="container">Container</SelectItem>
                <SelectItem value="narrow">Narrow</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
