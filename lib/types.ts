// lib/types.ts

import type { JSX } from "react"

export interface ComponentType {
  id: string
  type: "header" | "content" | "footer"
  template: string
  content: any
  styles: any
}

export interface ComponentTemplateType {
  id: string
  name: string
  preview: string
  defaultContent: any
  defaultStyles: any
  render: (content: any, styles: any) => JSX.Element
}
