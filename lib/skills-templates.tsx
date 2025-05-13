// lib/skills-templates.ts

export const skillsTemplates = [
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
                      backgroundColor: skill.color || "#0070f3",
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
  ]
  