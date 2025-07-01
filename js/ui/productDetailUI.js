import { products } from "../data/products.js";
import { cartService } from "../services/cart.js";

export class ProductDetailUI {
  constructor() {
    this.productId = new URLSearchParams(window.location.search).get("id");
    this.product = products.find((p) => p.id === parseInt(this.productId));

    if (!this.product) {
      window.location.href = "/";
      return;
    }

    this.quantity = 1;
    this.initElements();
    this.renderProduct();
    this.pushViewItemEvent();
    this.setupEventListeners();
  }

  initElements() {
    this.mainImage = document.getElementById("main-product-image");
    this.title = document.querySelector(".product-title");
    this.price = document.querySelector(".product-price");
    this.description = document.querySelector(".product-description");
    this.stockStatus = document.querySelector(".stock-status");
    this.category = document.querySelector(".category");
    this.sku = document.querySelector(".sku");
    this.quantityInput = document.getElementById("quantity");
    this.addToCartBtn = document.querySelector(".add-to-cart");
  }

  renderProduct() {
    document.title = `${this.product.name} - The Cocktail Store`;

    this.mainImage.src = this.product.image;
    this.mainImage.alt = this.product.name;
    this.title.textContent = this.product.name;
    this.price.textContent = `$${this.product.price.toFixed(2)}`;
    this.description.textContent = this.product.description;
    this.stockStatus.textContent =
      this.product.stock > 0 ? "En stock" : "Agotado";
    this.stockStatus.className = `stock-status ${
      this.product.stock > 0 ? "in-stock" : "out-of-stock"
    }`;
    this.category.textContent = this.product.category;
    this.sku.textContent = `PROD-${this.product.id}`;

    document.querySelector(".category-link").textContent =
      this.product.category.charAt(0).toUpperCase() +
      this.product.category.slice(1);
    document.querySelector(
      ".category-link"
    ).href = `/?category=${this.product.category}`;
    document.querySelector(".product-name").textContent = this.product.name;
  }

  pushViewItemEvent() {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "view_item",
      ecommerce: {
        items: [
          {
            item_id: this.product.id.toString(),
            item_brand: "The Cocktail Store",
            item_name: this.product.name,
            item_category: this.product.category,
            price: this.product.price,
            quantity: 1,
          },
        ],
      },
    });
    console.log("Evento view_item enviado para:", this.product.name);
  }

  setupEventListeners() {
    document
      .querySelector(".quantity-btn.minus")
      .addEventListener("click", () => {
        if (this.quantity > 1) {
          this.quantity--;
          this.quantityInput.value = this.quantity;
        }
      });

    document
      .querySelector(".quantity-btn.plus")
      .addEventListener("click", () => {
        if (this.quantity < this.product.stock) {
          this.quantity++;
          this.quantityInput.value = this.quantity;
        }
      });

    this.quantityInput.addEventListener("change", () => {
      let value = parseInt(this.quantityInput.value);
      if (isNaN(value) || value < 1) value = 1;
      if (value > this.product.stock) value = this.product.stock;
      this.quantity = value;
      this.quantityInput.value = value;
    });

    this.addToCartBtn.addEventListener("click", () => {
      console.log(
        "Añadiendo al carrito:",
        this.product,
        "Cantidad:",
        this.quantity
      );
      cartService.addItem(this.product, this.quantity);

      const originalText = this.addToCartBtn.textContent;
      this.addToCartBtn.textContent = "¡Añadido!";
      this.addToCartBtn.disabled = true;

      setTimeout(() => {
        this.addToCartBtn.textContent = originalText;
        this.addToCartBtn.disabled = false;
      }, 2000);
    });
  }
}
