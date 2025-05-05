import { Menu } from "lucide-react"

// Header Templates
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
          {styles.showLogoText && (content.logoText || "Brand")}
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
]

// Content Templates
export const contentTemplates = [
  {
    id: "hero-section",
    name: "Hero Section",
    preview: "Heading + Text + CTA",
    defaultContent: {
      heading: "Welcome to our website",
      subheading: "The best place to find what you need",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc eu nisl.",
      buttons: [
        { text: "Get Started", variant: "primary", borderRadius: 4, url: "#", linkType: "external", targetSection: "" },
        { text: "Learn More", variant: "outline", borderRadius: 4, url: "#", linkType: "external", targetSection: "" },
      ],
      sectionId: "hero",
    },
    defaultStyles: {
      padding: 48,
      backgroundColor: "#f8f9fa",
      textAlign: "center",
    },
    render: (content: any, styles: any) => (
      <section style={{ textAlign: styles.textAlign as any }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>{content.heading || "Welcome to our website"}</h1>
        <h2 style={{ fontSize: "1.5rem", marginBottom: "1.5rem", fontWeight: "normal", opacity: 0.8 }}>
          {content.subheading || "The best place to find what you need"}
        </h2>
        <p style={{ marginBottom: "2rem", maxWidth: "800px", margin: "0 auto 2rem" }}>
          {content.text || "Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
        </p>
        <div>
          {(
            content.buttons || [
              {
                text: "Get Started",
                variant: "primary",
                borderRadius: 4,
                url: "#",
                linkType: "external",
                targetSection: "",
              },
              {
                text: "Learn More",
                variant: "outline",
                borderRadius: 4,
                url: "#",
                linkType: "external",
                targetSection: "",
              },
            ]
          ).map((button: any, index: number) => {
            // Button styles based on variant
            const buttonStyle: any = {
              padding: "0.75rem 1.5rem",
              borderRadius: `${button.borderRadius || 4}px`,
              cursor: "pointer",
              marginRight: index < content.buttons.length - 1 ? "1rem" : 0,
              fontWeight: button.variant === "primary" ? "bold" : "normal",
              display: "inline-block",
              textDecoration: "none",
            }

            if (button.variant === "primary") {
              buttonStyle.backgroundColor = "#0070f3"
              buttonStyle.color = "white"
              buttonStyle.border = "none"
            } else if (button.variant === "secondary") {
              buttonStyle.backgroundColor = "#6c757d"
              buttonStyle.color = "white"
              buttonStyle.border = "none"
            } else if (button.variant === "outline") {
              buttonStyle.backgroundColor = "transparent"
              buttonStyle.color = "inherit"
              buttonStyle.border = "1px solid #ccc"
            } else if (button.variant === "ghost") {
              buttonStyle.backgroundColor = "transparent"
              buttonStyle.color = "#0070f3"
              buttonStyle.border = "none"
            }

            const href = button.linkType === "section" ? `#${button.targetSection || ""}` : button.url || "#"

            return (
              <a key={index} href={href} style={buttonStyle}>
                {button.text}
              </a>
            )
          })}
        </div>
      </section>
    ),
  },
  {
    id: "text-with-image",
    name: "Text with Image",
    preview: "Text + Image Side by Side",
    defaultContent: {
      heading: "About Our Company",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc eu nisl.",
      image: null,
      sectionId: "about",
    },
    defaultStyles: {
      padding: 48,
      backgroundColor: "#ffffff",
    },
    render: (content: any, styles: any) => (
      <section style={{ display: "flex", flexDirection: "row", gap: "2rem", alignItems: "center" }}>
        <div style={{ flex: 1 }}>
          <h2 style={{ fontSize: "2rem", marginBottom: "1rem" }}>{content.heading || "About Our Company"}</h2>
          <p>{content.text || "Lorem ipsum dolor sit amet, consectetur adipiscing elit."}</p>
        </div>
        <div style={{ flex: 1 }}>
          <div
            style={{
              backgroundColor: "#f0f0f0",
              width: "100%",
              paddingTop: "75%",
              position: "relative",
              borderRadius: "0.5rem",
              overflow: "hidden",
            }}
          >
            {content.image ? (
              <img
                src={content.image || "/placeholder.svg"}
                alt={content.heading || "Image"}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            ) : (
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  color: "#999",
                }}
              >
                Image Placeholder
              </div>
            )}
          </div>
        </div>
      </section>
    ),
  },
  {
    id: "features-grid",
    name: "Features Grid",
    preview: "Grid of Feature Cards",
    defaultContent: {
      heading: "Our Features",
      features: [
        { title: "Feature 1", description: "Description of feature 1", image: null },
        { title: "Feature 2", description: "Description of feature 2", image: null },
        { title: "Feature 3", description: "Description of feature 3", image: null },
        { title: "Feature 4", description: "Description of feature 4", image: null },
      ],
      sectionId: "features",
    },
    defaultStyles: {
      padding: 48,
      backgroundColor: "#f8f9fa",
      textAlign: "center",
    },
    render: (content: any, styles: any) => (
      <section style={{ textAlign: styles.textAlign as any }}>
        <h2 style={{ fontSize: "2rem", marginBottom: "2rem" }}>{content.heading || "Our Features"}</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2rem" }}>
          {(
            content.features || [
              { title: "Feature 1", description: "Description of feature 1", image: null },
              { title: "Feature 2", description: "Description of feature 2", image: null },
              { title: "Feature 3", description: "Description of feature 3", image: null },
              { title: "Feature 4", description: "Description of feature 4", image: null },
            ]
          ).map((feature: any, index: number) => (
            <div
              key={index}
              style={{
                padding: "1.5rem",
                backgroundColor: "#ffffff",
                borderRadius: "0.5rem",
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              }}
            >
              <h3 style={{ marginBottom: "0.75rem" }}>{feature.title}</h3>
              <p>{feature.description}</p>
              {feature.image && (
                <img
                  src={feature.image || "/placeholder.svg"}
                  alt={feature.title}
                  style={{
                    width: "100%",
                    marginTop: "1rem",
                    borderRadius: "0.25rem",
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </section>
    ),
  },
]

// Footer Templates
export const footerTemplates = [
  {
    id: "simple-footer",
    name: "Simple Footer",
    preview: "Copyright + Links",
    defaultContent: {
      companyName: "Company Name",
      links: ["Privacy", "Terms", "Contact"],
      linkUrls: ["#", "#", "#"],
      linkTypes: ["external", "external", "external"],
      linkTargetSections: ["", "", ""],
      copyright: "© 2023 Company Name. All rights reserved.",
      sectionId: "footer",
    },
    defaultStyles: {
      padding: 24,
      backgroundColor: "#f8f9fa",
    },
    render: (content: any, styles: any) => (
      <footer style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          {content.copyright ||
            `© ${new Date().getFullYear()} ${content.companyName || "Company Name"}. All rights reserved.`}
        </div>
        <nav>
          <ul style={{ display: "flex", gap: "1rem", listStyle: "none", padding: 0, margin: 0 }}>
            {(content.links || ["Privacy", "Terms", "Contact"]).map((item: string, index: number) => {
              const linkType = (content.linkTypes || [])[index] || "external"
              const href =
                linkType === "section"
                  ? `#${(content.linkTargetSections || [])[index] || ""}`
                  : (content.linkUrls || [])[index] || "#"

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
      </footer>
    ),
  },
  {
    id: "multi-column-footer",
    name: "Multi-Column Footer",
    preview: "Multiple Columns + Copyright",
    defaultContent: {
      companyName: "Company Name",
      columns: [
        { title: "Company", links: ["About", "Team", "Careers"] },
        { title: "Resources", links: ["Blog", "Documentation", "Guides"] },
        { title: "Legal", links: ["Privacy", "Terms", "Contact"] },
      ],
      copyright: "© 2023 Company Name. All rights reserved.",
      sectionId: "footer",
    },
    defaultStyles: {
      padding: 48,
      backgroundColor: "#f8f9fa",
    },
    render: (content: any, styles: any) => (
      <footer>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "2rem",
            marginBottom: "2rem",
          }}
        >
          {(
            content.columns || [
              { title: "Company", links: ["About", "Team", "Careers"] },
              { title: "Resources", links: ["Blog", "Documentation", "Guides"] },
              { title: "Legal", links: ["Privacy", "Terms", "Contact"] },
            ]
          ).map((column: any, index: number) => (
            <div key={index}>
              <h3 style={{ marginBottom: "1rem" }}>{column.title}</h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {column.links.map((link: string, linkIndex: number) => (
                  <li key={linkIndex} style={{ marginBottom: "0.5rem" }}>
                    <a href="#" style={{ textDecoration: "none", color: "inherit" }}>
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ borderTop: "1px solid #dee2e6", paddingTop: "1.5rem", textAlign: "center" }}>
          {content.copyright ||
            `© ${new Date().getFullYear()} ${content.companyName || "Company Name"}. All rights reserved.`}
        </div>
      </footer>
    ),
  },
  {
    id: "centered-footer",
    name: "Centered Footer",
    preview: "Centered Links + Copyright",
    defaultContent: {
      companyName: "Company Name",
      links: ["Home", "About", "Services", "Contact", "Privacy", "Terms"],
      linkUrls: ["#", "#", "#", "#", "#", "#"],
      linkTypes: ["external", "external", "external", "external", "external", "external"],
      linkTargetSections: ["", "", "", "", "", ""],
      copyright: "© 2023 Company Name. All rights reserved.",
      sectionId: "footer",
    },
    defaultStyles: {
      padding: 32,
      backgroundColor: "#f8f9fa",
      textAlign: "center",
    },
    render: (content: any, styles: any) => (
      <footer style={{ textAlign: "center" }}>
        <nav style={{ marginBottom: "1.5rem" }}>
          <ul
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "1rem",
              listStyle: "none",
              padding: 0,
              margin: 0,
            }}
          >
            {(content.links || ["Home", "About", "Services", "Contact", "Privacy", "Terms"]).map(
              (item: string, index: number) => {
                const linkType = (content.linkTypes || [])[index] || "external"
                const href =
                  linkType === "section"
                    ? `#${(content.linkTargetSections || [])[index] || ""}`
                    : (content.linkUrls || [])[index] || "#"

                return (
                  <li key={index}>
                    <a href={href} style={{ textDecoration: "none", color: "inherit" }}>
                      {item}
                    </a>
                  </li>
                )
              },
            )}
          </ul>
        </nav>
        <div>
          {content.copyright ||
            `© ${new Date().getFullYear()} ${content.companyName || "Company Name"}. All rights reserved.`}
        </div>
      </footer>
    ),
  },
]
