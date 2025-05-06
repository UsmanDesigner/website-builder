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
  X,
} from "lucide-react"
import type { ComponentType } from "@/lib/types"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Switch } from "@/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface StyleEditorProps {
  selectedComponent: ComponentType | null
  styles: any
  onUpdateStyles: (styles: any) => void
  onUpdateComponent: (id: string, updates: Partial<ComponentType>) => void
  sectionIds: string[]
  allComponents: ComponentType[]
  onClose?: () => void
}

export function StyleEditor({
  selectedComponent,
  styles,
  onUpdateStyles,
  onUpdateComponent,
  sectionIds,
  allComponents,
  onClose,
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
    <div className="p-4 relative">
      {onClose && (
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Style Editor</h2>
          <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0">
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
      {!onClose && <h2 className="text-xl font-bold mb-4">Style Editor</h2>}

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

        {/* E-commerce specific fields */}
        {selectedComponent.template === "product-grid" && (
          <div className="mb-4 p-3 border rounded-md">
            <div className="flex items-center justify-between mb-2">
              <Label className="font-medium">WhatsApp Integration</Label>
              <Switch
                checked={selectedComponent.content.showWhatsAppButton}
                onCheckedChange={(checked) => updateComponentContent("showWhatsAppButton", checked)}
              />
            </div>

            {selectedComponent.content.showWhatsAppButton && (
              <>
                <div className="mb-2">
                  <Label htmlFor="whatsAppNumber" className="mb-1 block text-sm">
                    WhatsApp Number (with country code)
                  </Label>
                  <Input
                    id="whatsAppNumber"
                    value={selectedComponent.content.whatsAppNumber || ""}
                    onChange={(e) => updateComponentContent("whatsAppNumber", e.target.value)}
                    placeholder="+1234567890"
                  />
                </div>
                <div className="mb-2">
                  <Label htmlFor="whatsAppMessage" className="mb-1 block text-sm">
                    Message Template
                  </Label>
                  <Input
                    id="whatsAppMessage"
                    value={selectedComponent.content.whatsAppMessage || ""}
                    onChange={(e) => updateComponentContent("whatsAppMessage", e.target.value)}
                    placeholder="Hi, I'm interested in purchasing: "
                  />
                </div>
              </>
            )}
          </div>
        )}

        {selectedComponent.template === "product-detail" && (
          <div className="mb-4 p-3 border rounded-md">
            <div className="flex items-center justify-between mb-2">
              <Label className="font-medium">WhatsApp Integration</Label>
              <Switch
                checked={selectedComponent.content.showWhatsAppButton}
                onCheckedChange={(checked) => updateComponentContent("showWhatsAppButton", checked)}
              />
            </div>

            {selectedComponent.content.showWhatsAppButton && (
              <>
                <div className="mb-2">
                  <Label htmlFor="whatsAppNumber" className="mb-1 block text-sm">
                    WhatsApp Number (with country code)
                  </Label>
                  <Input
                    id="whatsAppNumber"
                    value={selectedComponent.content.whatsAppNumber || ""}
                    onChange={(e) => updateComponentContent("whatsAppNumber", e.target.value)}
                    placeholder="+1234567890"
                  />
                </div>
                <div className="mb-2">
                  <Label htmlFor="whatsAppMessage" className="mb-1 block text-sm">
                    Message Template
                  </Label>
                  <Input
                    id="whatsAppMessage"
                    value={selectedComponent.content.whatsAppMessage || ""}
                    onChange={(e) => updateComponentContent("whatsAppMessage", e.target.value)}
                    placeholder="Hi, I'm interested in purchasing: "
                  />
                </div>
              </>
            )}
          </div>
        )}

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

            {/* Cart count for e-commerce header */}
            {selectedComponent.template === "ecommerce-header" && (
              <div className="mb-4">
                <Label htmlFor="cartCount" className="mb-1 block">
                  Cart Count
                </Label>
                <Input
                  id="cartCount"
                  type="number"
                  min="0"
                  value={selectedComponent.content.cartCount || 0}
                  onChange={(e) => updateComponentContent("cartCount", Number.parseInt(e.target.value) || 0)}
                />
              </div>
            )}

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

        {/* Product Grid Editor */}
        {selectedComponent.template === "product-grid" && (
          <div className="mb-4 border-t pt-4">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-medium">Products</h4>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  const newProducts = [...(selectedComponent.content.products || [])]
                  newProducts.push({
                    id: `prod-${newProducts.length + 1}`,
                    title: `Product ${newProducts.length + 1}`,
                    category: "New Category",
                    price: 29.99,
                    salePrice: null,
                    description: "Product description",
                    image: null,
                    link: "#",
                    inStock: true,
                    quantity: 10,
                    sku: `SKU${String(newProducts.length + 1).padStart(3, "0")}`,
                  })
                  updateComponentContent("products", newProducts)
                }}
              >
                <Plus className="h-3 w-3 mr-1" />
                Add Product
              </Button>
            </div>

            {selectedComponent.content.products && selectedComponent.content.products.length > 0 ? (
              selectedComponent.content.products.map((product: any, index: number) => (
                <div key={index} className="mb-4 p-3 border rounded-md relative">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="absolute top-2 right-2 h-6 w-6 p-0"
                    onClick={() => {
                      const newProducts = [...selectedComponent.content.products]
                      newProducts.splice(index, 1)
                      updateComponentContent("products", newProducts)
                    }}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>

                  <div className="mb-2">
                    <Label htmlFor={`product-${index}-title`} className="mb-1 block">
                      Title
                    </Label>
                    <Input
                      id={`product-${index}-title`}
                      value={product.title || ""}
                      onChange={(e) => {
                        const newProducts = [...selectedComponent.content.products]
                        newProducts[index] = { ...product, title: e.target.value }
                        updateComponentContent("products", newProducts)
                      }}
                    />
                  </div>

                  <div className="mb-2">
                    <Label htmlFor={`product-${index}-category`} className="mb-1 block">
                      Category
                    </Label>
                    <Input
                      id={`product-${index}-category`}
                      value={product.category || ""}
                      onChange={(e) => {
                        const newProducts = [...selectedComponent.content.products]
                        newProducts[index] = { ...product, category: e.target.value }
                        updateComponentContent("products", newProducts)
                      }}
                    />
                  </div>

                  <div className="mb-2">
                    <Label htmlFor={`product-${index}-price`} className="mb-1 block">
                      Price
                    </Label>
                    <Input
                      id={`product-${index}-price`}
                      type="number"
                      step="0.01"
                      value={product.price || 0}
                      onChange={(e) => {
                        const newProducts = [...selectedComponent.content.products]
                        newProducts[index] = { ...product, price: Number.parseFloat(e.target.value) || 0 }
                        updateComponentContent("products", newProducts)
                      }}
                    />
                  </div>

                  <div className="mb-2">
                    <div className="flex items-center justify-between mb-1">
                      <Label htmlFor={`product-${index}-sale`}>On Sale</Label>
                      <Switch
                        id={`product-${index}-sale`}
                        checked={product.salePrice !== null}
                        onCheckedChange={(checked) => {
                          const newProducts = [...selectedComponent.content.products]
                          newProducts[index] = {
                            ...product,
                            salePrice: checked ? (product.price * 0.8).toFixed(2) : null,
                          }
                          updateComponentContent("products", newProducts)
                        }}
                      />
                    </div>

                    {product.salePrice !== null && (
                      <div className="mt-2">
                        <Label htmlFor={`product-${index}-saleprice`} className="mb-1 block">
                          Sale Price
                        </Label>
                        <Input
                          id={`product-${index}-saleprice`}
                          type="number"
                          step="0.01"
                          value={product.salePrice || 0}
                          onChange={(e) => {
                            const newProducts = [...selectedComponent.content.products]
                            newProducts[index] = { ...product, salePrice: Number.parseFloat(e.target.value) || 0 }
                            updateComponentContent("products", newProducts)
                          }}
                        />
                      </div>
                    )}
                  </div>

                  <div className="mb-2">
                    <Label htmlFor={`product-${index}-description`} className="mb-1 block">
                      Description
                    </Label>
                    <textarea
                      id={`product-${index}-description`}
                      className="w-full min-h-[60px] rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                      value={product.description || ""}
                      onChange={(e) => {
                        const newProducts = [...selectedComponent.content.products]
                        newProducts[index] = { ...product, description: e.target.value }
                        updateComponentContent("products", newProducts)
                      }}
                    />
                  </div>

                  <div className="mb-2">
                    <div className="flex items-center justify-between mb-1">
                      <Label htmlFor={`product-${index}-stock`}>In Stock</Label>
                      <Switch
                        id={`product-${index}-stock`}
                        checked={product.inStock}
                        onCheckedChange={(checked) => {
                          const newProducts = [...selectedComponent.content.products]
                          newProducts[index] = {
                            ...product,
                            inStock: checked,
                            quantity: checked ? product.quantity || 1 : 0,
                          }
                          updateComponentContent("products", newProducts)
                        }}
                      />
                    </div>

                    {product.inStock && (
                      <div className="mt-2">
                        <Label htmlFor={`product-${index}-quantity`} className="mb-1 block">
                          Quantity
                        </Label>
                        <Input
                          id={`product-${index}-quantity`}
                          type="number"
                          min="0"
                          value={product.quantity || 0}
                          onChange={(e) => {
                            const newProducts = [...selectedComponent.content.products]
                            const quantity = Number.parseInt(e.target.value) || 0
                            newProducts[index] = {
                              ...product,
                              quantity,
                              inStock: quantity > 0,
                            }
                            updateComponentContent("products", newProducts)
                          }}
                        />
                      </div>
                    )}
                  </div>

                  <div className="mb-2">
                    <Label htmlFor={`product-${index}-sku`} className="mb-1 block">
                      SKU
                    </Label>
                    <Input
                      id={`product-${index}-sku`}
                      value={product.sku || ""}
                      onChange={(e) => {
                        const newProducts = [...selectedComponent.content.products]
                        newProducts[index] = { ...product, sku: e.target.value }
                        updateComponentContent("products", newProducts)
                      }}
                    />
                  </div>

                  <div className="mb-2">
                    <Label htmlFor={`product-${index}-image`} className="mb-1 block">
                      Product Image
                    </Label>
                    <div className="flex flex-col gap-2">
                      {product.image && (
                        <div className="relative w-full h-24 mb-2 border rounded overflow-hidden">
                          <img
                            src={product.image || "/placeholder.svg"}
                            alt={product.title}
                            className="object-cover w-full h-full"
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            className="absolute top-2 right-2 bg-background/80 rounded-full"
                            onClick={() => {
                              const newProducts = [...selectedComponent.content.products]
                              newProducts[index] = { ...product, image: null }
                              updateComponentContent("products", newProducts)
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                      <Input
                        id={`product-${index}-image`}
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) {
                            const reader = new FileReader()
                            reader.onload = (event) => {
                              const newProducts = [...selectedComponent.content.products]
                              newProducts[index] = { ...product, image: event.target?.result }
                              updateComponentContent("products", newProducts)
                            }
                            reader.readAsDataURL(file)
                          }
                        }}
                        className="text-sm"
                      />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">No products added yet. Click "Add Product" to add one.</p>
            )}
          </div>
        )}

        {selectedComponent.template === "portfolio-masonry" && (
          <div className="mb-4 border-t pt-4">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-medium">Portfolio Items</h4>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  const newItems = [...(selectedComponent.content.portfolioItems || [])]
                  newItems.push({
                    title: `Project ${newItems.length + 1}`,
                    category: "New Category",
                    image: null,
                    link: "#",
                    height: "medium",
                  })
                  updateComponentContent("portfolioItems", newItems)
                }}
              >
                <Plus className="h-3 w-3 mr-1" />
                Add Item
              </Button>
            </div>

            {selectedComponent.content.portfolioItems && selectedComponent.content.portfolioItems.length > 0 ? (
              selectedComponent.content.portfolioItems.map((item: any, index: number) => (
                <div key={index} className="mb-4 p-3 border rounded-md relative">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="absolute top-2 right-2 h-6 w-6 p-0"
                    onClick={() => {
                      const newItems = [...selectedComponent.content.portfolioItems]
                      newItems.splice(index, 1)
                      updateComponentContent("portfolioItems", newItems)
                    }}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>

                  <div className="mb-2">
                    <Label htmlFor={`portfolio-${index}-title`} className="mb-1 block">
                      Title
                    </Label>
                    <Input
                      id={`portfolio-${index}-title`}
                      value={item.title || ""}
                      onChange={(e) => {
                        const newItems = [...selectedComponent.content.portfolioItems]
                        newItems[index] = { ...item, title: e.target.value }
                        updateComponentContent("portfolioItems", newItems)
                      }}
                    />
                  </div>

                  <div className="mb-2">
                    <Label htmlFor={`portfolio-${index}-category`} className="mb-1 block">
                      Category
                    </Label>
                    <Input
                      id={`portfolio-${index}-category`}
                      value={item.category || ""}
                      onChange={(e) => {
                        const newItems = [...selectedComponent.content.portfolioItems]
                        newItems[index] = { ...item, category: e.target.value }
                        updateComponentContent("portfolioItems", newItems)
                      }}
                    />
                  </div>

                  <div className="mb-2">
                    <Label htmlFor={`portfolio-${index}-height`} className="mb-1 block">
                      Item Height
                    </Label>
                    <Select
                      value={item.height || "medium"}
                      onValueChange={(value) => {
                        const newItems = [...selectedComponent.content.portfolioItems]
                        newItems[index] = { ...item, height: value }
                        updateComponentContent("portfolioItems", newItems)
                      }}
                    >
                      <SelectTrigger id={`portfolio-${index}-height`}>
                        <SelectValue placeholder="Select height" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="short">Short</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="tall">Tall</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="mb-2">
                    <Label htmlFor={`portfolio-${index}-link`} className="mb-1 block">
                      Link URL
                    </Label>
                    <Input
                      id={`portfolio-${index}-link`}
                      value={item.link || "#"}
                      onChange={(e) => {
                        const newItems = [...selectedComponent.content.portfolioItems]
                        newItems[index] = { ...item, link: e.target.value }
                        updateComponentContent("portfolioItems", newItems)
                      }}
                    />
                  </div>

                  <div className="mb-2">
                    <Label htmlFor={`portfolio-${index}-image`} className="mb-1 block">
                      Image
                    </Label>
                    <div className="flex flex-col gap-2">
                      {item.image && (
                        <div className="relative w-full h-24 mb-2 border rounded overflow-hidden">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.title}
                            className="object-cover w-full h-full"
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            className="absolute top-2 right-2 bg-background/80 rounded-full"
                            onClick={() => {
                              const newItems = [...selectedComponent.content.portfolioItems]
                              newItems[index] = { ...item, image: null }
                              updateComponentContent("portfolioItems", newItems)
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                      <Input
                        id={`portfolio-${index}-image`}
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) {
                            const reader = new FileReader()
                            reader.onload = (event) => {
                              const newItems = [...selectedComponent.content.portfolioItems]
                              newItems[index] = { ...item, image: event.target?.result }
                              updateComponentContent("portfolioItems", newItems)
                            }
                            reader.readAsDataURL(file)
                          }
                        }}
                        className="text-sm"
                      />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">
                No portfolio items added yet. Click "Add Item" to add one.
              </p>
            )}
          </div>
        )}

        {selectedComponent.template === "product-detail" && (
          <div className="mb-4 border-t pt-4">
            <h4 className="font-medium mb-3">Product Details</h4>

            <div className="mb-2">
              <Label htmlFor="productTitle" className="mb-1 block">
                Product Title
              </Label>
              <Input
                id="productTitle"
                value={selectedComponent.content.productTitle || ""}
                onChange={(e) => updateComponentContent("productTitle", e.target.value)}
              />
            </div>

            <div className="mb-2">
              <Label htmlFor="productCategory" className="mb-1 block">
                Category
              </Label>
              <Input
                id="productCategory"
                value={selectedComponent.content.productCategory || ""}
                onChange={(e) => updateComponentContent("productCategory", e.target.value)}
              />
            </div>

            <div className="mb-2">
              <Label htmlFor="productPrice" className="mb-1 block">
                Price
              </Label>
              <Input
                id="productPrice"
                type="number"
                step="0.01"
                value={selectedComponent.content.productPrice || 0}
                onChange={(e) => updateComponentContent("productPrice", Number.parseFloat(e.target.value) || 0)}
              />
            </div>

            <div className="mb-2">
              <div className="flex items-center justify-between mb-1">
                <Label htmlFor="productSale">On Sale</Label>
                <Switch
                  id="productSale"
                  checked={selectedComponent.content.productSalePrice !== null}
                  onCheckedChange={(checked) => {
                    updateComponentContent(
                      "productSalePrice",
                      checked ? (selectedComponent.content.productPrice * 0.8).toFixed(2) : null,
                    )
                  }}
                />
              </div>

              {selectedComponent.content.productSalePrice !== null && (
                <div className="mt-2">
                  <Label htmlFor="productSalePrice" className="mb-1 block">
                    Sale Price
                  </Label>
                  <Input
                    id="productSalePrice"
                    type="number"
                    step="0.01"
                    value={selectedComponent.content.productSalePrice || 0}
                    onChange={(e) => updateComponentContent("productSalePrice", Number.parseFloat(e.target.value) || 0)}
                  />
                </div>
              )}
            </div>

            <div className="mb-2">
              <Label htmlFor="productDescription" className="mb-1 block">
                Description
              </Label>
              <textarea
                id="productDescription"
                className="w-full min-h-[60px] rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                value={selectedComponent.content.productDescription || ""}
                onChange={(e) => updateComponentContent("productDescription", e.target.value)}
              />
            </div>

            <div className="mb-2">
              <Label htmlFor="productSKU" className="mb-1 block">
                SKU
              </Label>
              <Input
                id="productSKU"
                value={selectedComponent.content.productSKU || ""}
                onChange={(e) => updateComponentContent("productSKU", e.target.value)}
              />
            </div>

            <div className="mb-2">
              <div className="flex items-center justify-between mb-1">
                <Label htmlFor="productInStock">In Stock</Label>
                <Switch
                  id="productInStock"
                  checked={selectedComponent.content.productInStock}
                  onCheckedChange={(checked) => {
                    updateComponentContent("productInStock", checked)
                    if (!checked) {
                      updateComponentContent("productQuantity", 0)
                    } else if (selectedComponent.content.productQuantity === 0) {
                      updateComponentContent("productQuantity", 10)
                    }
                  }}
                />
              </div>

              {selectedComponent.content.productInStock && (
                <div className="mt-2">
                  <Label htmlFor="productQuantity" className="mb-1 block">
                    Quantity
                  </Label>
                  <Input
                    id="productQuantity"
                    type="number"
                    min="0"
                    value={selectedComponent.content.productQuantity || 0}
                    onChange={(e) => {
                      const quantity = Number.parseInt(e.target.value) || 0
                      updateComponentContent("productQuantity", quantity)
                      updateComponentContent("productInStock", quantity > 0)
                    }}
                  />
                </div>
              )}
            </div>

            <div className="mb-4">
              <Label className="mb-1 block">Product Images</Label>
              <div className="grid grid-cols-2 gap-2 mb-2">
                {(selectedComponent.content.productImages || []).map((image: string | null, idx: number) => (
                  <div key={idx} className="relative border rounded overflow-hidden h-24">
                    {image ? (
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`Product ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-muted text-muted-foreground text-sm">
                        No image
                      </div>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-1 right-1 h-6 w-6 bg-background/80 rounded-full"
                      onClick={() => {
                        const newImages = [...(selectedComponent.content.productImages || [])]
                        newImages[idx] = null
                        updateComponentContent("productImages", newImages)
                      }}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) {
                      const reader = new FileReader()
                      reader.onload = (event) => {
                        const newImages = [...(selectedComponent.content.productImages || [])]
                        // Find the first null slot or add to the end
                        const nullIndex = newImages.findIndex((img) => img === null)
                        if (nullIndex >= 0) {
                          newImages[nullIndex] = event.target?.result as string
                        } else {
                          newImages.push(event.target?.result as string)
                        }
                        updateComponentContent("productImages", newImages)
                      }
                      reader.readAsDataURL(file)
                    }
                  }}
                  className="text-sm"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const newImages = [...(selectedComponent.content.productImages || [])]
                    newImages.push(null)
                    updateComponentContent("productImages", newImages)
                  }}
                >
                  <Plus className="h-3 w-3 mr-1" />
                  Add Slot
                </Button>
              </div>
            </div>

            <div className="mb-2">
              <Label htmlFor="productFeatures" className="mb-1 block">
                Features (one per line)
              </Label>
              <textarea
                id="productFeatures"
                className="w-full min-h-[100px] rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                value={(selectedComponent.content.productFeatures || []).join("\n")}
                onChange={(e) => {
                  const features = e.target.value.split("\n").filter((line) => line.trim() !== "")
                  updateComponentContent("productFeatures", features)
                }}
                placeholder="Enter one feature per line"
              />
            </div>
          </div>
        )}

        {selectedComponent.template === "skills-expertise" && (
          <div className="mb-4 border-t pt-4">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-medium">Skills</h4>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  const newSkills = [...(selectedComponent.content.skills || [])]
                  newSkills.push({
                    name: `Skill ${newSkills.length + 1}`,
                    percentage: 75,
                  })
                  updateComponentContent("skills", newSkills)
                }}
              >
                <Plus className="h-3 w-3 mr-1" />
                Add Skill
              </Button>
            </div>

            {selectedComponent.content.skills && selectedComponent.content.skills.length > 0 ? (
              selectedComponent.content.skills.map((skill: any, index: number) => (
                <div key={index} className="mb-4 p-3 border rounded-md relative">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="absolute top-2 right-2 h-6 w-6 p-0"
                    onClick={() => {
                      const newSkills = [...selectedComponent.content.skills]
                      newSkills.splice(index, 1)
                      updateComponentContent("skills", newSkills)
                    }}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>

                  <div className="mb-2">
                    <Label htmlFor={`skill-${index}-name`} className="mb-1 block">
                      Skill Name
                    </Label>
                    <Input
                      id={`skill-${index}-name`}
                      value={skill.name || ""}
                      onChange={(e) => {
                        const newSkills = [...selectedComponent.content.skills]
                        newSkills[index] = { ...skill, name: e.target.value }
                        updateComponentContent("skills", newSkills)
                      }}
                    />
                  </div>

                  <div className="mb-2">
                    <Label htmlFor={`skill-${index}-percentage`} className="mb-1 block">
                      Percentage ({skill.percentage}%)
                    </Label>
                    <Slider
                      id={`skill-${index}-percentage`}
                      min={0}
                      max={100}
                      step={5}
                      value={[skill.percentage || 50]}
                      onValueChange={([value]) => {
                        const newSkills = [...selectedComponent.content.skills]
                        newSkills[index] = { ...skill, percentage: value }
                        updateComponentContent("skills", newSkills)
                      }}
                    />
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">No skills added yet. Click "Add Skill" to add one.</p>
            )}
          </div>
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
        </TabsContent>
        // Add the missing tabs content for background and layout
        <TabsContent value="background" className="mt-0 space-y-4">
          <div>
            <Label className="mb-1 block">Background Image</Label>
            <div className="flex flex-col gap-2">
              {selectedComponent.styles.backgroundImage && (
                <div className="relative w-full h-32 mb-2 border rounded overflow-hidden">
                  <img
                    src={selectedComponent.styles.backgroundImage || "/placeholder.svg"}
                    alt="Background"
                    className="object-cover w-full h-full"
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
                <SelectValue placeholder="Select background position" />
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
            <Label className="mb-1 block">Background Repeat</Label>
            <Select
              value={selectedComponent.styles.backgroundRepeat || "no-repeat"}
              onValueChange={(value) => updateComponentStyle("backgroundRepeat", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select background repeat" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="no-repeat">No Repeat</SelectItem>
                <SelectItem value="repeat">Repeat</SelectItem>
                <SelectItem value="repeat-x">Repeat X</SelectItem>
                <SelectItem value="repeat-y">Repeat Y</SelectItem>
              </SelectContent>
            </Select>
          </div>
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
            <Label className="mb-1 block">Border Radius</Label>
            <div className="flex items-center gap-4">
              <Slider
                min={0}
                max={32}
                step={2}
                value={[selectedComponent.styles.borderRadius || 0]}
                onValueChange={([value]) => updateComponentStyle("borderRadius", value)}
                className="flex-1"
              />
              <span className="w-12 text-right">{selectedComponent.styles.borderRadius || 0}px</span>
            </div>
          </div>

          <div>
            <Label className="mb-1 block">Width</Label>
            <Select
              value={selectedComponent.styles.width || "100%"}
              onValueChange={(value) => updateComponentStyle("width", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select width" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="100%">Full Width</SelectItem>
                <SelectItem value="75%">75%</SelectItem>
                <SelectItem value="50%">50%</SelectItem>
                <SelectItem value="25%">25%</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="mb-1 block">Height</Label>
            <Select
              value={selectedComponent.styles.height || "auto"}
              onValueChange={(value) => updateComponentStyle("height", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select height" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="auto">Auto</SelectItem>
                <SelectItem value="100vh">Full Screen</SelectItem>
                <SelectItem value="75vh">75% Screen</SelectItem>
                <SelectItem value="50vh">50% Screen</SelectItem>
                <SelectItem value="25vh">25% Screen</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
