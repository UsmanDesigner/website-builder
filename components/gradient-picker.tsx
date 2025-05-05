"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Minus, ArrowRight, RotateCw } from "lucide-react"

interface GradientColor {
  color: string
  position: number
}

interface GradientValue {
  type: "linear" | "radial"
  direction: string
  colors: string[] | GradientColor[]
}

interface GradientPickerProps {
  value: GradientValue
  onChange: (value: GradientValue) => void
}

export function GradientPicker({ value, onChange }: GradientPickerProps) {
  // Convert simple color array to color objects with positions if needed
  const [gradientColors, setGradientColors] = useState<GradientColor[]>(() => {
    if (!value.colors)
      return [
        { color: "#6366f1", position: 0 },
        { color: "#8b5cf6", position: 100 },
      ]

    if (typeof value.colors[0] === "string") {
      return (value.colors as string[]).map((color, index, arr) => ({
        color,
        position: Math.round((index / Math.max(arr.length - 1, 1)) * 100),
      }))
    }

    return value.colors as GradientColor[]
  })

  const handleTypeChange = (type: "linear" | "radial") => {
    onChange({
      ...value,
      type,
    })
  }

  const handleDirectionChange = (direction: string) => {
    onChange({
      ...value,
      direction,
    })
  }

  const handleColorChange = (index: number, newColor: string) => {
    const newColors = [...gradientColors]
    newColors[index] = { ...newColors[index], color: newColor }
    setGradientColors(newColors)
    updateGradient(newColors)
  }

  const handlePositionChange = (index: number, newPosition: number) => {
    const newColors = [...gradientColors]
    newColors[index] = { ...newColors[index], position: newPosition }
    setGradientColors(newColors)
    updateGradient(newColors)
  }

  const addColor = () => {
    // Find a position in the middle of the largest gap
    let largestGap = 0
    let insertPosition = 50

    const sortedColors = [...gradientColors].sort((a, b) => a.position - b.position)

    for (let i = 0; i < sortedColors.length - 1; i++) {
      const gap = sortedColors[i + 1].position - sortedColors[i].position
      if (gap > largestGap) {
        largestGap = gap
        insertPosition = sortedColors[i].position + gap / 2
      }
    }

    const newColors = [...gradientColors, { color: "#ffffff", position: insertPosition }]
    setGradientColors(newColors)
    updateGradient(newColors)
  }

  const removeColor = (index: number) => {
    if (gradientColors.length <= 2) return // Keep at least 2 colors

    const newColors = gradientColors.filter((_, i) => i !== index)
    setGradientColors(newColors)
    updateGradient(newColors)
  }

  const updateGradient = (colors: GradientColor[]) => {
    onChange({
      ...value,
      colors,
    })
  }

  // Generate CSS gradient preview
  const gradientCSS = () => {
    const sortedColors = [...gradientColors].sort((a, b) => a.position - b.position)
    const colorStops = sortedColors.map((c) => `${c.color} ${c.position}%`).join(", ")

    if (value.type === "linear") {
      return `linear-gradient(${value.direction}, ${colorStops})`
    } else {
      return `radial-gradient(circle at center, ${colorStops})`
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <Label className="mb-1 block">Gradient Type</Label>
        <div className="flex gap-2">
          <Button
            variant={value.type === "linear" ? "default" : "outline"}
            size="sm"
            onClick={() => handleTypeChange("linear")}
            className="flex-1"
          >
            <ArrowRight className="h-4 w-4 mr-2" />
            Linear
          </Button>
          <Button
            variant={value.type === "radial" ? "default" : "outline"}
            size="sm"
            onClick={() => handleTypeChange("radial")}
            className="flex-1"
          >
            <RotateCw className="h-4 w-4 mr-2" />
            Radial
          </Button>
        </div>
      </div>

      {value.type === "linear" && (
        <div>
          <Label className="mb-1 block">Direction</Label>
          <Select value={value.direction} onValueChange={handleDirectionChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select direction" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="to right">Left to Right</SelectItem>
              <SelectItem value="to left">Right to Left</SelectItem>
              <SelectItem value="to bottom">Top to Bottom</SelectItem>
              <SelectItem value="to top">Bottom to Top</SelectItem>
              <SelectItem value="to bottom right">Top Left to Bottom Right</SelectItem>
              <SelectItem value="to bottom left">Top Right to Bottom Left</SelectItem>
              <SelectItem value="to top right">Bottom Left to Top Right</SelectItem>
              <SelectItem value="to top left">Bottom Right to Top Left</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      <div>
        <div className="flex justify-between items-center mb-2">
          <Label>Gradient Colors</Label>
          <Button size="sm" variant="outline" onClick={addColor}>
            <Plus className="h-3 w-3 mr-1" />
            Add Color
          </Button>
        </div>

        <div className="mb-4 h-8 rounded-md border" style={{ background: gradientCSS() }}></div>

        <div className="space-y-3">
          {gradientColors.map((colorObj, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-md border overflow-hidden">
                <Input
                  type="color"
                  value={colorObj.color}
                  onChange={(e) => handleColorChange(index, e.target.value)}
                  className="w-12 h-12 -m-1 cursor-pointer"
                />
              </div>
              <div className="flex-1">
                <Label className="text-xs mb-1 block">Position</Label>
                <div className="flex items-center gap-2">
                  <Slider
                    min={0}
                    max={100}
                    step={1}
                    value={[colorObj.position]}
                    onValueChange={([value]) => handlePositionChange(index, value)}
                    className="flex-1"
                  />
                  <span className="w-8 text-xs text-right">{colorObj.position}%</span>
                </div>
              </div>
              {gradientColors.length > 2 && (
                <Button size="sm" variant="ghost" className="h-8 w-8 p-0" onClick={() => removeColor(index)}>
                  <Minus className="h-3 w-3" />
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Slider component for the gradient picker
function Slider({ min, max, step, value, onValueChange, className }: any) {
  return (
    <div className={`relative h-4 w-full ${className}`}>
      <div className="absolute inset-0 h-1 top-1/2 -translate-y-1/2 bg-muted rounded-full" />
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value[0]}
        onChange={(e) => onValueChange([Number.parseFloat(e.target.value)])}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />
      <div
        className="absolute h-4 w-4 rounded-full bg-primary border-2 border-background"
        style={{
          left: `calc(${((value[0] - min) / (max - min)) * 100}% - 8px)`,
          top: "50%",
          transform: "translateY(-50%)",
        }}
      />
    </div>
  )
}
