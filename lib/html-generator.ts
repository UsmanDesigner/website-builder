import type { ComponentType } from "./types"
import { headerTemplates, contentTemplates, footerTemplates } from "./component-templates"

export function generateHtmlCode(components: ComponentType[], styles: any): string {
  // This is a simplified version - a real implementation would be more complex

  const head = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Website</title>
  <style>
    /* Base styles */
    html, body {
      margin: 0;
      padding: 0;
      height: 100%;
      font-family: ${
        styles.fontFamily === "sans"
          ? "system-ui, sans-serif"
          : styles.fontFamily === "serif"
            ? "Georgia, serif"
            : "monospace"
      };
      font-size: ${styles.fontSize || 16}px;
      color: ${styles.textColor || "#000000"};
      background-color: ${styles.backgroundColor || "#ffffff"};
      scroll-behavior: smooth;
    }
    
    * {
      box-sizing: border-box;
    }
    
    body {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }
    
    /* Responsive containers */
    .container {
      width: 100%;
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1rem;
    }
    
    .narrow {
      width: 100%;
      max-width: 800px;
      margin: 0 auto;
      padding: 0 1rem;
    }
    
    .footer-container {
      margin-top: auto;
    }

    /* Responsive images */
    img {
      max-width: 100%;
      height: auto;
    }

    /* Header styles */
    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 1rem;
    }

    .logo {
      font-weight: bold;
      font-size: 1.25rem;
      display: flex;
      align-items: center;
    }

    .logo img {
      height: 32px;
      margin-right: 0.5rem;
    }

    nav ul {
      display: flex;
      gap: 1rem;
      list-style: none;
      padding: 0;
      margin: 0;
      flex-wrap: wrap;
    }

    nav a {
      text-decoration: none;
      color: inherit;
    }

    /* Mobile menu */
    .mobile-menu-button {
      display: none;
      background: none;
      border: none;
      cursor: pointer;
      padding: 0.5rem;
    }

    /* Button styles */
    .btn {
      display: inline-block;
      padding: 0.75rem 1.5rem;
      cursor: pointer;
      text-decoration: none;
      margin-bottom: 0.5rem;
    }

    .btn-primary {
      background-color: #0070f3;
      color: white;
      border: none;
    }

    .btn-secondary {
      background-color: #6c757d;
      color: white;
      border: none;
    }

    .btn-outline {
      background-color: transparent;
      color: inherit;
      border: 1px solid #ccc;
    }

    .btn-ghost {
      background-color: transparent;
      color: #0070f3;
      border: none;
    }
    
    /* Animation for smooth scrolling */
    html {
      scroll-behavior: smooth;
    }
    
    @media (prefers-reduced-motion: reduce) {
      html {
        scroll-behavior: auto;
      }
    }
    
    /* Image placeholder styles */
    .image-placeholder {
      background-color: #f0f0f0;
      width: 100%;
      padding-top: 75%;
      position: relative;
      border-radius: 0.5rem;
      overflow: hidden;
    }
    
    .image-placeholder-text {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: #999;
    }
    
    .image-placeholder img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    /* Responsive grid */
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 2rem;
    }

    /* Responsive flex layouts */
    .flex-row {
      display: flex;
      flex-direction: row;
      gap: 2rem;
      align-items: center;
    }

    .flex-col {
      flex: 1;
    }

    /* Media queries for responsive design */
    @media (max-width: 768px) {
      .flex-row {
        flex-direction: column;
      }
      
      .flex-col {
        width: 100%;
      }
      
      header {
        flex-direction: column;
        align-items: flex-start;
      }
      
      .mobile-menu-button {
        display: block;
        position: absolute;
        top: 1rem;
        right: 1rem;
      }
      
      nav.mobile-hidden ul {
        display: none;
      }
      
      nav.mobile-visible ul {
        display: flex;
        flex-direction: column;
        width: 100%;
      }
      
      h1 {
        font-size: 2rem !important;
      }
      
      h2 {
        font-size: 1.5rem !important;
      }
      
      .grid {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 480px) {
      .btn {
        display: block;
        width: 100%;
        text-align: center;
      }
    }
  </style>
  <script>
    // Smooth scroll animation for internal links
    document.addEventListener('DOMContentLoaded', function() {
      // Handle smooth scrolling
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
          e.preventDefault();
          
          const targetId = this.getAttribute('href').substring(1);
          if (!targetId) return;
          
          const targetElement = document.getElementById(targetId);
          if (targetElement) {
            targetElement.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }
        });
      });
      
      // Handle mobile menu toggle
      const mobileMenuButtons = document.querySelectorAll('.mobile-menu-button');
      mobileMenuButtons.forEach(button => {
        button.addEventListener('click', function() {
          const nav = this.nextElementSibling;
          if (nav.classList.contains('mobile-hidden')) {
            nav.classList.remove('mobile-hidden');
            nav.classList.add('mobile-visible');
          } else {
            nav.classList.add('mobile-hidden');
            nav.classList.remove('mobile-visible');
          }
        });
      });
    });
  </script>
