import { cartUI } from "./ui/cartUI.js";
import { productsUI } from "./ui/productsUI.js";
import { cartService } from "./services/cart.js"; // ✅ importamos cartService

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
      // Evento: View Cart
      if (e.target.closest(".nav__cart")) {
        console.log("Click detectado en .nav__cart o hijo:", e.target);

        // ✅ Obtenemos valor total y moneda
        const value = cartService.getTotal();
        const currency = "EUR"; // O usa cartService.getCurrency() si lo tienes definido

        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: "view_cart",
          ecommerce: {
            value: value,
            currency: currency,
            items: cartService.getItems()
          }
        });

        console.log("Evento 'view_cart' enviado con valor y moneda:", value, currency);
      }

      // Evento: Remove from cart
      if (e.target.closest(".remove-btn")) {
        console.log("Click detectado en botón eliminar (.remove-btn):", e.target);

        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: "remove_from_cart"
          // Podrías añadir item info si lo necesitas
        });

        console.log("Evento 'remove_from_cart' enviado");
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
