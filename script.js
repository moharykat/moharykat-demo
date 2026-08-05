/**
 * Moharykat Landing Page — Vanilla JS
 * Sticky nav, mobile CTA, FAQ accordion, smooth scroll
 */

(function () {
  "use strict";

  const nav = document.getElementById("main-nav");
  const mobileCta = document.getElementById("mobile-cta");
  const hero = document.getElementById("hero");



  /* Sticky nav background on scroll */
  function handleScroll() {
    const scrollY = window.scrollY;

    if (nav) {
      nav.classList.toggle("nav-scrolled", scrollY > 40);
    }

    if (mobileCta && hero) {
      const heroBottom = hero.offsetTop + hero.offsetHeight;
      mobileCta.classList.toggle("visible", scrollY > heroBottom - 80);
    }
  }

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();

  /* FAQ accordion */
  document.querySelectorAll(".faq-item").forEach(function (item) {
    const trigger = item.querySelector(".faq-trigger");
    if (!trigger) return;

    trigger.addEventListener("click", function () {
      const isActive = item.classList.contains("active");

      document.querySelectorAll(".faq-item.active").forEach(function (open) {
        open.classList.remove("active");
        open.querySelector(".faq-trigger")?.setAttribute("aria-expanded", "false");
      });

      if (!isActive) {
        item.classList.add("active");
        trigger.setAttribute("aria-expanded", "true");
      }
    });
  });

  /* Smooth scroll for anchor links */
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const navHeight = nav ? nav.offsetHeight : 0;
        const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 8;
        window.scrollTo({ top, behavior: "smooth" });
      }
    });
  });

  /* Lazy load images with native loading=lazy fallback observer */
  if ("IntersectionObserver" in window) {
    const lazyImages = document.querySelectorAll("img[data-src]");
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute("data-src");
            observer.unobserve(img);
          }
        });
      },
      { rootMargin: "200px" }
    );
    lazyImages.forEach(function (img) {
      observer.observe(img);
    });
  }

  /* Fade-in on scroll */
  if ("IntersectionObserver" in window) {
    const fadeEls = document.querySelectorAll(".fade-in");
    const fadeObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
            entry.target.classList.remove("opacity-0", "translate-y-6");
            fadeObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    fadeEls.forEach(function (el) {
      fadeObserver.observe(el);
    });
  }
})();