</head>
<body>
`

  // Separate components by type
  const headerComponents = components.filter((c) => c.type === "header")
  const contentComponents = components.filter((c) => c.type === "content")
  const footerComponents = components.filter((c) => c.type === "footer")

  // Generate HTML for each component type
  const generateComponentHtml = (component: ComponentType) => {
    // Find the appropriate template
    let template
    if (component.type === "header") {
      template = headerTemplates.find((t) => t.id === component.template)
    } else if (component.type === "content") {
      template = contentTemplates.find((t) => t.id === component.template)
    } else if (component.type === "footer") {
      template = footerTemplates.find((t) => t.id === component.template)
    }

    if (!template) return ""

    // Create a div with inline styles for the component
    const combinedStyles = {
      fontFamily: component.styles.fontFamily || styles.fontFamily || "sans",
      fontSize: component.styles.fontSize || styles.fontSize || 16,
      color: component.styles.color || styles.textColor || "#000000",
      backgroundColor: component.styles.backgroundColor || styles.backgroundColor || "#ffffff",
      textAlign: component.styles.textAlign || "left",
      fontWeight: component.styles.fontWeight || "normal",
      fontStyle: component.styles.fontStyle || "normal",
      textDecoration: component.styles.textDecoration || "none",
      padding: component.styles.padding || styles.padding || 16,
      borderRadius: component.styles.borderRadius || styles.borderRadius || 0,
      width: component.styles.width || "full",
      borderWidth: component.styles.borderWidth || 0,
      borderColor: component.styles.borderColor || "#e5e7eb",
      boxShadow: component.styles.boxShadow || "none",
      backgroundImage: component.styles.backgroundImage || null,
      backgroundSize: component.styles.backgroundSize || "cover",
      backgroundPosition: component.styles.backgroundPosition || "center",
      backgroundRepeat: component.styles.backgroundRepeat || "no-repeat",
      backgroundOverlay: component.styles.backgroundOverlay || 0,
      backgroundType: component.styles.backgroundType || "color",
      backgroundGradient: component.styles.backgroundGradient || null,
      showLogoText: component.content.showLogoText !== false,
    }

    // Add section ID if available
    const sectionId = component.content.sectionId ? `id="${component.content.sectionId}"` : ""

    // Generate background style
    let backgroundStyle = ""
    let backgroundOverlayDiv = ""

    if (combinedStyles.backgroundType === "color") {
      backgroundStyle = `background-color: ${combinedStyles.backgroundColor};`
    } else if (combinedStyles.backgroundType === "image" && combinedStyles.backgroundImage) {
      backgroundStyle = `background-color: transparent;`
      backgroundOverlayDiv = `
        <div style="
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: url('${combinedStyles.backgroundImage}');
          background-size: ${combinedStyles.backgroundSize};
          background-position: ${combinedStyles.backgroundPosition};
          background-repeat: ${combinedStyles.backgroundRepeat};
          z-index: 0;
        "></div>
      `

      if (combinedStyles.backgroundOverlay > 0) {
        backgroundOverlayDiv += `
          <div style="
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, ${combinedStyles.backgroundOverlay / 100});
            z-index: 1;
          "></div>
        `
      }
    } else if (combinedStyles.backgroundType === "gradient" && combinedStyles.backgroundGradient) {
      const gradient = combinedStyles.backgroundGradient
      const colorStops = gradient.colors.map((c: any) => `${c.color} ${c.position}%`).join(", ")

      const gradientStyle =
        gradient.type === "linear"
          ? `linear-gradient(${gradient.direction}, ${colorStops})`
          : `radial-gradient(circle at center, ${colorStops})`

      backgroundStyle = `background: ${gradientStyle}; background-color: transparent;`
    }

    // Determine container class based on width
    const containerClass =
      combinedStyles.width === "container" ? "container" : combinedStyles.width === "narrow" ? "narrow" : ""

    // Convert React component to HTML (simplified)
    return `<div ${sectionId} style="
      font-family: ${
        combinedStyles.fontFamily === "sans"
          ? "system-ui, sans-serif"
          : combinedStyles.fontFamily === "serif"
            ? "Georgia, serif"
            : "monospace"
      };
      font-size: ${combinedStyles.fontSize}px;
      color: ${combinedStyles.color};
      ${backgroundStyle}
      text-align: ${combinedStyles.textAlign};
      font-weight: ${combinedStyles.fontWeight};
      font-style: ${combinedStyles.fontStyle};
      text-decoration: ${combinedStyles.textDecoration};
      padding: ${combinedStyles.padding}px;
      border-radius: ${combinedStyles.borderRadius}px;
      border: ${combinedStyles.borderWidth}px solid ${combinedStyles.borderColor};
      position: relative;
      overflow: hidden;
      ${
        combinedStyles.boxShadow === "sm"
          ? "box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);"
          : combinedStyles.boxShadow === "md"
            ? "box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);"
            : combinedStyles.boxShadow === "lg"
              ? "box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);"
              : combinedStyles.boxShadow === "xl"
                ? "box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);"
                : ""
      }
    ">
      ${backgroundOverlayDiv}
      <div class="${containerClass}" style="position: relative; z-index: ${backgroundOverlayDiv ? "2" : "1"}">
        ${
          component.type === "header"
            ? generateHeaderHtml(component)
            : component.type === "content"
              ? generateContentHtml(component)
              : generateFooterHtml(component)
        }
      </div>
    </div>`
  }

  // Combine all components with footers at the bottom
  const headerHtml = headerComponents.map(generateComponentHtml).join("\n")
  const contentHtml = contentComponents.map(generateComponentHtml).join("\n")
  const footerHtml = footerComponents.map(generateComponentHtml).join("\n")

  const body = `
    ${headerHtml}
    ${contentHtml}
    <div class="footer-container">
      ${footerHtml}
    </div>
  `

  const footer = `
