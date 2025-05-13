
// lib/initial-components.ts
import { v4 as uuidv4 } from "uuid"
import type { ComponentType } from "./types"

export const initialComponents: ComponentType[] = [
  {
    id: uuidv4(),
    type: "header",
    template: "simple-header",
    content: {
      logoText: "My Website",
      logoImage: null,
      menuItems: ["Home", "About", "Services", "Contact"],
      menuItemUrls: ["#", "#", "#", "#"],
      menuItemLinkTypes: ["external", "external", "external", "external"],
      menuItemTargetSections: ["", "", "", ""],
      showLogoText: true,
      sectionId: "header",
    },
    styles: {
      padding: 16,
      backgroundColor: "#ffffff",
    },
  },
  {
    id: uuidv4(),
    type: "content",
    template: "hero-section",
    content: {
      heading: "Welcome to My Website",
      subheading: "The best place to find what you need",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc.",
      buttons: [
        { text: "Get Started", variant: "primary", borderRadius: 4, url: "#", linkType: "external", targetSection: "" },
        { text: "Learn More", variant: "outline", borderRadius: 4, url: "#", linkType: "external", targetSection: "" },
      ],
      sectionId: "hero",
    },
    styles: {
      padding: 48,
      backgroundColor: "#f8f9fa",
      textAlign: "center",
    },
  },
  {
    id: uuidv4(),
    type: "footer",
    template: "simple-footer",
    content: {
      companyName: "My Company",
      links: ["Privacy", "Terms", "Contact"],
      linkUrls: ["#", "#", "#"],
      linkTypes: ["external", "external", "external"],
      linkTargetSections: ["", "", ""],
      copyright: `© ${new Date().getFullYear()} My Company. All rights reserved.`,
      sectionId: "footer",
    },
    styles: {
      padding: 24,
      backgroundColor: "#f8f9fa",
    },
  },
]
