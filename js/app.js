import { cartUI } from "./ui/cartUI.js";
import { productsUI } from "./ui/productsUI.js";
import { cartService } from "./services/cart.js"; // ✅ Importamos cartService

class App {
  constructor() {
    this.initializeApp();
  }

  initializeApp() {
    this.cartUI = cartUI;
    this.productsUI = productsUI;

    // ✅ Hacemos cartService accesible globalmente
    window.cartService = cartService;

    this.setupMobileMenu();

    // Delegación para clicks
    document.addEventListener("click", (e) => {
      // ✅ Evento: View Cart
      if (e.target.closest(".nav__cart")) {
        console.log("Click detectado en .nav__cart o hijo:", e.target);

        const value = cartService.getTotal();
        const currency = "EUR";
        const items = cartService.getItems().map((item) => ({
          item_id: item.id,
          item_name: item.name,
          item_brand: item.brand || "Desconocido",
          item_category: item.category || "Sin categoría",
          price: item.price,
          quantity: item.quantity,
        }));

        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: "view_cart",
          ecommerce: {
            value,
            currency,
            items,
          },
        });

        console.log("Evento 'view_cart' enviado:", { value, currency, items });
      }

      // ✅ Evento: Remove from cart (solo primer ítem)
      if (e.target.closest(".remove-btn")) {
        console.log(
          "Click detectado en botón eliminar (.remove-btn):",
          e.target
        );

        const cartItems = cartService.getItems();

        if (cartItems.length === 0) return;

        const item = cartItems[0]; // ← Cogemos el primer ítem

        const removedItem = {
          item_id: item.id,
          item_name: item.name,
          item_brand: item.brand || "Desconocido",
          item_category: item.category || "Sin categoría",
          price: item.price,
          quantity: item.quantity,
        };

        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: "remove_from_cart",
          ecommerce: {
            currency: "EUR",
            value: item.price * item.quantity,
            items: [removedItem],
          },
        });

        console.log("Evento 'remove_from_cart' enviado:", removedItem);
      }
    });
  }

  setupMobileMenu() {
    const menuButton = document.createElement("button");
    menuButton.className = "nav__toggle";
    menuButton.innerHTML = '<i class="fas fa-bars"></i>';

    const nav = document.querySelector(".nav");
    const menu = document.querySelector(".nav__menu");

    nav.insertBefore(menuButton, menu);

    menuButton.addEventListener("click", () => {
      menu.classList.toggle("show");
    });

    const navLinks = document.querySelectorAll(".nav__link");
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        menu.classList.remove("show");
      });
    });

    if (!document.getElementById("mobileStyles")) {
      const styles = document.createElement("style");
      styles.id = "mobileStyles";
      styles.textContent = `
        .nav__toggle {
          display: none;
          font-size: 1.25rem;
          cursor: pointer;
          color: var(--text-color);
          transition: .3s;
        }

        @media screen and (max-width: 768px) {
          .nav__toggle {
            display: block;
          }

          .nav__menu {
            position: fixed;
            top: 4rem;
            left: -100%;
            width: 80%;
            height: 100vh;
            padding: 2rem;
            background-color: var(--bg-color);
            box-shadow: 2px 0 4px rgba(0,0,0,.1);
            transition: .4s;
          }

          .nav__menu.show {
            left: 0;
          }

          .nav__list {
            flex-direction: column;
          }

          .nav__item {
            margin: 1.5rem 0;
          }
        }
      `;
      document.head.appendChild(styles);
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  window.app = new App();
  window.productsUI = window.app.productsUI;
});