</body>
</html>`

  return head + body + footer
}

function generateHeaderHtml(component: ComponentType): string {
  // Simplified header HTML generation
  const { content } = component
  const showLogoText = content.showLogoText !== false

  return `
    <header>
      <div class="logo">
        ${content.logoImage ? `<img src="${content.logoImage}" alt="Logo">` : ""}
        ${showLogoText ? content.logoText || "Brand" : ""}
      </div>
      <button class="mobile-menu-button">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      </button>
      <nav class="mobile-hidden">
        <ul>
          ${(content.menuItems || ["Home", "About", "Services", "Contact"])
            .map((item: string, index: number) => {
              const linkType = (content.menuItemLinkTypes || [])[index] || "external"
              const href =
                linkType === "section"
                  ? `#${(content.menuItemTargetSections || [])[index] || ""}`
                  : (content.menuItemUrls || [])[index] || "#"

              return `<li><a href="${href}">${item}</a></li>`
            })
            .join("")}
        </ul>
      </nav>
    </header>
  `
}

function generateContentHtml(component: ComponentType): string {
  // Simplified content HTML generation
  const { content } = component

  if (component.template === "hero-section") {
    return `
      <section style="text-align: center;">
        <h1 style="font-size: 2.5rem; margin-bottom: 1rem;">${content.heading || "Welcome to our website"}</h1>
        <h2 style="font-size: 1.5rem; margin-bottom: 1.5rem; font-weight: normal; opacity: 0.8;">${content.subheading || "The best place to find what you need"}</h2>
        <p style="margin-bottom: 2rem;">${content.text || "Lorem ipsum dolor sit amet, consectetur adipiscing elit."}</p>
        <div>
          ${(content.buttons || [])
            .map((button: any) => {
              const buttonClass =
                button.variant === "primary"
                  ? "btn btn-primary"
                  : button.variant === "secondary"
                    ? "btn btn-secondary"
                    : button.variant === "outline"
                      ? "btn btn-outline"
                      : "btn btn-ghost"

              const href = button.linkType === "section" ? `#${button.targetSection || ""}` : button.url || "#"

              return `<a href="${href}" class="${buttonClass}" style="border-radius: ${button.borderRadius || 4}px; margin-right: 1rem;">${button.text}</a>`
            })
            .join("")}
        </div>
      </section>
    `
  } else if (component.template === "text-with-image") {
    return `
      <section class="flex-row">
        <div class="flex-col">
          <h2 style="font-size: 2rem; margin-bottom: 1rem;">${content.heading || "About Our Company"}</h2>
          <p>${content.text || "Lorem ipsum dolor sit amet, consectetur adipiscing elit."}</p>
        </div>
        <div class="flex-col">
          <div class="image-placeholder">
            ${
              content.image
                ? `<img src="${content.image}" alt="${content.heading || "Image"}" style="object-fit: cover; width: 100%; height: 100%;">`
                : `<div class="image-placeholder-text">Image Placeholder</div>`
            }
          </div>
        </div>
      </section>
    `
  } else if (component.template === "features-grid") {
    return `
      <section style="text-align: center;">
        <h2 style="font-size: 2rem; margin-bottom: 2rem;">${content.heading || "Our Features"}</h2>
        <div class="grid">
          ${(
            content.features || [
              { title: "Feature 1", description: "Description of feature 1", image: null },
              { title: "Feature 2", description: "Description of feature 2", image: null },
              { title: "Feature 3", description: "Description of feature 3", image: null },
              { title: "Feature 4", description: "Description of feature 4", image: null },
            ]
          )
            .map(
              (feature: any) => `
              <div style="padding: 1.5rem; background-color: #ffffff; border-radius: 0.5rem; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                <h3 style="margin-bottom: 0.75rem;">${feature.title}</h3>
                <p>${feature.description}</p>
                ${
                  feature.image
                    ? `<img src="${feature.image}" alt="${feature.title}" style="width: 100%; margin-top: 1rem; border-radius: 0.25rem;">`
                    : ""
                }
              </div>
            `,
            )
            .join("")}
        </div>
      </section>
    `
  } else {
    return `
      <section>
        <h2 style="font-size: 2rem; margin-bottom: 1rem;">${content.heading || "Section Title"}</h2>
        <p>${content.text || "Lorem ipsum dolor sit amet, consectetur adipiscing elit."}</p>
      </section>
    `
  }
}

function generateFooterHtml(component: ComponentType): string {
  // Get the actual footer content
  const { content } = component

  // Check which template is being used
  if (component.template === "simple-footer") {
    return `
      <footer style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 1rem;">
        <div>${content.copyright || `© ${new Date().getFullYear()} ${content.companyName || "Company Name"}. All rights reserved.`}</div>
        <nav>
          <ul style="display: flex; flex-wrap: wrap; gap: 1rem; list-style: none; padding: 0; margin: 0;">
            ${(content.links || ["Privacy", "Terms", "Contact"])
              .map((item: string, index: number) => {
                const linkType = (content.linkTypes || [])[index] || "external"
                const href =
                  linkType === "section"
                    ? `#${(content.linkTargetSections || [])[index] || ""}`
                    : (content.linkUrls || [])[index] || "#"

                return `<li><a href="${href}" style="text-decoration: none; color: inherit;">${item}</a></li>`
              })
              .join("")}
          </ul>
        </nav>
      </footer>
    `
  } else if (component.template === "multi-column-footer") {
    return `
      <footer>
        <div class="grid" style="grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 2rem; margin-bottom: 2rem;">
          ${(
            content.columns || [
              { title: "Company", links: ["About", "Team", "Careers"] },
              { title: "Resources", links: ["Blog", "Documentation", "Guides"] },
              { title: "Legal", links: ["Privacy", "Terms", "Contact"] },
            ]
          )
            .map(
              (column: any) => `
              <div>
                <h3 style="margin-bottom: 1rem;">${column.title}</h3>
                <ul style="list-style: none; padding: 0; margin: 0;">
                  ${column.links
                    .map(
                      (link: string) => `
                      <li style="margin-bottom: 0.5rem;">
                        <a href="#" style="text-decoration: none; color: inherit;">${link}</a>
                      </li>
                    `,
                    )
                    .join("")}
                </ul>
              </div>
            `,
            )
            .join("")}
        </div>
        <div style="border-top: 1px solid #dee2e6; padding-top: 1.5rem; text-align: center;">
          ${content.copyright || `© ${new Date().getFullYear()} ${content.companyName || "Company Name"}. All rights reserved.`}
        </div>
      </footer>
    `
  } else if (component.template === "centered-footer") {
    return `
      <footer style="text-align: center;">
        <nav style="margin-bottom: 1.5rem;">
          <ul style="display: flex; flex-wrap: wrap; justify-content: center; gap: 1rem; list-style: none; padding: 0; margin: 0;">
            ${(content.links || ["Home", "About", "Services", "Contact", "Privacy", "Terms"])
              .map((item: string, index: number) => {
                const linkType = (content.linkTypes || [])[index] || "external"
                const href =
                  linkType === "section"
                    ? `#${(content.linkTargetSections || [])[index] || ""}`
                    : (content.linkUrls || [])[index] || "#"

                return `<li><a href="${href}" style="text-decoration: none; color: inherit;">${item}</a></li>`
              })
              .join("")}
          </ul>
        </nav>
        <div>
          ${content.copyright || `© ${new Date().getFullYear()} ${content.companyName || "Company Name"}. All rights reserved.`}
        </div>
      </footer>
    `
  } else {
    // Default footer if template not found
    return `
      <footer style="text-align: center; padding: 1rem 0;">
        <p>© ${new Date().getFullYear()} ${content.companyName || "Company Name"}. All rights reserved.</p>
      </footer>
    `
  }
}
