export interface ComponentType {
  id: string
  type: "header" | "content" | "footer"
  template: string
  content: any
  styles: any
}
