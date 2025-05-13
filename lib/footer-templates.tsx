// lib/footer-templates.ts

export const footerTemplates = [
    {
      id: "simple-footer",
      name: "Simple Footer",
      preview: "Basic Footer with Links",
      defaultContent: {
        companyName: "Company Name",
        links: ["Privacy", "Terms", "Contact"],
        linkUrls: ["#", "#", "#"],
        linkTypes: ["external", "external", "external"],
        linkTargetSections: ["", "", ""],
        copyright: `© ${new Date().getFullYear()} Company Name. All rights reserved.`,
        sectionId: "footer",
      },
      defaultStyles: {
        padding: 24,
        backgroundColor: "#f8f9fa",
      },
      render: (content: any, styles: any) => (
        <footer>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap" }}>
            <div style={{ fontWeight: "bold", marginBottom: "1rem" }}>{content.companyName || "Company Name"}</div>
            <nav>
              <ul style={{ display: "flex", gap: "1.5rem", listStyle: "none", padding: 0, margin: 0 }}>
                {(content.links || ["Privacy", "Terms", "Contact"]).map((link: string, index: number) => {
                  const linkType = (content.linkTypes || [])[index] || "external"
                  const href =
                    linkType === "section"
                      ? `#${(content.linkTargetSections || [])[index] || ""}`
                      : (content.linkUrls || [])[index] || "#"
  
                  return (
                    <li key={index}>
                      <a href={href} style={{ textDecoration: "none", color: "inherit" }}>
                        {link}
                      </a>
                    </li>
                  )
                })}
              </ul>
            </nav>
          </div>
          <div style={{ marginTop: "1.5rem", fontSize: "0.875rem", opacity: 0.8 }}>
            {content.copyright || `© ${new Date().getFullYear()} Company Name. All rights reserved.`}
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
        links: ["Home", "About", "Services", "Contact"],
        linkUrls: ["#", "#", "#", "#"],
        linkTypes: ["external", "external", "external", "external"],
        linkTargetSections: ["", "", "", ""],
        copyright: `© ${new Date().getFullYear()} Company Name. All rights reserved.`,
        sectionId: "footer",
      },
      defaultStyles: {
        padding: 24,
        backgroundColor: "#f8f9fa",
        textAlign: "center",
      },
      render: (content: any, styles: any) => (
        <footer style={{ textAlign: "center" }}>
          <div style={{ fontWeight: "bold", marginBottom: "1rem" }}>{content.companyName || "Company Name"}</div>
          <nav style={{ marginBottom: "1.5rem" }}>
            <ul
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "1.5rem",
                listStyle: "none",
                padding: 0,
                margin: 0,
                flexWrap: "wrap",
              }}
            >
              {(content.links || ["Home", "About", "Services", "Contact"]).map((link: string, index: number) => {
                const linkType = (content.linkTypes || [])[index] || "external"
                const href =
                  linkType === "section"
                    ? `#${(content.linkTargetSections || [])[index] || ""}`
                    : (content.linkUrls || [])[index] || "#"
  
                return (
                  <li key={index}>
                    <a href={href} style={{ textDecoration: "none", color: "inherit" }}>
                      {link}
                    </a>
                  </li>
                )
              })}
            </ul>
          </nav>
          <div style={{ fontSize: "0.875rem", opacity: 0.8 }}>
            {content.copyright || `© ${new Date().getFullYear()} Company Name. All rights reserved.`}
          </div>
        </footer>
      ),
    },
    {
      id: "multi-column-footer",
      name: "Multi-Column Footer",
      preview: "Multiple Link Columns",
      defaultContent: {
        companyName: "Company Name",
        columns: [
          { title: "Products", links: ["Product 1", "Product 2", "Product 3"] },
          { title: "Company", links: ["About", "Team", "Careers"] },
          { title: "Resources", links: ["Blog", "Documentation", "Support"] },
        ],
        copyright: `© ${new Date().getFullYear()} Company Name. All rights reserved.`,
        sectionId: "footer",
      },
      defaultStyles: {
        padding: 48,
        backgroundColor: "#f8f9fa",
      },
      render: (content: any, styles: any) => (
        <footer>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "2rem" }}>
            <div>
              <div style={{ fontWeight: "bold", fontSize: "1.25rem", marginBottom: "1rem" }}>
                {content.companyName || "Company Name"}
              </div>
            </div>
            {(
              content.columns || [
                { title: "Products", links: ["Product 1", "Product 2", "Product 3"] },
                { title: "Company", links: ["About", "Team", "Careers"] },
                { title: "Resources", links: ["Blog", "Documentation", "Support"] },
              ]
            ).map((column: any, colIndex: number) => (
              <div key={colIndex}>
                <h3 style={{ fontWeight: "bold", marginBottom: "1rem" }}>{column.title}</h3>
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
          <div
            style={{
              marginTop: "3rem",
              fontSize: "0.875rem",
              opacity: 0.8,
              borderTop: "1px solid #dee2e6",
              paddingTop: "1.5rem",
            }}
          >
            {content.copyright || `© ${new Date().getFullYear()} Company Name. All rights reserved.`}
          </div>
        </footer>
      ),
    },
  ]
  