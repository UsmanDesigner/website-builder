// lib/content-templates.ts

export const contentTemplates = [
    {
      id: "hero-section",
      name: "Hero Section",
      preview: "Heading + Text + CTA",
      defaultContent: {
        heading: "Welcome to our website",
        subheading: "The best place to find what you need",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc, quis aliquam nisl nunc eu nisl.",
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
  