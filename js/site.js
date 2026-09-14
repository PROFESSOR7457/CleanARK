/* ======================================================================
   CLEANARK — SITE ENGINE
   ======================================================================
   This file reads everything from js/config.js (the SITE object) and:
     - fills in every element tagged with data-bind / data-src / data-href
     - builds the header nav, footer nav, footer contact block
     - renders repeating content (services, pricing, testimonials,
       features, steps, stats, service-area chips) from config arrays
     - handles the mobile menu toggle
     - wires up the WhatsApp floating button
     - validates & "submits" the booking/contact form (client-side only —
       see the comment near handleFormSubmit for how to connect a
       real backend later)

   You should NOT need to edit this file to update site content —
   edit js/config.js instead. Only touch this file if you want to
   change HOW things behave (e.g. add a new field to the form).
   ====================================================================== */

(function () {
  "use strict";

  /* ------------------------------------------------------------
     Small helper: read a dotted path like "contact.phoneDisplay"
     out of the SITE object.
  ------------------------------------------------------------ */
  function getValue(path) {
    return path.split(".").reduce((obj, key) => (obj == null ? undefined : obj[key]), SITE);
  }

  /* ------------------------------------------------------------
     1. Generic data-bind / data-src / data-href filler
  ------------------------------------------------------------ */
  function bindText() {
    document.querySelectorAll("[data-bind]").forEach((el) => {
      const val = getValue(el.getAttribute("data-bind"));
      if (val !== undefined) el.textContent = val;
    });
  }

  function bindSrc() {
    document.querySelectorAll("[data-src]").forEach((el) => {
      const val = getValue(el.getAttribute("data-src"));
      if (val !== undefined) el.setAttribute("src", val);
    });
  }

  function bindHref() {
    document.querySelectorAll("[data-href]").forEach((el) => {
      const val = getValue(el.getAttribute("data-href"));
      if (val === undefined) return;
      const prefix = el.getAttribute("data-href-prefix") || "";
      el.setAttribute("href", prefix + val);
    });
  }

  /* ------------------------------------------------------------
     2. Header / footer navigation (built from SITE.nav)
  ------------------------------------------------------------ */
  function renderNav() {
    const currentPage = (location.pathname.split("/").pop() || "index.html");

    document.querySelectorAll("[data-render='nav']").forEach((container) => {
      container.innerHTML = SITE.nav.map((item) => {
        const active = item.href === currentPage ? " active" : "";
        return `<li><a href="${item.href}" class="${active.trim()}">${item.label}</a></li>`;
      }).join("");
    });
  }

  /* ------------------------------------------------------------
     3. Repeating content blocks
  ------------------------------------------------------------ */
  function renderServices() {
    // Full list (services.html)
    document.querySelectorAll("[data-render='services-full']").forEach((container) => {
      container.innerHTML = SITE.services.map((s) => `
        <div class="service-card" id="${s.id}">
          <img src="${SITE.images[s.imageKey] || ""}" alt="${s.title}" loading="lazy">
          <div class="service-card-body">
            <div class="card-icon">${s.icon}</div>
            <h3>${s.title}</h3>
            <p>${s.description}</p>
            <div class="service-meta">
              <span>⏱ ${s.turnaround}</span>
              <span>From ${s.priceFrom}</span>
            </div>
          </div>
        </div>
      `).join("");
    });

    // Short preview (index.html) — first 4
    document.querySelectorAll("[data-render='services-preview']").forEach((container) => {
      container.innerHTML = SITE.services.map((s) => `
        <div class="card">
          <div class="card-icon">${s.icon}</div>
          <h3>${s.title}</h3>
          <p>${s.short}</p>
        </div>
      `).join("");
    });
  }

  function renderFeatures() {
    document.querySelectorAll("[data-render='features']").forEach((container) => {
      container.innerHTML = SITE.features.map((f) => `
        <div class="card">
          <div class="card-icon">${f.icon}</div>
          <h3>${f.title}</h3>
          <p>${f.text}</p>
        </div>
      `).join("");
    });
  }

  function renderSteps() {
    document.querySelectorAll("[data-render='steps']").forEach((container) => {
      container.innerHTML = SITE.steps.map((s) => `
        <div class="step">
          <div class="step-number">${s.number}</div>
          <h3>${s.title}</h3>
          <p>${s.text}</p>
        </div>
      `).join("");
    });
  }

  function renderTestimonials() {
    document.querySelectorAll("[data-render='testimonials']").forEach((container) => {
      container.innerHTML = SITE.testimonials.map((t) => `
        <div class="testimonial">
          <div class="stars">★★★★★</div>
          <p class="quote">"${t.quote}"</p>
          <div class="testimonial-name">${t.name}</div>
          <div class="testimonial-area">${t.area}</div>
        </div>
      `).join("");
    });
  }

  function renderStats() {
    document.querySelectorAll("[data-render='stats']").forEach((container) => {
      container.innerHTML = SITE.stats.map((s) => `
        <div class="stat">
          <strong>${s.number}</strong>
          <span>${s.label}</span>
        </div>
      `).join("");
    });
  }

  function renderServiceAreas() {
    document.querySelectorAll("[data-render='service-areas']").forEach((container) => {
      container.innerHTML = SITE.serviceAreas.map((a) => `<span class="chip">${a}</span>`).join("");
    });
  }

  function renderPricing() {
    document.querySelectorAll("[data-render='pricing']").forEach((container) => {
      container.innerHTML = SITE.pricing.categories.map((cat) => `
        <div class="price-category">
          <h3>${cat.name}</h3>
          <table class="price-table">
            ${cat.items.map((row) => `
              <tr><td>${row.item}</td><td>${row.price}</td></tr>
            `).join("")}
          </table>
        </div>
      `).join("");
    });
    document.querySelectorAll("[data-render='pricing-note']").forEach((el) => {
      el.textContent = SITE.pricing.note;
    });
  }

  function renderHours() {
    document.querySelectorAll("[data-render='hours']").forEach((container) => {
      container.innerHTML = SITE.contact.hours.map((h) => `
        <div style="display:flex;justify-content:space-between;gap:16px;">
          <span>${h.day}</span><strong>${h.time}</strong>
        </div>
      `).join("");
    });
  }

  /* ------------------------------------------------------------
     4. Footer year
  ------------------------------------------------------------ */
  function setYear() {
    document.querySelectorAll("[data-render='year']").forEach((el) => {
      el.textContent = new Date().getFullYear();
    });
  }

  /* ------------------------------------------------------------
     5. WhatsApp float button + any wa.me links
  ------------------------------------------------------------ */
  function wireWhatsApp() {
    const number = SITE.contact.whatsappNumber;
    const msg = encodeURIComponent(SITE.contact.whatsappDefaultMessage);
    const link = `https://wa.me/${number}?text=${msg}`;
    document.querySelectorAll("[data-whatsapp-link]").forEach((el) => {
      el.setAttribute("href", link);
    });
  }

  /* ------------------------------------------------------------
     6. Mobile nav toggle
  ------------------------------------------------------------ */
  function wireMobileNav() {
    const toggle = document.querySelector(".nav-toggle");
    const navWrap = document.querySelector(".nav-wrap");
    if (!toggle || !navWrap) return;
    toggle.addEventListener("click", () => {
      navWrap.classList.toggle("open");
    });
  }

  /* ------------------------------------------------------------
     7. Booking / contact form
     ------------------------------------------------------------
     IMPORTANT: This is a STATIC site with no server, so the form
     below only validates the fields in the browser and then shows
     a success message — it does NOT actually send the request
     anywhere yet.

     To make it really send bookings, pick ONE of these:
       a) Formspree / Getform / Basin — sign up free, they give you
          a form "action" URL. Change the <form> tag's action
          attribute in contact.html to that URL and remove
          preventDefault() below (or follow their JS snippet).
       b) Your own backend — add a fetch() call inside
          handleFormSubmit() that POSTs formData to your API.
       c) WhatsApp handoff (already included) — the "Send via
          WhatsApp" button builds a pre-filled WhatsApp message
          from the form fields, no backend needed at all.
  ------------------------------------------------------------ */
  function wireForm() {
    const form = document.getElementById("booking-form");
    if (!form) return;

    const successBox = document.getElementById("form-success");

    function showError(group, message) {
      group.classList.add("has-error");
      const errEl = group.querySelector(".error-text");
      if (errEl) errEl.textContent = message;
    }

    function clearError(group) {
      group.classList.remove("has-error");
    }

    function validate() {
      let valid = true;
      form.querySelectorAll(".form-group[data-required='true']").forEach((group) => {
        const field = group.querySelector("input, select, textarea");
        clearError(group);
        if (!field.value || !field.value.trim()) {
          showError(group, "This field is required.");
          valid = false;
        } else if (field.type === "tel" && field.value.replace(/\D/g, "").length < 10) {
          showError(group, "Enter a valid phone number.");
          valid = false;
        } else if (field.type === "email" && field.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) {
          showError(group, "Enter a valid email address.");
          valid = false;
        }
      });
      return valid;
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault(); // remove this line once you connect a real form backend (see comment above)

      if (!validate()) return;

      // Build a friendly summary — useful if you wire this to a
      // backend later, or just for the WhatsApp handoff button.
      const data = Object.fromEntries(new FormData(form).entries());
      console.log("Booking request (not yet sent anywhere — connect a backend):", data);

      if (successBox) {
        successBox.classList.add("show");
        successBox.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      form.reset();
    });

    // "Send via WhatsApp" alternative — works with zero backend.
    const waBtn = document.getElementById("send-whatsapp-btn");
    if (waBtn) {
      waBtn.addEventListener("click", function () {
        if (!validate()) return;
        const data = Object.fromEntries(new FormData(form).entries());
        const lines = [
          `Hi CleanArk, I'd like to book a pickup:`,
          `Name: ${data.name || "-"}`,
          `Phone: ${data.phone || "-"}`,
          `Service: ${data.service || "-"}`,
          `Address: ${data.address || "-"}`,
          `Preferred date/time: ${data.pickupDate || "-"}`,
          data.notes ? `Notes: ${data.notes}` : ""
        ].filter(Boolean);
        const url = `https://wa.me/${SITE.contact.whatsappNumber}?text=${encodeURIComponent(lines.join("\n"))}`;
        window.open(url, "_blank");
      });
    }
  }

  /* ------------------------------------------------------------
     8. Populate the service <select> in the booking form from
        SITE.services, so adding a service in config.js also adds
        it as a form option automatically.
  ------------------------------------------------------------ */
  function renderServiceOptions() {
    document.querySelectorAll("[data-render='service-options']").forEach((select) => {
      const options = SITE.services.map((s) => `<option value="${s.title}">${s.title}</option>`).join("");
      select.innerHTML = `<option value="">Select a service</option>${options}` + `<option value="Not sure / Multiple">Not sure / Multiple services</option>`;
    });
  }

  /* ------------------------------------------------------------
     Init
  ------------------------------------------------------------ */
  document.addEventListener("DOMContentLoaded", function () {
    // basic meta
    document.title = document.title || SITE.business.name;

    renderNav();
    bindText();
    bindSrc();
    bindHref();
    renderServices();
    renderFeatures();
    renderSteps();
    renderTestimonials();
    renderStats();
    renderServiceAreas();
    renderPricing();
    renderHours();
    renderServiceOptions();
    setYear();
    wireWhatsApp();
    wireMobileNav();
    wireForm();
  });
})();
