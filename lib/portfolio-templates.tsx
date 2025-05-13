// lib/portfolio-templates.ts

export const portfolioTemplates = [
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
                  data-filter="all"
                  className="filter-active"
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
                      data-filter={category}
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
                data-category={item.category}
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
  ]
  