"use client"

// lib/ecommerce-templates.ts

export const ecommerceTemplates = [
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
          addToCartText: "Add to Cart",
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
          addToCartText: "Add to Cart",
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
          addToCartText: "Add to Cart",
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
          addToCartText: "Add to Cart",
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
          addToCartText: "Add to Cart",
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
          addToCartText: "Add to Cart",
        },
      ],
      showFilters: true,
      columns: 3,
      showAddToCart: true,
      showWhatsAppButton: true,
      whatsAppNumber: "+1234567890",
      whatsAppMessage: "Hi, I'm interested in purchasing: ",
      sectionId: "products",
      showPaymentMethods: false,
      paymentCreditCard: true,
      paymentPayPal: true,
      paymentApplePay: true,
      paymentGooglePay: true,
      checkoutButtonText: "Proceed to Checkout",
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
                data-filter="all"
                style={{
                  padding: "0.5rem 1rem",
                  backgroundColor: "#0070f3",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  margin: "0 0.25rem 0.5rem",
                }}
              >
                All
              </button>
              {Array.from(new Set((content.products || []).map((product: any) => product.category))).map(
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
                      margin: "0 0.25rem 0.5rem",
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
            gridTemplateColumns: `repeat(${content.columns || 3}, 1fr)`,
            gap: "2rem",
          }}
        >
          {(content.products || []).map((product: any, index: number) => (
            <div
              key={index}
              data-category={product.category}
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "0.75rem",
                overflow: "hidden",
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                display: "flex",
                flexDirection: "column",
                height: "100%",
                border: "1px solid #eee",
              }}
              onMouseEnter={(e) => {
                const target = e.currentTarget as HTMLElement
                target.style.transform = "translateY(-5px)"
                target.style.boxShadow = "0 10px 20px rgba(0,0,0,0.15)"
              }}
              onMouseLeave={(e) => {
                const target = e.currentTarget as HTMLElement
                target.style.transform = "translateY(0)"
                target.style.boxShadow = "0 4px 10px rgba(0,0,0,0.1)"
              }}
            >
              <div
                style={{
                  backgroundColor: "#f5f5f7",
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
                      transition: "transform 0.5s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "scale(1.05)"
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "scale(1)"
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
                {product.salePrice !== null && (
                  <div
                    style={{
                      position: "absolute",
                      top: "10px",
                      right: "10px",
                      backgroundColor: "#ef4444",
                      color: "white",
                      padding: "0.25rem 0.75rem",
                      borderRadius: "4px",
                      fontSize: "0.75rem",
                      fontWeight: "bold",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
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
                <h3 style={{ marginBottom: "0.5rem", fontSize: "1.25rem" }}>{product.title}</h3>
                <p style={{ fontSize: "0.875rem", marginBottom: "1.5rem", flexGrow: 1, color: "#666" }}>
                  {product.description}
                </p>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "1.25rem",
                  }}
                >
                  <div>
                    {product.salePrice !== null ? (
                      <div>
                        <span
                          style={{
                            textDecoration: "line-through",
                            color: "#6c757d",
                            marginRight: "0.5rem",
                            fontSize: "0.875rem",
                          }}
                        >
                          ${product.price?.toFixed(2)}
                        </span>
                        <span style={{ fontWeight: "bold", color: "#ef4444", fontSize: "1.25rem" }}>
                          ${product.salePrice?.toFixed(2)}
                        </span>
                      </div>
                    ) : (
                      <span style={{ fontWeight: "bold", fontSize: "1.25rem" }}>${product.price?.toFixed(2)}</span>
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
                        padding: "0.75rem 1rem",
                        backgroundColor: product.inStock ? "#0070f3" : "#9ca3af",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: product.inStock ? "pointer" : "not-allowed",
                        fontWeight: "bold",
                        transition: "background-color 0.2s ease",
                      }}
                      disabled={!product.inStock}
                      onMouseEnter={(e) => {
                        if (product.inStock) {
                          e.currentTarget.style.backgroundColor = "#0051b3"
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (product.inStock) {
                          e.currentTarget.style.backgroundColor = "#0070f3"
                        }
                      }}
                      onclick={`addToCart('${product.id}', '${product.title}', ${product.salePrice !== null ? product.salePrice : product.price})`}
                    >
                      {product.addToCartText || "Add to Cart"}
                    </button>
                  )}
                  {content.showWhatsAppButton && (
                    <a
                      href={`https://wa.me/${content.whatsAppNumber?.replace(/\D/g, "") || ""}?text=${encodeURIComponent(
                        `${content.whatsAppMessage || ""}${product.title} (${product.sku}) - $${
                          product.salePrice !== null ? product.salePrice.toFixed(2) : product.price.toFixed(2)
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
                        transition: "background-color 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "#1da851"
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "#25D366"
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
        {content.showPaymentMethods
          ? `
  <div style="margin-top: 3rem; border-top: 1px solid #eee; padding-top: 2rem;">
    <div id="cart-summary" style="display: none; margin-bottom: 2rem;">
      <h3 style="font-size: 1.5rem; margin-bottom: 1rem;">Your Cart</h3>
      <div id="cart-items" style="margin-bottom: 1rem;"></div>
      <div style="display: flex; justify-content: space-between; font-weight: bold; margin-bottom: 0.5rem;">
        <span>Subtotal:</span>
        <span id="cart-subtotal">$0.00</span>
      </div>
      <div style="display: flex; justify-content: space-between; font-size: 0.875rem; margin-bottom: 1.5rem;">
        <span>Tax (10%):</span>
        <span id="cart-tax">$0.00</span>
      </div>
      <div style="display: flex; justify-content: space-between; font-weight: bold; font-size: 1.25rem; margin-bottom: 1.5rem;">
        <span>Total:</span>
        <span id="cart-total">$0.00</span>
      </div>
    </div>
    
    <div id="payment-methods" style="margin-bottom: 2rem;">
      <h3 style="font-size: 1.25rem; margin-bottom: 1rem;">Payment Methods</h3>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 1rem; margin-bottom: 1.5rem;">
        ${
          content.paymentCreditCard !== false
            ? `
          <div style="border: 1px solid #ddd; border-radius: 8px; padding: 1rem; text-align: center; cursor: pointer;" onclick="selectPaymentMethod('credit-card')">
            <div style="font-size: 1.5rem; margin-bottom: 0.5rem;">💳</div>
            <div>Credit Card</div>
          </div>
        `
            : ""
        }
        ${
          content.paymentPayPal !== false
            ? `
          <div style="border: 1px solid #ddd; border-radius: 8px; padding: 1rem; text-align: center; cursor: pointer;" onclick="selectPaymentMethod('paypal')">
            <div style="font-size: 1.5rem; margin-bottom: 0.5rem;">🅿️</div>
            <div>PayPal</div>
          </div>
        `
            : ""
        }
        ${
          content.paymentApplePay !== false
            ? `
          <div style="border: 1px solid #ddd; border-radius: 8px; padding: 1rem; text-align: center; cursor: pointer;" onclick="selectPaymentMethod('apple-pay')">
            <div style="font-size: 1.5rem; margin-bottom: 0.5rem;">🍎</div>
            <div>Apple Pay</div>
          </div>
        `
            : ""
        }
        ${
          content.paymentGooglePay !== false
            ? `
          <div style="border: 1px solid #ddd; border-radius: 8px; padding: 1rem; text-align: center; cursor: pointer;" onclick="selectPaymentMethod('google-pay')">
            <div style="font-size: 1.5rem; margin-bottom: 0.5rem;">🔍</div>
            <div>Google Pay</div>
          </div>
        `
            : ""
        }
      </div>
    </div>
    
    <button 
      id="checkout-button" 
      style="
        width: 100%;
        padding: 1rem;
        background-color: #10b981;
        color: white;
        border: none;
        border-radius: 4px;
        font-weight: bold;
        font-size: 1rem;
        cursor: pointer;
        transition: background-color 0.2s ease;
        display: none;
      "
      onMouseEnter="this.style.backgroundColor='#059669';"
      onMouseLeave="this.style.backgroundColor='#10b981';"
      onclick="processCheckout()"
    >
      ${content.checkoutButtonText || "Proceed to Checkout"}
    </button>
  </div>
`
          : ""}
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
                className="quantity-control"
                style={{
                  display: "flex",
                  alignItems: "center",
                  border: "1px solid #e5e7eb",
                  borderRadius: "4px",
                  overflow: "hidden",
                }}
              >
                <button
                  className="minus-btn"
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
                  className="plus-btn"
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
                  {content.addToCartText || "Add to Cart"}
                </button>
              )}
            </div>

            {content.showWhatsAppButton && (
              <a
                href={`https://wa.me/${content.whatsAppNumber?.replace(/\D/g, "") || ""}?text=${encodeURIComponent(
                  `${content.whatsAppMessage || ""}${content.productTitle} (${content.productSKU}) - $${
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
                Contact via WhatsApp
              </a>
            )}
          </div>
        </div>
      </section>
    ),
  },
]
