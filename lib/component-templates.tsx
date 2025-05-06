import { Menu, ShoppingCart } from "lucide-react"

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
  // Portfolio Grid Template
  {
    id: "portfolio-grid",
    name: "Portfolio Grid",
    preview: "Portfolio Projects Grid",
    defaultContent: {
      heading: "My Portfolio",
      subheading: "Check out my recent work",
      portfolioItems: [
        {
          title: "Project 1",
          category: "Web Design",
          description: "A beautiful website design for a local business",
          image: null,
          link: "#",
        },
        {
          title: "Project 2",
          category: "Branding",
          description: "Brand identity design for a tech startup",
          image: null,
          link: "#",
        },
        {
          title: "Project 3",
          category: "UI/UX",
          description: "User interface design for a mobile application",
          image: null,
          link: "#",
        },
        {
          title: "Project 4",
          category: "Photography",
          description: "Product photography for an e-commerce website",
          image: null,
          link: "#",
        },
        {
          title: "Project 5",
          category: "Web Design",
          description: "E-commerce website for a fashion brand",
          image: null,
          link: "#",
        },
        {
          title: "Project 6",
          category: "Branding",
          description: "Logo design for a restaurant",
          image: null,
          link: "#",
        },
      ],
      showFilters: true,
      layout: "grid", // grid, masonry, or carousel
      columns: 3,
      sectionId: "portfolio",
    },
    defaultStyles: {
      padding: 48,
      backgroundColor: "#ffffff",
      textAlign: "center",
    },
    render: (content: any, styles: any) => (
      <section style={{ textAlign: styles.textAlign as any }}>
        <h2 style={{ fontSize: "2rem", marginBottom: "1rem" }}>{content.heading || "My Portfolio"}</h2>
        <p style={{ marginBottom: "2rem", maxWidth: "800px", margin: "0 auto 2rem", opacity: 0.8 }}>
          {content.subheading || "Check out my recent work"}
        </p>

        {content.showFilters && (
          <div style={{ marginBottom: "2rem" }}>
            <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "0.5rem" }}>
              <button
                style={{
                  padding: "0.5rem 1rem",
                  backgroundColor: "#0070f3",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                All
              </button>
              {Array.from(new Set((content.portfolioItems || []).map((item: any) => item.category))).map(
                (category: string, index: number) => (
                  <button
                    key={index}
                    style={{
                      padding: "0.5rem 1rem",
                      backgroundColor: "transparent",
                      color: "inherit",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    {category}
                  </button>
                ),
              )}
            </div>
          </div>
        )}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(auto-fill, minmax(${300 / (content.columns || 3)}px, 1fr))`,
            gap: "1.5rem",
          }}
        >
          {(content.portfolioItems || []).map((item: any, index: number) => (
            <div
              key={index}
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "0.5rem",
                overflow: "hidden",
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                transition: "transform 0.3s ease",
              }}
            >
              <div
                style={{
                  backgroundColor: "#f0f0f0",
                  width: "100%",
                  paddingTop: "75%",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {item.image ? (
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
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
              <div style={{ padding: "1.5rem" }}>
                <span
                  style={{
                    display: "inline-block",
                    fontSize: "0.75rem",
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    color: "#0070f3",
                    marginBottom: "0.5rem",
                  }}
                >
                  {item.category}
                </span>
                <h3 style={{ marginBottom: "0.5rem" }}>{item.title}</h3>
                <p style={{ fontSize: "0.875rem", marginBottom: "1rem" }}>{item.description}</p>
                <a
                  href={item.link || "#"}
                  style={{
                    display: "inline-block",
                    color: "#0070f3",
                    textDecoration: "none",
                    fontWeight: "bold",
                    fontSize: "0.875rem",
                  }}
                >
                  View Project →
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    ),
  },
  // Portfolio Masonry Template
  {
    id: "portfolio-masonry",
    name: "Portfolio Masonry",
    preview: "Masonry Portfolio Layout",
    defaultContent: {
      heading: "Portfolio Gallery",
      subheading: "A collection of my best work",
      portfolioItems: [
        {
          title: "Project 1",
          category: "Web Design",
          image: null,
          link: "#",
          height: "tall", // short, medium, tall
        },
        {
          title: "Project 2",
          category: "Branding",
          image: null,
          link: "#",
          height: "medium",
        },
        {
          title: "Project 3",
          category: "UI/UX",
          image: null,
          link: "#",
          height: "short",
        },
        {
          title: "Project 4",
          category: "Photography",
          image: null,
          link: "#",
          height: "medium",
        },
        {
          title: "Project 5",
          category: "Web Design",
          image: null,
          link: "#",
          height: "tall",
        },
        {
          title: "Project 6",
          category: "Branding",
          image: null,
          link: "#",
          height: "short",
        },
        {
          title: "Project 7",
          category: "Photography",
          image: null,
          link: "#",
          height: "medium",
        },
        {
          title: "Project 8",
          category: "UI/UX",
          image: null,
          link: "#",
          height: "short",
        },
      ],
      showFilters: true,
      columns: 4,
      sectionId: "portfolio-masonry",
    },
    defaultStyles: {
      padding: 48,
      backgroundColor: "#ffffff",
      textAlign: "center",
    },
    render: (content: any, styles: any) => (
      <section style={{ textAlign: styles.textAlign as any }}>
        <h2 style={{ fontSize: "2rem", marginBottom: "1rem" }}>{content.heading || "Portfolio Gallery"}</h2>
        <p style={{ marginBottom: "2rem", maxWidth: "800px", margin: "0 auto 2rem", opacity: 0.8 }}>
          {content.subheading || "A collection of my best work"}
        </p>

        {content.showFilters && (
          <div style={{ marginBottom: "2rem" }}>
            <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "0.5rem" }}>
              <button
                style={{
                  padding: "0.5rem 1rem",
                  backgroundColor: "#0070f3",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                All
              </button>
              {Array.from(new Set((content.portfolioItems || []).map((item: any) => item.category))).map(
                (category: string, index: number) => (
                  <button
                    key={index}
                    style={{
                      padding: "0.5rem 1rem",
                      backgroundColor: "transparent",
                      color: "inherit",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    {category}
                  </button>
                ),
              )}
            </div>
          </div>
        )}

        <div
          style={{
            columnCount: content.columns || 4,
            columnGap: "1rem",
          }}
        >
          {(content.portfolioItems || []).map((item: any, index: number) => {
            // Determine height based on item.height
            let heightStyle = "300px"
            if (item.height === "short") heightStyle = "250px"
            if (item.height === "medium") heightStyle = "350px"
            if (item.height === "tall") heightStyle = "450px"

            return (
              <div
                key={index}
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "0.5rem",
                  overflow: "hidden",
                  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                  marginBottom: "1rem",
                  breakInside: "avoid",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    backgroundColor: "#f0f0f0",
                    width: "100%",
                    height: heightStyle,
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {item.image ? (
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
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
                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      padding: "1rem",
                      background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
                      color: "white",
                      textAlign: "left",
                    }}
                  >
                    <h3 style={{ margin: "0 0 0.25rem 0", fontSize: "1.25rem" }}>{item.title}</h3>
                    <span
                      style={{
                        display: "inline-block",
                        fontSize: "0.75rem",
                        fontWeight: "bold",
                        textTransform: "uppercase",
                      }}
                    >
                      {item.category}
                    </span>
                  </div>
                </div>
                <a
                  href={item.link || "#"}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    zIndex: 1,
                  }}
                  aria-label={`View ${item.title}`}
                ></a>
              </div>
            )
          })}
        </div>
      </section>
    ),
  },
  // Portfolio Detail Template
  {
    id: "portfolio-detail",
    name: "Portfolio Detail",
    preview: "Single Project Details",
    defaultContent: {
      projectTitle: "Project Title",
      projectCategory: "Web Design",
      projectDate: "January 2023",
      projectClient: "Client Name",
      projectDescription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc eu nisl.",
      projectImages: [null, null],
      projectLink: "#",
      showMetadata: true,
      sectionId: "project-detail",
    },
    defaultStyles: {
      padding: 48,
      backgroundColor: "#ffffff",
    },
    render: (content: any, styles: any) => (
      <section>
        <div style={{ marginBottom: "2rem" }}>
          <h2 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>{content.projectTitle || "Project Title"}</h2>
          <p style={{ fontSize: "1.125rem", opacity: 0.8, maxWidth: "800px" }}>
            {content.projectDescription || "Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "row", gap: "2rem", marginBottom: "2rem" }}>
          <div style={{ flex: "2" }}>
            <div
              style={{
                backgroundColor: "#f0f0f0",
                width: "100%",
                paddingTop: "60%",
                position: "relative",
                borderRadius: "0.5rem",
                overflow: "hidden",
                marginBottom: "1rem",
              }}
            >
              {content.projectImages && content.projectImages[0] ? (
                <img
                  src={content.projectImages[0] || "/placeholder.svg"}
                  alt={`${content.projectTitle} main image`}
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
                  Main Image Placeholder
                </div>
              )}
            </div>

            {content.projectImages && content.projectImages.length > 1 && (
              <div
                style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "1rem" }}
              >
                {content.projectImages.slice(1).map((image: string | null, index: number) => (
                  <div
                    key={index}
                    style={{
                      backgroundColor: "#f0f0f0",
                      width: "100%",
                      paddingTop: "75%",
                      position: "relative",
                      borderRadius: "0.5rem",
                      overflow: "hidden",
                    }}
                  >
                    {image ? (
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`${content.projectTitle} image ${index + 2}`}
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
                ))}
              </div>
            )}
          </div>

          {content.showMetadata && (
            <div style={{ flex: "1" }}>
              <div
                style={{
                  padding: "1.5rem",
                  backgroundColor: "#f8f9fa",
                  borderRadius: "0.5rem",
                }}
              >
                <h3 style={{ marginBottom: "1rem", fontSize: "1.25rem" }}>Project Details</h3>

                <div style={{ marginBottom: "1rem" }}>
                  <h4 style={{ fontSize: "0.875rem", fontWeight: "bold", marginBottom: "0.25rem" }}>Category</h4>
                  <p>{content.projectCategory || "Web Design"}</p>
                </div>

                <div style={{ marginBottom: "1rem" }}>
                  <h4 style={{ fontSize: "0.875rem", fontWeight: "bold", marginBottom: "0.25rem" }}>Client</h4>
                  <p>{content.projectClient || "Client Name"}</p>
                </div>

                <div style={{ marginBottom: "1rem" }}>
                  <h4 style={{ fontSize: "0.875rem", fontWeight: "bold", marginBottom: "0.25rem" }}>Date</h4>
                  <p>{content.projectDate || "January 2023"}</p>
                </div>

                {content.projectLink && (
                  <a
                    href={content.projectLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-block",
                      padding: "0.75rem 1.5rem",
                      backgroundColor: "#0070f3",
                      color: "white",
                      textDecoration: "none",
                      borderRadius: "4px",
                      fontWeight: "bold",
                      marginTop: "1rem",
                    }}
                  >
                    Visit Project
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    ),
  },
  // Skills & Expertise Template
  {
    id: "skills-expertise",
    name: "Skills & Expertise",
    preview: "Skills with Progress Bars",
    defaultContent: {
      heading: "Skills & Expertise",
      subheading: "What I bring to the table",
      skills: [
        { name: "Web Design", percentage: 90 },
        { name: "UI/UX Design", percentage: 85 },
        { name: "JavaScript", percentage: 80 },
        { name: "React", percentage: 75 },
        { name: "Node.js", percentage: 70 },
        { name: "Figma", percentage: 95 },
      ],
      layout: "bars", // bars, circles, or tags
      sectionId: "skills",
    },
    defaultStyles: {
      padding: 48,
      backgroundColor: "#f8f9fa",
    },
    render: (content: any, styles: any) => (
      <section style={{ textAlign: styles.textAlign as any }}>
        <h2 style={{ fontSize: "2rem", marginBottom: "1rem" }}>{content.heading || "Skills & Expertise"}</h2>
        <p style={{ marginBottom: "2rem", maxWidth: "800px", margin: "0 auto 2rem", opacity: 0.8 }}>
          {content.subheading || "What I bring to the table"}
        </p>

        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          {(content.skills || []).map((skill: any, index: number) => (
            <div key={index} style={{ marginBottom: "1.5rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                <span style={{ fontWeight: "bold" }}>{skill.name}</span>
                <span>{skill.percentage}%</span>
              </div>
              <div
                style={{
                  height: "8px",
                  backgroundColor: "#e9ecef",
                  borderRadius: "4px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${skill.percentage}%`,
                    backgroundColor: "#0070f3",
                    borderRadius: "4px",
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    ),
  },
  // Product Grid Template
  {
    id: "product-grid",
    name: "Product Grid",
    preview: "E-commerce Products Grid",
    defaultContent: {
      heading: "Our Products",
      subheading: "Browse our collection of high-quality products",
      products: [
        {
          id: "prod-1",
          title: "Product 1",
          category: "Category A",
          price: 29.99,
          salePrice: null,
          description: "High-quality product with amazing features",
          image: null,
          link: "#",
          inStock: true,
          quantity: 10,
          sku: "SKU001",
        },
        {
          id: "prod-2",
          title: "Product 2",
          category: "Category B",
          price: 49.99,
          salePrice: 39.99,
          description: "Premium product with exclusive design",
          image: null,
          link: "#",
          inStock: true,
          quantity: 5,
          sku: "SKU002",
        },
        {
          id: "prod-3",
          title: "Product 3",
          category: "Category A",
          price: 19.99,
          salePrice: null,
          description: "Affordable product with great value",
          image: null,
          link: "#",
          inStock: true,
          quantity: 15,
          sku: "SKU003",
        },
        {
          id: "prod-4",
          title: "Product 4",
          category: "Category C",
          price: 59.99,
          salePrice: null,
          description: "Luxury product with premium materials",
          image: null,
          link: "#",
          inStock: false,
          quantity: 0,
          sku: "SKU004",
        },
        {
          id: "prod-5",
          title: "Product 5",
          category: "Category B",
          price: 39.99,
          salePrice: 29.99,
          description: "Special edition product with unique features",
          image: null,
          link: "#",
          inStock: true,
          quantity: 8,
          sku: "SKU005",
        },
        {
          id: "prod-6",
          title: "Product 6",
          category: "Category C",
          price: 69.99,
          salePrice: null,
          description: "Exclusive product with limited availability",
          image: null,
          link: "#",
          inStock: true,
          quantity: 3,
          sku: "SKU006",
        },
      ],
      showFilters: true,
      columns: 3,
      showAddToCart: true,
      showWhatsAppButton: true,
      whatsAppNumber: "+1234567890",
      whatsAppMessage: "Hi, I'm interested in purchasing: ",
      sectionId: "products",
    },
    defaultStyles: {
      padding: 48,
      backgroundColor: "#ffffff",
      textAlign: "center",
    },
    render: (content: any, styles: any) => (
      <section style={{ textAlign: styles.textAlign as any }}>
        <h2 style={{ fontSize: "2rem", marginBottom: "1rem" }}>{content.heading || "Our Products"}</h2>
        <p style={{ marginBottom: "2rem", maxWidth: "800px", margin: "0 auto 2rem", opacity: 0.8 }}>
          {content.subheading || "Browse our collection of high-quality products"}
        </p>

        {content.showFilters && (
          <div style={{ marginBottom: "2rem" }}>
            <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "0.5rem" }}>
              <button
                style={{
                  padding: "0.5rem 1rem",
                  backgroundColor: "#0070f3",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                All
              </button>
              {Array.from(new Set((content.products || []).map((product: any) => product.category))).map(
                (category: string, index: number) => (
                  <button
                    key={index}
                    style={{
                      padding: "0.5rem 1rem",
                      backgroundColor: "transparent",
                      color: "inherit",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    {category}
                  </button>
                ),
              )}
            </div>
          </div>
        )}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(auto-fill, minmax(${300 / (content.columns || 3)}px, 1fr))`,
            gap: "1.5rem",
          }}
        >
          {(content.products || []).map((product: any, index: number) => (
            <div
              key={index}
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "0.5rem",
                overflow: "hidden",
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                transition: "transform 0.3s ease",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  backgroundColor: "#f0f0f0",
                  width: "100%",
                  paddingTop: "100%",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {product.image ? (
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.title}
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
                    Product Image
                  </div>
                )}
                {product.salePrice && (
                  <div
                    style={{
                      position: "absolute",
                      top: "10px",
                      right: "10px",
                      backgroundColor: "#ef4444",
                      color: "white",
                      padding: "0.25rem 0.5rem",
                      borderRadius: "4px",
                      fontSize: "0.75rem",
                      fontWeight: "bold",
                    }}
                  >
                    SALE
                  </div>
                )}
                {!product.inStock && (
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundColor: "rgba(0,0,0,0.5)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <span
                      style={{
                        backgroundColor: "rgba(0,0,0,0.7)",
                        color: "white",
                        padding: "0.5rem 1rem",
                        borderRadius: "4px",
                        fontWeight: "bold",
                      }}
                    >
                      Out of Stock
                    </span>
                  </div>
                )}
              </div>
              <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", flexGrow: 1 }}>
                <span
                  style={{
                    display: "inline-block",
                    fontSize: "0.75rem",
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    color: "#0070f3",
                    marginBottom: "0.5rem",
                  }}
                >
                  {product.category}
                </span>
                <h3 style={{ marginBottom: "0.5rem" }}>{product.title}</h3>
                <p style={{ fontSize: "0.875rem", marginBottom: "1rem", flexGrow: 1 }}>{product.description}</p>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "1rem",
                  }}
                >
                  <div>
                    {product.salePrice ? (
                      <div>
                        <span
                          style={{
                            textDecoration: "line-through",
                            color: "#6c757d",
                            marginRight: "0.5rem",
                            fontSize: "0.875rem",
                          }}
                        >
                          ${product.price.toFixed(2)}
                        </span>
                        <span style={{ fontWeight: "bold", color: "#ef4444", fontSize: "1.25rem" }}>
                          ${product.salePrice.toFixed(2)}
                        </span>
                      </div>
                    ) : (
                      <span style={{ fontWeight: "bold", fontSize: "1.25rem" }}>${product.price.toFixed(2)}</span>
                    )}
                  </div>
                  <div style={{ fontSize: "0.75rem", color: product.inStock ? "#10b981" : "#ef4444" }}>
                    {product.inStock ? `${product.quantity} in stock` : "Out of stock"}
                  </div>
                </div>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  {content.showAddToCart && (
                    <button
                      style={{
                        flex: "1",
                        padding: "0.5rem 1rem",
                        backgroundColor: product.inStock ? "#0070f3" : "#9ca3af",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: product.inStock ? "pointer" : "not-allowed",
                        fontWeight: "bold",
                      }}
                      disabled={!product.inStock}
                    >
                      Add to Cart
                    </button>
                  )}
                  {content.showWhatsAppButton && (
                    <a
                      href={`https://wa.me/${content.whatsAppNumber.replace(/\D/g, "")}?text=${encodeURIComponent(
                        `${content.whatsAppMessage}${product.title} (${product.sku}) - $${
                          product.salePrice ? product.salePrice.toFixed(2) : product.price.toFixed(2)
                        }`,
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "0.5rem",
                        backgroundColor: "#25D366",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="white"
                        stroke="none"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    ),
  },
  // Product Detail Template
  {
    id: "product-detail",
    name: "Product Detail",
    preview: "Single Product Details",
    defaultContent: {
      productTitle: "Premium Product",
      productCategory: "Category A",
      productPrice: 49.99,
      productSalePrice: null,
      productDescription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc eu nisl.",
      productFeatures: [
        "High-quality materials",
        "Durable construction",
        "Elegant design",
        "Easy to use",
        "Satisfaction guaranteed",
      ],
      productImages: [null, null, null],
      productSKU: "SKU001",
      productInStock: true,
      productQuantity: 10,
      showAddToCart: true,
      showWhatsAppButton: true,
      whatsAppNumber: "+1234567890",
      whatsAppMessage: "Hi, I'm interested in purchasing: ",
      sectionId: "product-detail",
    },
    defaultStyles: {
      padding: 48,
      backgroundColor: "#ffffff",
    },
    render: (content: any, styles: any) => (
      <section>
        <div style={{ display: "flex", flexDirection: "row", gap: "2rem", marginBottom: "2rem" }}>
          <div style={{ flex: "1" }}>
            <div
              style={{
                backgroundColor: "#f0f0f0",
                width: "100%",
                paddingTop: "100%",
                position: "relative",
                borderRadius: "0.5rem",
                overflow: "hidden",
                marginBottom: "1rem",
              }}
            >
              {content.productImages && content.productImages[0] ? (
                <img
                  src={content.productImages[0] || "/placeholder.svg"}
                  alt={`${content.productTitle} main image`}
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
                  Main Product Image
                </div>
              )}
              {content.productSalePrice && (
                <div
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    backgroundColor: "#ef4444",
                    color: "white",
                    padding: "0.5rem 1rem",
                    borderRadius: "4px",
                    fontWeight: "bold",
                  }}
                >
                  SALE
                </div>
              )}
            </div>

            {content.productImages && content.productImages.length > 1 && (
              <div
                style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(80px, 1fr))", gap: "0.5rem" }}
              >
                {content.productImages.map((image: string | null, index: number) => (
                  <div
                    key={index}
                    style={{
                      backgroundColor: "#f0f0f0",
                      width: "100%",
                      paddingTop: "100%",
                      position: "relative",
                      borderRadius: "0.25rem",
                      overflow: "hidden",
                      cursor: "pointer",
                    }}
                  >
                    {image ? (
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`${content.productTitle} image ${index + 1}`}
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
                          fontSize: "0.75rem",
                        }}
                      >
                        Image {index + 1}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div style={{ flex: "1" }}>
            <span
              style={{
                display: "inline-block",
                fontSize: "0.875rem",
                fontWeight: "bold",
                textTransform: "uppercase",
                color: "#0070f3",
                marginBottom: "0.5rem",
              }}
            >
              {content.productCategory || "Category"}
            </span>
            <h2 style={{ fontSize: "2rem", marginBottom: "1rem" }}>{content.productTitle || "Product Title"}</h2>

            <div style={{ marginBottom: "1.5rem" }}>
              {content.productSalePrice ? (
                <div>
                  <span
                    style={{
                      textDecoration: "line-through",
                      color: "#6c757d",
                      marginRight: "0.5rem",
                      fontSize: "1rem",
                    }}
                  >
                    ${content.productPrice?.toFixed(2) || "49.99"}
                  </span>
                  <span style={{ fontWeight: "bold", color: "#ef4444", fontSize: "1.5rem" }}>
                    ${content.productSalePrice?.toFixed(2) || "39.99"}
                  </span>
                </div>
              ) : (
                <span style={{ fontWeight: "bold", fontSize: "1.5rem" }}>
                  ${content.productPrice?.toFixed(2) || "49.99"}
                </span>
              )}
            </div>

            <div style={{ marginBottom: "1.5rem" }}>
              <p style={{ fontSize: "1rem", lineHeight: "1.6" }}>
                {content.productDescription || "Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
              </p>
            </div>

            {content.productFeatures && content.productFeatures.length > 0 && (
              <div style={{ marginBottom: "1.5rem" }}>
                <h3 style={{ fontSize: "1.25rem", marginBottom: "0.75rem" }}>Features</h3>
                <ul style={{ paddingLeft: "1.5rem" }}>
                  {content.productFeatures.map((feature: string, index: number) => (
                    <li key={index} style={{ marginBottom: "0.5rem" }}>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div style={{ marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "1rem" }}>
              <div
                style={{
                  padding: "0.5rem 1rem",
                  backgroundColor: content.productInStock ? "#dcfce7" : "#fee2e2",
                  color: content.productInStock ? "#166534" : "#991b1b",
                  borderRadius: "4px",
                  fontWeight: "bold",
                  display: "inline-block",
                }}
              >
                {content.productInStock ? "In Stock" : "Out of Stock"}
              </div>
              {content.productInStock && content.productQuantity && (
                <div style={{ fontSize: "0.875rem", color: "#6c757d" }}>{content.productQuantity} units available</div>
              )}
            </div>

            <div style={{ display: "flex", gap: "1rem", marginBottom: "1.5rem" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  border: "1px solid #e5e7eb",
                  borderRadius: "4px",
                  overflow: "hidden",
                }}
              >
                <button
                  style={{
                    width: "36px",
                    height: "36px",
                    border: "none",
                    backgroundColor: "#f3f4f6",
                    cursor: "pointer",
                    fontSize: "1.25rem",
                  }}
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  defaultValue="1"
                  style={{ width: "50px", height: "36px", border: "none", textAlign: "center" }}
                />
                <button
                  style={{
                    width: "36px",
                    height: "36px",
                    border: "none",
                    backgroundColor: "#f3f4f6",
                    cursor: "pointer",
                    fontSize: "1.25rem",
                  }}
                >
                  +
                </button>
              </div>

              {content.showAddToCart && (
                <button
                  style={{
                    flex: "1",
                    padding: "0.75rem 1.5rem",
                    backgroundColor: content.productInStock ? "#0070f3" : "#9ca3af",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: content.productInStock ? "pointer" : "not-allowed",
                    fontWeight: "bold",
                  }}
                  disabled={!content.productInStock}
                >
                  Add to Cart
                </button>
              )}
            </div>

            {content.showWhatsAppButton && (
              <a
                href={`https://wa.me/${content.whatsAppNumber.replace(/\D/g, "")}?text=${encodeURIComponent(
                  `${content.whatsAppMessage}${content.productTitle} (${content.productSKU}) - $${
                    content.productSalePrice ? content.productSalePrice.toFixed(2) : content.productPrice.toFixed(2)
                  }`,
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "0.75rem 1.5rem",
                  backgroundColor: "#25D366",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  textDecoration: "none",
                  fontWeight: "bold",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="white"
                  stroke="none"
                  style={{ marginRight: "0.5rem" }}
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Order via WhatsApp
              </a>
            )}

            <div style={{ marginTop: "1.5rem", fontSize: "0.875rem", color: "#6c757d" }}>
              SKU: {content.productSKU || "SKU001"}
            </div>
          </div>
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
  // Social Footer
  {
    id: "social-footer",
    name: "Social Footer",
    preview: "Social Icons + Copyright",
    defaultContent: {
      companyName: "Company Name",
      socialLinks: [
        { platform: "Twitter", url: "#", icon: "twitter" },
        { platform: "Facebook", url: "#", icon: "facebook" },
        { platform: "Instagram", url: "#", icon: "instagram" },
        { platform: "LinkedIn", url: "#", icon: "linkedin" },
        { platform: "GitHub", url: "#", icon: "github" },
      ],
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
        <div style={{ marginBottom: "1.5rem" }}>
          <ul
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "1.5rem",
              listStyle: "none",
              padding: 0,
              margin: 0,
            }}
          >
            {(content.socialLinks || []).map((link: any, index: number) => (
              <li key={index}>
                <a
                  href={link.url || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    backgroundColor: "#0070f3",
                    color: "white",
                    textDecoration: "none",
                  }}
                  title={link.platform}
                >
                  {/* Simple text representation of icons */}
                  {link.platform.charAt(0)}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          {content.copyright ||
            `© ${new Date().getFullYear()} ${content.companyName || "Company Name"}. All rights reserved.`}
        </div>
      </footer>
    ),
  },
  // E-commerce Footer
  {
    id: "ecommerce-footer",
    name: "E-commerce Footer",
    preview: "Shop Links + Payment Icons",
    defaultContent: {
      companyName: "Shop Name",
      columns: [
        { title: "Shop", links: ["Products", "New Arrivals", "Best Sellers", "Sale"] },
        { title: "Information", links: ["About Us", "Contact", "Shipping", "Returns"] },
        { title: "Customer Service", links: ["FAQ", "Track Order", "Size Guide", "Privacy Policy"] },
      ],
      showPaymentIcons: true,
      showSocialIcons: true,
      socialLinks: [
        { platform: "Facebook", url: "#" },
        { platform: "Instagram", url: "#" },
        { platform: "Twitter", url: "#" },
      ],
      copyright: "© 2023 Shop Name. All rights reserved.",
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
              { title: "Shop", links: ["Products", "New Arrivals", "Best Sellers", "Sale"] },
              { title: "Information", links: ["About Us", "Contact", "Shipping", "Returns"] },
              { title: "Customer Service", links: ["FAQ", "Track Order", "Size Guide", "Privacy Policy"] },
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
          <div>
            <h3 style={{ marginBottom: "1rem" }}>Newsletter</h3>
            <p style={{ marginBottom: "1rem", fontSize: "0.875rem" }}>
              Subscribe to our newsletter to receive updates and exclusive offers.
            </p>
            <div style={{ display: "flex" }}>
              <input
                type="email"
                placeholder="Your email"
                style={{
                  flex: "1",
                  padding: "0.5rem",
                  border: "1px solid #e5e7eb",
                  borderRadius: "4px 0 0 4px",
                  outline: "none",
                }}
              />
              <button
                style={{
                  padding: "0.5rem 1rem",
                  backgroundColor: "#0070f3",
                  color: "white",
                  border: "none",
                  borderRadius: "0 4px 4px 0",
                  cursor: "pointer",
                }}
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {content.showPaymentIcons && (
          <div style={{ marginBottom: "1.5rem", textAlign: "center" }}>
            <p style={{ marginBottom: "0.5rem", fontSize: "0.875rem", color: "#6c757d" }}>Accepted Payment Methods</p>
            <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
              {["Visa", "Mastercard", "PayPal", "Apple Pay", "Google Pay"].map((method, index) => (
                <div
                  key={index}
                  style={{
                    padding: "0.5rem 1rem",
                    backgroundColor: "#ffffff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "4px",
                    fontSize: "0.75rem",
                    fontWeight: "bold",
                  }}
                >
                  {method}
                </div>
              ))}
            </div>
          </div>
        )}

        {content.showSocialIcons && (
          <div style={{ marginBottom: "1.5rem", textAlign: "center" }}>
            <p style={{ marginBottom: "0.5rem", fontSize: "0.875rem", color: "#6c757d" }}>Follow Us</p>
            <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
              {(content.socialLinks || []).map((link: any, index: number) => (
                <a
                  key={index}
                  href={link.url || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    backgroundColor: "#0070f3",
                    color: "white",
                    textDecoration: "none",
                  }}
                  title={link.platform}
                >
                  {link.platform.charAt(0)}
                </a>
              ))}
            </div>
          </div>
        )}

        <div style={{ borderTop: "1px solid #dee2e6", paddingTop: "1.5rem", textAlign: "center" }}>
          {content.copyright ||
            `© ${new Date().getFullYear()} ${content.companyName || "Shop Name"}. All rights reserved.`}
        </div>
      </footer>
    ),
  },
]
