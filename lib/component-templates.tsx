// lib/component-templates.tsx
// This file now just imports and re-exports all templates from their respective files

import { headerTemplates } from "./header-templates"
import { contentTemplates as importedContentTemplates } from "./content-templates"
import { portfolioTemplates } from "./portfolio-templates"
import { skillsTemplates } from "./skills-templates"
import { ecommerceTemplates } from "./ecommerce-templates"
import { footerTemplates } from "./footer-templates"

// Re-export all templates
export { headerTemplates, footerTemplates }

// Combine all content templates into one export
export const contentTemplates = [
  ...importedContentTemplates,
  ...portfolioTemplates,
  ...skillsTemplates,
  ...ecommerceTemplates,
]
