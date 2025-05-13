"use client"

import { useState } from "react"
import { X, Copy, Download, Globe, Code, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { headerTemplates } from "@/lib/header-templates"
import { contentTemplates } from "@/lib/content-templates"
import { portfolioTemplates } from "@/lib/portfolio-templates"
import { skillsTemplates } from "@/lib/skills-templates"
import { ecommerceTemplates } from "@/lib/ecommerce-templates"
import { footerTemplates } from "@/lib/footer-templates"
import type { ComponentType } from "@/lib/types"

interface ExportPanelProps {
  components: ComponentType[]
  styles: any
  onClose: () => void
}

// Combine all templates for easier lookup
const allTemplates = [
  ...headerTemplates,
  ...contentTemplates,
  ...portfolioTemplates,
  ...skillsTemplates,
  ...ecommerceTemplates,
  ...footerTemplates,
]

export function ExportPanel({ components, styles, onClose }: ExportPanelProps) {
  const [activeTab, setActiveTab] = useState("html")
  const [copied, setCopied] = useState(false)
  const [deployUrl, setDeployUrl] = useState("")
  const [deploying, setDeploying] = useState(false)
  const [deploySuccess, setDeploySuccess] = useState(false)

  // Generate HTML for each component
  const generateComponentsHTML = () => {
    return components
      .map((component) => {
        const template = allTemplates.find((t) => t.id === component.template)
        if (!template) return ""

        // Create a wrapper div with the component's styles
        const wrapperStyles = {
          backgroundColor: component.styles.backgroundColor || styles.backgroundColor,
          padding: `${component.styles.padding || styles.padding}px`,
          color: component.styles.color || styles.textColor,
          fontFamily: component.styles.fontFamily
            ? component.styles.fontFamily === "sans"
              ? "ui-sans-serif, system-ui, sans-serif"
              : component.styles.fontFamily === "serif"
                ? "ui-serif, Georgia, serif"
                : "ui-monospace, monospace"
            : styles.fontFamily === "sans"
              ? "ui-sans-serif, system-ui, sans-serif"
              : styles.fontFamily === "serif"
                ? "ui-serif, Georgia, serif"
                : "ui-monospace, monospace",
          fontSize: `${component.styles.fontSize || styles.fontSize}px`,
          textAlign: component.styles.textAlign || "left",
          fontWeight: component.styles.fontWeight || "normal",
          fontStyle: component.styles.fontStyle || "normal",
          textDecoration: component.styles.textDecoration || "none",
          borderRadius: component.styles.borderRadius ? `${component.styles.borderRadius}px` : "0",
          width: component.styles.width || "100%",
          height: component.styles.height || "auto",
          backgroundImage:
            component.styles.backgroundType === "image"
              ? `url(${component.styles.backgroundImage})`
              : component.styles.backgroundType === "gradient"
                ? component.styles.gradientType === "linear"
                  ? `linear-gradient(${component.styles.gradientDirection || "to right"}, ${component.styles.gradientStartColor || "#ffffff"}, ${component.styles.gradientEndColor || "#000000"})`
                  : `radial-gradient(circle, ${component.styles.gradientStartColor || "#ffffff"}, ${component.styles.gradientEndColor || "#000000"})`
                : component.styles.backgroundType === "colorWithGradient"
                  ? component.styles.gradientType === "linear"
                    ? `linear-gradient(${component.styles.gradientDirection || "to right"}, ${component.styles.gradientStartColor || "#ffffff"}${
                        component.styles.gradientOpacity !== undefined
                          ? Math.round(component.styles.gradientOpacity * 0.01 * 255)
                              .toString(16)
                              .padStart(2, "0")
                          : "ff"
                      }, ${component.styles.gradientEndColor || "#000000"}${
                        component.styles.gradientOpacity !== undefined
                          ? Math.round(component.styles.gradientOpacity * 0.01 * 255)
                              .toString(16)
                              .padStart(2, "0")
                          : "ff"
                      }), url(${component.styles.backgroundImage})`
                    : `radial-gradient(circle, ${component.styles.gradientStartColor || "#ffffff"}${
                        component.styles.gradientOpacity !== undefined
                          ? Math.round(component.styles.gradientOpacity * 0.01 * 255)
                              .toString(16)
                              .padStart(2, "0")
                          : "ff"
                      }, ${component.styles.gradientEndColor || "#000000"}${
                        component.styles.gradientOpacity !== undefined
                          ? Math.round(component.styles.gradientOpacity * 0.01 * 255)
                              .toString(16)
                              .padStart(2, "0")
                          : "ff"
                      }), url(${component.styles.backgroundImage})`
                  : component.styles.backgroundImage
                    ? `url(${component.styles.backgroundImage})`
                    : "none",
          backgroundSize: component.styles.backgroundSize || "cover",
          backgroundPosition: component.styles.backgroundPosition || "center",
          backgroundRepeat: component.styles.backgroundRepeat || "no-repeat",
        }

        // Convert the styles object to a CSS string
        const styleString = Object.entries(wrapperStyles)
          .map(([key, value]) => {
            if (value && value !== "none" && value !== "normal" && value !== "0" && value !== "auto") {
              return `${key.replace(/([A-Z])/g, "-$1").toLowerCase()}: ${value};`
            }
            return ""
          })
          .filter(Boolean)
          .join(" ")

        // Get the section ID for anchor links
        const sectionId = component.content.sectionId ? ` id="${component.content.sectionId}"` : ""

        try {
          // For preview, we'll use the template's render function directly
          // This is a simplified approach - in a real implementation, you'd need to convert React elements to HTML
          let htmlContent = ""

          // Handle different component types
          if (component.type === "header") {
            const { logoText, logoImage, menuItems, showLogoText } = component.content

            // Create a simplified HTML representation based on the template
            if (component.template === "simple-header") {
              htmlContent = `
                <header style="display: flex; justify-content: space-between; align-items: center;">
                  <div style="font-weight: bold; font-size: 1.25rem; display: flex; align-items: center;">
                    ${logoImage ? `<img src="${logoImage}" alt="${logoText}" style="height: 32px; margin-right: 0.5rem;">` : ""}
                    ${showLogoText !== false ? logoText || "Brand" : ""}
                  </div>
                  <nav>
                    <ul style="display: flex; gap: 1rem; list-style: none; padding: 0; margin: 0;">
                      ${(menuItems || ["Home", "About", "Services", "Contact"])
                        .map(
                          (item) => `<li><a href="#" style="text-decoration: none; color: inherit;">${item}</a></li>`,
                        )
                        .join("")}
                    </ul>
                  </nav>
                </header>
              `
            } else if (component.template === "centered-header") {
              // Similar implementation for other header types
              htmlContent = `
                <header style="text-align: center;">
                  <div style="font-weight: bold; font-size: 1.5rem; margin-bottom: 1rem; display: inline-flex; align-items: center;">
                    ${logoImage ? `<img src="${logoImage}" alt="${logoText}" style="height: 32px; margin-right: 0.5rem;">` : ""}
                    ${showLogoText !== false ? logoText || "Brand" : ""}
                  </div>
                  <nav>
                    <ul style="display: flex; justify-content: center; gap: 2rem; list-style: none; padding: 0; margin: 0;">
                      ${(menuItems || ["Home", "About", "Services", "Contact"])
                        .map(
                          (item) => `<li><a href="#" style="text-decoration: none; color: inherit;">${item}</a></li>`,
                        )
                        .join("")}
                    </ul>
                  </nav>
                </header>
              `
            } else {
              // Fallback for other header templates
              htmlContent = `<header><h1>${logoText || "Header"}</h1></header>`
            }
          } else if (component.type === "content") {
            const { heading, subheading, text, buttons, features } = component.content

            if (component.template === "hero-section") {
              htmlContent = `
                <section style="text-align: ${component.styles.textAlign || "center"};">
                  <h1 style="font-size: 2.5rem; margin-bottom: 1rem;">${heading || "Welcome to our website"}</h1>
                  <h2 style="font-size: 1.5rem; margin-bottom: 1.5rem; font-weight: normal; opacity: 0.8;">
                    ${subheading || "The best place to find what you need"}
                  </h2>
                  <p style="margin-bottom: 2rem; max-width: 800px; margin: 0 auto 2rem;">
                    ${text || "Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
                  </p>
                  <div>
                    ${(buttons || [])
                      .map((button, index) => {
                        const buttonStyle =
                          button.variant === "primary"
                            ? "background-color: #0070f3; color: white; border: none;"
                            : "background-color: transparent; color: inherit; border: 1px solid #ccc;"

                        return `
                        <a href="${button.url || "#"}" style="
                          padding: 0.75rem 1.5rem; 
                          border-radius: ${button.borderRadius || 4}px; 
                          cursor: pointer; 
                          margin-right: ${index < buttons.length - 1 ? "1rem" : "0"};
                          font-weight: ${button.variant === "primary" ? "bold" : "normal"};
                          display: inline-block;
                          text-decoration: none;
                          ${buttonStyle}
                        ">
                          ${button.text}
                        </a>
                      `
                      })
                      .join("")}
                  </div>
                </section>
              `
            } else if (component.template === "features-grid") {
              htmlContent = `
                <section style="text-align: ${component.styles.textAlign || "center"};">
                  <h2 style="font-size: 2rem; margin-bottom: 2rem;">${heading || "Our Features"}</h2>
                  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem;">
                    ${(features || [])
                      .map(
                        (feature) => `
                      <div style="padding: 1.5rem; background-color: #ffffff; border-radius: 0.5rem; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                        <h3 style="margin-bottom: 0.75rem;">${feature.title}</h3>
                        <p>${feature.description}</p>
                        ${feature.image ? `<img src="${feature.image}" alt="${feature.title}" style="width: 100%; margin-top: 1rem; border-radius: 0.25rem;">` : ""}
                      </div>
                    `,
                      )
                      .join("")}
                  </div>
                </section>
              `
            } else if (component.template === "skills-expertise") {
              const { heading, subheading, skills } = component.content

              htmlContent = `
                <section style="text-align: ${component.styles.textAlign || "left"};">
                  <h2 style="font-size: 2rem; margin-bottom: 1rem;">${heading || "Skills & Expertise"}</h2>
                  <p style="margin-bottom: 2rem; max-width: 800px; margin: 0 auto 2rem; opacity: 0.8;">
                    ${subheading || "What I bring to the table"}
                  </p>
                  
                  <div style="max-width: 800px; margin: 0 auto;">
                    ${(skills || [])
                      .map(
                        (skill: any) => `
                      <div style="margin-bottom: 1.5rem;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                          <span style="font-weight: bold;">${skill.name}</span>
                          <span>${skill.percentage}%</span>
                        </div>
                        <div style="height: 8px; background-color: #e9ecef; border-radius: 4px; overflow: hidden;">
                          <div style="height: 100%; width: ${skill.percentage}%; background-color: ${skill.color || "#0070f3"}; border-radius: 4px;"></div>
                        </div>
                      </div>
                    `,
                      )
                      .join("")}
                  </div>
                </section>
              `
            }
            // Add proper handling for portfolio templates
            else if (component.template === "portfolio-grid" || component.template === "portfolio-masonry") {
              const { heading, subheading, portfolioItems } = component.content

              htmlContent = `
                <section style="text-align: ${component.styles.textAlign || "center"};">
                  <h2 style="font-size: 2rem; margin-bottom: 1rem;">${heading || "My Portfolio"}</h2>
                  <p style="margin-bottom: 2rem; max-width: 800px; margin: 0 auto 2rem; opacity: 0.8;">
                    ${subheading || "Check out my recent work"}
                  </p>
                  
                  <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 1.5rem;">
                    ${(portfolioItems || [])
                      .map(
                        (item: any) => `
                      <div style="background-color: #ffffff; border-radius: 0.5rem; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                        <div style="background-color: #f0f0f0; width: 100%; padding-top: 75%; position: relative; overflow: hidden;">
                          ${
                            item.image
                              ? `<img src="${item.image}" alt="${item.title}" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover;">`
                              : `<div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); color: #999;">Image Placeholder</div>`
                          }
                        </div>
                        <div style="padding: 1.5rem;">
                          <span style="display: inline-block; font-size: 0.75rem; font-weight: bold; text-transform: uppercase; color: #0070f3; margin-bottom: 0.5rem;">
                            ${item.category}
                          </span>
                          <h3 style="margin-bottom: 0.5rem;">${item.title}</h3>
                          <a href="${item.link || "#"}" style="display: inline-block; color: #0070f3; text-decoration: none; font-weight: bold; font-size: 0.875rem;">
                            View Project →
                          </a>
                        </div>
                      </div>
                    `,
                      )
                      .join("")}
                  </div>
                </section>
              `
            }

            // Add proper handling for product-grid template
            else if (component.template === "product-grid") {
              const { heading, subheading, products, columns, showFilters } = component.content

              // Get unique categories for filtering
              const categories = Array.from(new Set((products || []).map((product: any) => product.category)))

              htmlContent = `
                <section style="text-align: ${component.styles.textAlign || "center"};">
                  <h2 style="font-size: 2rem; margin-bottom: 1rem;">${heading || "Our Products"}</h2>
                  <p style="margin-bottom: 2rem; max-width: 800px; margin: 0 auto 2rem; opacity: 0.8;">
                    ${subheading || "Browse our collection of high-quality products"}
                  </p>
                  
                  ${
                    showFilters
                      ? `
                    <div style="margin-bottom: 2rem;">
                      <div style="display: flex; justify-content: center; flex-wrap: wrap; gap: 0.5rem;">
                        <button 
                          data-filter="all" 
                          style="padding: 0.5rem 1rem; background-color: #0070f3; color: white; border: none; border-radius: 4px; cursor: pointer; margin: 0 0.25rem 0.5rem;"
                          onclick="filterProducts('all')"
                        >
                          All
                        </button>
                        ${categories
                          .map(
                            (category: string) => `
                          <button 
                            data-filter="${category}" 
                            style="padding: 0.5rem 1rem; background-color: transparent; color: inherit; border: 1px solid #ccc; border-radius: 4px; cursor: pointer; margin: 0 0.25rem 0.5rem;"
                            onclick="filterProducts('${category}')"
                          >
                            ${category}
                          </button>
                        `,
                          )
                          .join("")}
                      </div>
                    </div>
                  `
                      : ""
                  }
                  
                  <div style="display: grid; grid-template-columns: repeat(${columns || 3}, 1fr); gap: 2rem;" class="product-grid">
                    ${(products || [])
                      .map(
                        (product: any) => `
                      <div 
                        data-category="${product.category}"
                        class="product-item"
                        style="
                          background-color: #ffffff; 
                          border-radius: 0.75rem; 
                          overflow: hidden; 
                          box-shadow: 0 4px 10px rgba(0,0,0,0.1); 
                          transition: transform 0.3s ease, box-shadow 0.3s ease;
                          display: flex;
                          flex-direction: column;
                          height: 100%;
                          border: 1px solid #eee;
                        "
                        onmouseover="this.style.transform='translateY(-5px)'; this.style.boxShadow='0 10px 20px rgba(0,0,0,0.15)';"
                        onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 10px rgba(0,0,0,0.1)';"
                      >
                        <div style="background-color: #f5f5f7; width: 100%; padding-top: 100%; position: relative; overflow: hidden;">
                          ${
                            product.image
                              ? `<img 
                                src="${product.image}" 
                                alt="${product.title}" 
                                style="
                                  position: absolute; 
                                  top: 0; 
                                  left: 0; 
                                  width: 100%; 
                                  height: 100%; 
                                  object-fit: cover;
                                  transition: transform 0.5s ease;
                                "
                                onmouseover="this.style.transform='scale(1.05)';"
                                onmouseout="this.style.transform='scale(1)';"
                              >`
                              : `<div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); color: #999;">Product Image</div>`
                          }
                          ${
                            product.salePrice !== null
                              ? `<div style="position: absolute; top: 10px; right: 10px; background-color: #ef4444; color: white; padding: 0.25rem 0.75rem; border-radius: 4px; font-size: 0.75rem; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">SALE</div>`
                              : ""
                          }
                          ${
                            !product.inStock
                              ? `<div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background-color: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center;">
                                <span style="background-color: rgba(0,0,0,0.7); color: white; padding: 0.5rem 1rem; border-radius: 4px; font-weight: bold;">Out of Stock</span>
                              </div>`
                              : ""
                          }
                        </div>
                        <div style="padding: 1.5rem; display: flex; flex-direction: column; flex-grow: 1;">
                          <span style="display: inline-block; font-size: 0.75rem; font-weight: bold; text-transform: uppercase; color: #0070f3; margin-bottom: 0.5rem;">
                            ${product.category}
                          </span>
                          <h3 style="margin-bottom: 0.5rem; font-size: 1.25rem;">${product.title}</h3>
                          <p style="font-size: 0.875rem; margin-bottom: 1.5rem; flex-grow: 1; color: #666;">${product.description}</p>
                          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.25rem;">
                            <div>
                              ${
                                product.salePrice !== null
                                  ? `<div>
                                    <span style="text-decoration: line-through; color: #6c757d; margin-right: 0.5rem; font-size: 0.875rem;">$${product.price.toFixed(2)}</span>
                                    <span style="font-weight: bold; color: #ef4444; font-size: 1.25rem;">$${product.salePrice.toFixed(2)}</span>
                                  </div>`
                                  : `<span style="font-weight: bold; font-size: 1.25rem;">$${product.price.toFixed(2)}</span>`
                              }
                            </div>
                            <div style="font-size: 0.75rem; color: ${product.inStock ? "#10b981" : "#ef4444"};">
                              ${product.inStock ? `${product.quantity} in stock` : "Out of stock"}
                            </div>
                          </div>
                          <div style="display: flex; gap: 0.5rem;">
                            <button 
                              style="
                                flex: 1; 
                                padding: 0.75rem 1rem; 
                                background-color: ${product.inStock ? "#0070f3" : "#9ca3af"}; 
                                color: white; 
                                border: none; 
                                border-radius: 4px; 
                                cursor: ${product.inStock ? "pointer" : "not-allowed"}; 
                                font-weight: bold;
                                transition: background-color 0.2s ease;
                              "
                              ${!product.inStock ? "disabled" : ""}
                              onmouseover="if(${product.inStock}) this.style.backgroundColor='#0051b3';"
                              onmouseout="if(${product.inStock}) this.style.backgroundColor='#0070f3';"
                              onclick="addToCart('${product.id}', '${product.title}', ${product.salePrice !== null ? product.salePrice : product.price})"
                            >
                              ${product.addToCartText || "Add to Cart"}
                            </button>
                          </div>
                        </div>
                      </div>
                    `,
                      )
                      .join("")}
                  </div>
                </section>
              `
            } else {
              // Fallback for other content templates
              htmlContent = `<section><h2>${heading || "Content Section"}</h2><p>${text || ""}</p></section>`
            }
          } else if (component.type === "footer") {
            const { companyName, links, copyright } = component.content

            if (component.template === "simple-footer") {
              htmlContent = `
                <footer>
                  <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap;">
                    <div style="font-weight: bold; margin-bottom: 1rem;">${companyName || "Company Name"}</div>
                    <nav>
                      <ul style="display: flex; gap: 1.5rem; list-style: none; padding: 0; margin: 0;">
                        ${(links || ["Privacy", "Terms", "Contact"])
                          .map(
                            (link) => `<li><a href="#" style="text-decoration: none; color: inherit;">${link}</a></li>`,
                          )
                          .join("")}
                      </ul>
                    </nav>
                  </div>
                  <div style="margin-top: 1.5rem; font-size: 0.875rem; opacity: 0.8;">
                    ${copyright || `© ${new Date().getFullYear()} Company Name. All rights reserved.`}
                  </div>
                </footer>
              `
            } else {
              // Fallback for other footer templates
              htmlContent = `<footer><p>${copyright || `© ${new Date().getFullYear()} ${companyName || "Company Name"}. All rights reserved.`}</p></footer>`
            }
          } else {
            // Fallback for unknown component types
            htmlContent = `<div>Unknown component type: ${component.type}</div>`
          }

          return `<div${sectionId} style="${styleString}">${htmlContent}</div>`
        } catch (error) {
          console.error("Error rendering component:", error)
          return `<div${sectionId} style="${styleString}">Error rendering component</div>`
        }
      })
      .join("\n")
  }

  // Generate the complete HTML document
  const generateHTML = () => {
    // Create a more accurate representation of components for preview
    const componentsHTML = generateComponentsHTML()

    // Add interactive JavaScript for buttons, menus, etc.
    const interactiveJS = `
      <script>
        document.addEventListener('DOMContentLoaded', function() {
          // Mobile menu toggle
          const mobileMenuButtons = document.querySelectorAll('[data-mobile-menu-toggle]');
          mobileMenuButtons.forEach(button => {
            button.addEventListener('click', function() {
              const targetId = this.getAttribute('data-target');
              const targetMenu = document.getElementById(targetId);
              if (targetMenu) {
                targetMenu.classList.toggle('mobile-menu-open');
              }
            });
          });
          
          // Portfolio filter buttons
          const filterButtons = document.querySelectorAll('[data-filter]');
          filterButtons.forEach(button => {
            button.addEventListener('click', function() {
              const category = this.getAttribute('data-filter');
              const items = document.querySelectorAll('[data-category]');
              
              // Reset active state on all buttons
              filterButtons.forEach(btn => btn.classList.remove('filter-active'));
              this.classList.add('filter-active');
              
              items.forEach(item => {
                if (category === 'all' || item.getAttribute('data-category') === category) {
                  item.style.display = 'block';
                } else {
                  item.style.display = 'none';
                }
              });
            });
          });
          
          // Product quantity controls
          const quantityControls = document.querySelectorAll('.quantity-control');
          quantityControls.forEach(control => {
            const minusBtn = control.querySelector('.minus-btn');
            const plusBtn = control.querySelector('.plus-btn');
            const input = control.querySelector('input');
            
            if (minusBtn && plusBtn && input) {
              minusBtn.addEventListener('click', function() {
                const currentValue = parseInt(input.value) || 1;
                if (currentValue > 1) {
                  input.value = currentValue - 1;
                }
              });
              
              plusBtn.addEventListener('click', function() {
                const currentValue = parseInt(input.value) || 1;
                input.value = currentValue + 1;
              });
            }
          });
          
          // Product category filtering
          window.filterProducts = function(category) {
            const productItems = document.querySelectorAll('.product-item');
            const filterButtons = document.querySelectorAll('[data-filter]');
            
            // Update active button
            filterButtons.forEach(btn => {
              if (btn.getAttribute('data-filter') === category) {
                btn.style.backgroundColor = '#0070f3';
                btn.style.color = 'white';
                btn.style.border = 'none';
              } else {
                btn.style.backgroundColor = 'transparent';
                btn.style.color = 'inherit';
                btn.style.border = '1px solid #ccc';
              }
            });
            
            // Filter products
            productItems.forEach(item => {
              if (category === 'all' || item.getAttribute('data-category') === category) {
                item.style.display = 'flex';
              } else {
                item.style.display = 'none';
              }
            });
          };
        });

        // Cart functionality
        let cart = [];
        let selectedPaymentMethod = null;

        window.addToCart = function(id, title, price) {
          const existingItem = cart.find(item => item.id === id);
          
          if (existingItem) {
            existingItem.quantity += 1;
          } else {
            cart.push({
              id: id,
              title: title,
              price: price,
              quantity: 1
            });
          }
          
          updateCartDisplay();
        };

        window.updateCartDisplay = function() {
          const cartSummary = document.getElementById('cart-summary');
          const cartItems = document.getElementById('cart-items');
          const cartSubtotal = document.getElementById('cart-subtotal');
          const cartTax = document.getElementById('cart-tax');
          const cartTotal = document.getElementById('cart-total');
          const checkoutButton = document.getElementById('checkout-button');
          
          if (!cartSummary || !cartItems || !cartSubtotal || !cartTax || !cartTotal || !checkoutButton) return;
          
          if (cart.length === 0) {
            cartSummary.style.display = 'none';
            checkoutButton.style.display = 'none';
            return;
          }
          
          cartSummary.style.display = 'block';
          
          let html = '';
          let subtotal = 0;
          
          cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            subtotal += itemTotal;
            
            html += \`
              <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem; padding-bottom: 0.5rem; border-bottom: 1px solid #eee;">
                <div>
                  <div>\${item.title} x \${item.quantity}</div>
                  <div style="font-size: 0.875rem; color: #666;">$\${item.price.toFixed(2)} each</div>
                </div>
                <div style="font-weight: bold;">$\${itemTotal.toFixed(2)}</div>
              </div>
            \`;
          });
          
          cartItems.innerHTML = html;
          
          const tax = subtotal * 0.1;
          const total = subtotal + tax;
          
          cartSubtotal.textContent = '$' + subtotal.toFixed(2);
          cartTax.textContent = '$' + tax.toFixed(2);
          cartTotal.textContent = '$' + total.toFixed(2);
          
          if (selectedPaymentMethod) {
            checkoutButton.style.display = 'block';
          }
        };

        window.selectPaymentMethod = function(method) {
          selectedPaymentMethod = method;
          
          // Highlight the selected payment method
          const paymentMethods = document.querySelectorAll('#payment-methods > div > div');
          paymentMethods.forEach(el => {
            if (el.onclick.toString().includes(method)) {
              el.style.borderColor = '#0070f3';
              el.style.backgroundColor = '#f0f7ff';
            } else {
              el.style.borderColor = '#ddd';
              el.style.backgroundColor = '';
            }
          });
          
          // Show checkout button if cart has items
          if (cart.length > 0) {
            const checkoutButton = document.getElementById('checkout-button');
            if (checkoutButton) checkoutButton.style.display = 'block';
          }
        };

        window.processCheckout = function() {
          alert('Processing checkout with ' + selectedPaymentMethod + '.\\nIn a real implementation, this would redirect to a secure payment page.');
        };
      </script>
    `

    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>My Website</title>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            font-family: ${
              styles.fontFamily === "sans"
                ? "ui-sans-serif, system-ui, sans-serif"
                : styles.fontFamily === "serif"
                  ? "ui-serif, Georgia, serif"
                  : "ui-monospace, monospace"
            };
            font-size: ${styles.fontSize}px;
            color: ${styles.textColor};
            background-color: ${styles.backgroundColor};
            line-height: 1.5;
          }
          
          img {
            max-width: 100%;
            height: auto;
          }
          
          a {
            text-decoration: none;
            color: inherit;
          }
          
          /* Responsive styles */
          @media (max-width: 768px) {
            .mobile-menu-open {
              display: block !important;
            }
          }
          
          /* Component placeholder for preview */
          .component-placeholder {
            padding: 20px;
            background-color: #f0f0f0;
            border: 1px dashed #ccc;
            text-align: center;
            color: #666;
          }
        </style>
      </head>
      <body>
        ${componentsHTML}
        ${interactiveJS}
      </body>
      </html>
    `
  }

  const handleCopyHTML = () => {
    const html = generateHTML()
    navigator.clipboard.writeText(html)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownloadHTML = () => {
    const html = generateHTML()
    const blob = new Blob([html], { type: "text/html" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "my-website.html"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleDeploy = () => {
    setDeploying(true)
    // Simulate deployment process
    setTimeout(() => {
      setDeploying(false)
      setDeploySuccess(true)
      setTimeout(() => setDeploySuccess(false), 3000)
    }, 2000)
  }

  const handleExportToReact = () => {
    // This would generate React components from the website
    alert("Export to React functionality would be implemented here")
  }

  const handleExportToWordPress = () => {
    // This would generate WordPress compatible code
    alert("Export to WordPress functionality would be implemented here")
  }

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-background border rounded-lg shadow-lg w-full max-w-3xl max-h-[80vh] flex flex-col">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold">Export Website</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <Tabs defaultValue="html" value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
          <TabsList className="mx-4 mt-2">
            <TabsTrigger value="html">HTML</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="deploy">Deploy</TabsTrigger>
            <TabsTrigger value="export">Export Options</TabsTrigger>
          </TabsList>

          <TabsContent value="html" className="flex-1 overflow-hidden flex flex-col p-4">
            <div className="bg-muted rounded-md p-2 flex-1 overflow-hidden">
              <pre className="text-xs overflow-auto whitespace-pre-wrap h-full max-h-[calc(80vh-250px)] p-2">
                {generateHTML()}
              </pre>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={handleCopyHTML} disabled={copied}>
                <Copy className="h-4 w-4 mr-2" />
                {copied ? "Copied!" : "Copy HTML"}
              </Button>
              <Button onClick={handleDownloadHTML}>
                <Download className="h-4 w-4 mr-2" />
                Download HTML
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="preview" className="flex-1 overflow-hidden p-4">
            <div className="flex flex-col h-full gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <span className="i-lucide-smartphone h-4 w-4 mr-2" />
                    Mobile
                  </Button>
                  <Button variant="outline" size="sm">
                    <span className="i-lucide-tablet h-4 w-4 mr-2" />
                    Tablet
                  </Button>
                  <Button variant="outline" size="sm">
                    <span className="i-lucide-monitor h-4 w-4 mr-2" />
                    Desktop
                  </Button>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    window.open(URL.createObjectURL(new Blob([generateHTML()], { type: "text/html" })), "_blank")
                  }
                >
                  <span className="i-lucide-external-link h-4 w-4 mr-2" />
                  Open in Browser
                </Button>
              </div>
              <div className="border rounded-md flex-1 overflow-auto bg-white">
                <iframe
                  srcDoc={generateHTML()}
                  title="Website Preview"
                  className="w-full h-full"
                  sandbox="allow-same-origin allow-scripts"
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="deploy" className="flex-1 p-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="deploy-url">Deploy URL</Label>
                <div className="flex gap-2 mt-1">
                  <Input
                    id="deploy-url"
                    placeholder="https://your-domain.com"
                    value={deployUrl}
                    onChange={(e) => setDeployUrl(e.target.value)}
                  />
                  <Button onClick={handleDeploy} disabled={!deployUrl || deploying}>
                    {deploying ? "Deploying..." : deploySuccess ? "Deployed!" : "Deploy"}
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Deploy your website to a custom domain or hosting service
                </p>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-medium mb-2">Quick Deploy Options</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Button variant="outline" className="justify-start">
                    <Globe className="h-4 w-4 mr-2" />
                    Deploy to Vercel
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <Github className="h-4 w-4 mr-2" />
                    Deploy to GitHub Pages
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <Globe className="h-4 w-4 mr-2" />
                    Deploy to Netlify
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <Globe className="h-4 w-4 mr-2" />
                    Deploy to Firebase
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="export" className="flex-1 p-4">
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Export to Other Formats</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Button variant="outline" className="justify-start" onClick={handleExportToReact}>
                    <Code className="h-4 w-4 mr-2" />
                    Export as React Components
                  </Button>
                  <Button variant="outline" className="justify-start" onClick={handleExportToWordPress}>
                    <Globe className="h-4 w-4 mr-2" />
                    Export to WordPress
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <Code className="h-4 w-4 mr-2" />
                    Export as Vue Components
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <Code className="h-4 w-4 mr-2" />
                    Export as Angular Components
                  </Button>
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-medium mb-2">Advanced Options</h3>
                <div className="grid grid-cols-1 gap-3">
                  <Button variant="outline" className="justify-start">
                    <Download className="h-4 w-4 mr-2" />
                    Export as ZIP with Assets
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <Download className="h-4 w-4 mr-2" />
                    Export with Backend Boilerplate
                  </Button>
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-medium mb-2">Project Code</h3>
                <div className="grid grid-cols-1 gap-3">
                  <Button
                    variant="default"
                    className="justify-start"
                    onClick={() => {
                      // Create a zip file with all the project code
                      alert("This would download the entire website builder project code as a ZIP file")
                      // In a real implementation, this would package all the components, templates, and configuration
                    }}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download Complete Project Code
                  </Button>
                  <p className="text-sm text-muted-foreground">
                    Download the entire codebase of this website builder project, including all components, templates,
                    and configuration.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
