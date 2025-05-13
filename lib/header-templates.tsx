// lib/header-templates.ts
import { Menu, ShoppingCart } from "lucide-react"

export const headerTemplates = [
  {
    id: "simple-header",
    name: "Simple Header",
    preview: "Logo + Navigation",
    defaultContent: {
      logoText: "Brand",
      logoImage: null,
      menuItems: ["Home", "About", "Services", "Contact"],
      menuItemUrls: ["#", "#", "#", "#"],
      menuItemLinkTypes: ["external", "external", "external", "external"],
      menuItemTargetSections: ["", "", "", ""],
      showLogoText: true,
      sectionId: "header",
    },
    defaultStyles: {
      padding: 16,
      backgroundColor: "#ffffff",
    },
    render: (content: any, styles: any) => (
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontWeight: "bold", fontSize: "1.25rem", display: "flex", alignItems: "center" }}>
          {content.logoImage ? (
            <img
              src={content.logoImage || "/placeholder.svg"}
              alt={content.logoText || "Logo"}
              style={{ height: "32px", marginRight: content.logoText && styles.showLogoText ? "0.5rem" : "0" }}
            />
          ) : null}
          {content.showLogoText && (content.logoText || "Brand")}
        </div>
        <nav>
          <ul style={{ display: "flex", gap: "1rem", listStyle: "none", padding: 0, margin: 0 }}>
            {(content.menuItems || ["Home", "About", "Services", "Contact"]).map((item: string, index: number) => {
              const linkType = (content.menuItemLinkTypes || [])[index] || "external"
              const href =
                linkType === "section"
                  ? `#${(content.menuItemTargetSections || [])[index] || ""}`
                  : (content.menuItemUrls || [])[index] || "#"

              return (
                <li key={index}>
                  <a href={href} style={{ textDecoration: "none", color: "inherit" }}>
                    {item}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>
      </header>
    ),
  },
  {
    id: "centered-header",
    name: "Centered Header",
    preview: "Centered Logo + Navigation",
    defaultContent: {
      logoText: "Brand",
      menuItems: ["Home", "About", "Services", "Contact"],
      menuItemUrls: ["#", "#", "#", "#"],
      menuItemLinkTypes: ["external", "external", "external", "external"],
      menuItemTargetSections: ["", "", "", ""],
      showLogoText: true,
      sectionId: "header",
    },
    defaultStyles: {
      padding: 16,
      backgroundColor: "#ffffff",
      textAlign: "center",
    },
    render: (content: any, styles: any) => (
      <header style={{ textAlign: "center" }}>
        <div
          style={{
            fontWeight: "bold",
            fontSize: "1.5rem",
            marginBottom: "1rem",
            display: "inline-flex",
            alignItems: "center",
          }}
        >
          {content.logoImage ? (
            <img
              src={content.logoImage || "/placeholder.svg"}
              alt={content.logoText || "Logo"}
              style={{ height: "32px", marginRight: content.logoText && styles.showLogoText ? "0.5rem" : "0" }}
            />
          ) : null}
          {styles.showLogoText && (content.logoText || "Brand")}
        </div>
        <nav>
          <ul
            style={{ display: "flex", justifyContent: "center", gap: "2rem", listStyle: "none", padding: 0, margin: 0 }}
          >
            {(content.menuItems || ["Home", "About", "Services", "Contact"]).map((item: string, index: number) => {
              const linkType = (content.menuItemLinkTypes || [])[index] || "external"
              const href =
                linkType === "section"
                  ? `#${(content.menuItemTargetSections || [])[index] || ""}`
                  : (content.menuItemUrls || [])[index] || "#"

              return (
                <li key={index}>
                  <a href={href} style={{ textDecoration: "none", color: "inherit" }}>
                    {item}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>
      </header>
    ),
  },
  {
    id: "stacked-header",
    name: "Stacked Header",
    preview: "Logo + Stacked Navigation",
    defaultContent: {
      logoText: "Brand",
      menuItems: ["Home", "About", "Services", "Contact"],
      menuItemUrls: ["#", "#", "#", "#"],
      menuItemLinkTypes: ["external", "external", "external", "external"],
      menuItemTargetSections: ["", "", "", ""],
      showLogoText: true,
      sectionId: "header",
    },
    defaultStyles: {
      padding: 16,
      backgroundColor: "#ffffff",
    },
    render: (content: any, styles: any) => (
      <header>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
          <div style={{ fontWeight: "bold", fontSize: "1.25rem", display: "flex", alignItems: "center" }}>
            {content.logoImage ? (
              <img
                src={content.logoImage || "/placeholder.svg"}
                alt={content.logoText || "Logo"}
                style={{ height: "32px", marginRight: content.logoText && styles.showLogoText ? "0.5rem" : "0" }}
              />
            ) : null}
            {styles.showLogoText && (content.logoText || "Brand")}
          </div>
          <button style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}>
            <Menu />
          </button>
        </div>
        <nav>
          <ul
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
              listStyle: "none",
              padding: 0,
              margin: 0,
            }}
          >
            {(content.menuItems || ["Home", "About", "Services", "Contact"]).map((item: string, index: number) => {
              const linkType = (content.menuItemLinkTypes || [])[index] || "external"
              const href =
                linkType === "section"
                  ? `#${(content.menuItemTargetSections || [])[index] || ""}`
                  : (content.menuItemUrls || [])[index] || "#"

              return (
                <li key={index}>
                  <a
                    href={href}
                    style={{ textDecoration: "none", color: "inherit", display: "block", padding: "0.5rem 0" }}
                  >
                    {item}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>
      </header>
    ),
  },
  {
    id: "ecommerce-header",
    name: "E-commerce Header",
    preview: "Logo + Nav + Cart",
    defaultContent: {
      logoText: "Shop",
      logoImage: null,
      menuItems: ["Home", "Products", "Categories", "Contact"],
      menuItemUrls: ["#", "#", "#", "#"],
      menuItemLinkTypes: ["external", "external", "external", "external"],
      menuItemTargetSections: ["", "", "", ""],
      showLogoText: true,
      cartCount: 0,
      sectionId: "header",
    },
    defaultStyles: {
      padding: 16,
      backgroundColor: "#ffffff",
    },
    render: (content: any, styles: any) => (
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontWeight: "bold", fontSize: "1.25rem", display: "flex", alignItems: "center" }}>
          {content.logoImage ? (
            <img
              src={content.logoImage || "/placeholder.svg"}
              alt={content.logoText || "Logo"}
              style={{ height: "32px", marginRight: content.logoText && styles.showLogoText ? "0.5rem" : "0" }}
            />
          ) : null}
          {styles.showLogoText && (content.logoText || "Shop")}
        </div>
        <nav style={{ display: "flex", alignItems: "center" }}>
          <ul style={{ display: "flex", gap: "1rem", listStyle: "none", padding: 0, margin: 0 }}>
            {(content.menuItems || ["Home", "Products", "Categories", "Contact"]).map((item: string, index: number) => {
              const linkType = (content.menuItemLinkTypes || [])[index] || "external"
              const href =
                linkType === "section"
                  ? `#${(content.menuItemTargetSections || [])[index] || ""}`
                  : (content.menuItemUrls || [])[index] || "#"

              return (
                <li key={index}>
                  <a href={href} style={{ textDecoration: "none", color: "inherit" }}>
                    {item}
                  </a>
                </li>
              )
            })}
          </ul>
          <div style={{ marginLeft: "1.5rem", position: "relative" }}>
            <a href="#cart" style={{ textDecoration: "none", color: "inherit", display: "flex", alignItems: "center" }}>
              <ShoppingCart style={{ width: "20px", height: "20px" }} />
              {content.cartCount > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: "-8px",
                    right: "-8px",
                    backgroundColor: "#ef4444",
                    color: "white",
                    borderRadius: "50%",
                    width: "18px",
                    height: "18px",
                    fontSize: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {content.cartCount}
                </span>
              )}
            </a>
          </div>
        </nav>
      </header>
    ),
  },
]
