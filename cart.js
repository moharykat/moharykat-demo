/**
 * Moharykat — cart state via localStorage
 * Cart item shape: { productId, quantity }
 */
(function () {
  "use strict";

  var STORAGE_KEY = "moharykat_cart";
  var SHIPPING_FEE = 0; // Free shipping

  function getCart() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      var cart = raw ? JSON.parse(raw) : [];
      return Array.isArray(cart) ? cart : [];
    } catch (e) {
      return [];
    }
  }

  function saveCart(cart) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    updateCartBadge();
    document.dispatchEvent(new CustomEvent("cart:updated", { detail: { cart: cart } }));
  }

  function getItemCount() {
    return getCart().reduce(function (sum, item) {
      return sum + (item.quantity || 0);
    }, 0);
  }

  function addToCart(productId, quantity) {
    quantity = Math.max(1, parseInt(quantity, 10) || 1);
    var cart = getCart();
    var existing = cart.find(function (item) {
      return item.productId === productId;
    });

    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.push({ productId: productId, quantity: quantity });
    }

    saveCart(cart);
    return cart;
  }

  function removeFromCart(productId) {
    var cart = getCart().filter(function (item) {
      return item.productId !== productId;
    });
    saveCart(cart);
    return cart;
  }

  function setQuantity(productId, quantity) {
    quantity = parseInt(quantity, 10);
    var cart = getCart();

    if (quantity <= 0) {
      return removeFromCart(productId);
    }

    cart = cart.map(function (item) {
      if (item.productId === productId) {
        return { productId: productId, quantity: quantity };
      }
      return item;
    });

    saveCart(cart);
    return cart;
  }

  function clearCart() {
    saveCart([]);
  }

  function getCartLines() {
    var map = typeof getProductsMap === "function" ? getProductsMap() : {};
    return getCart()
      .map(function (item) {
        var product = map[item.productId];
        if (!product) return null;
        return {
          productId: item.productId,
          quantity: item.quantity,
          product: product,
          lineTotal: product.price * item.quantity,
        };
      })
      .filter(Boolean);
  }

  function getSubtotal() {
    return getCartLines().reduce(function (sum, line) {
      return sum + line.lineTotal;
    }, 0);
  }

  // Free shipping for all orders
  function getShippingFee() {
    return 0;
  }

  function getTotal() {
    return getSubtotal() + getShippingFee();
  }

  function formatPrice(amount) {
    return Number(amount).toFixed(2);
  }

  function formatPriceLabel(amount) {
    var lang = document.documentElement.getAttribute("lang") || "ar";
    return formatPrice(amount) + (lang === "ar" ? " ر.س" : " SAR");
  }

  function updateCartBadge() {
    var count = getItemCount();
    document.querySelectorAll("[data-cart-badge]").forEach(function (el) {
      el.textContent = count > 99 ? "99+" : String(count);
      if (count > 0) {
        el.classList.remove("hidden");
      } else {
        el.classList.add("hidden");
      }
    });
  }

  function initCartBadge() {
    updateCartBadge();
  }

  window.MoharykatCart = {
    STORAGE_KEY: STORAGE_KEY,
    SHIPPING_FEE: SHIPPING_FEE,
    getCart: getCart,
    saveCart: saveCart,
    getItemCount: getItemCount,
    addToCart: addToCart,
    removeFromCart: removeFromCart,
    setQuantity: setQuantity,
    clearCart: clearCart,
    getCartLines: getCartLines,
    getSubtotal: getSubtotal,
    getShippingFee: getShippingFee,
    getTotal: getTotal,
    formatPrice: formatPrice,
    formatPriceLabel: formatPriceLabel,
    updateCartBadge: updateCartBadge,
    initCartBadge: initCartBadge,
  };

  document.addEventListener("DOMContentLoaded", initCartBadge);
})();