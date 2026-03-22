(function () {
  "use strict";

  var prefersReducedMotion =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function normalizePath(path) {
    var normalized = path || "/";

    if (normalized.length > 1) {
      normalized = normalized.replace(/\/+$/, "");
    }

    return normalized || "/";
  }

  function initCurrentLinks() {
    var currentPath = normalizePath(window.location.pathname);
    var links = document.querySelectorAll(
      ".site-nav a[href], .site-footer a[href]"
    );

    links.forEach(function (link) {
      var href = link.getAttribute("href");
      var pathname;

      if (!href || href.indexOf("mailto:") === 0 || href.indexOf("http") === 0) {
        return;
      }

      pathname = normalizePath(href.split("#")[0] || "/");

      if (pathname !== currentPath) {
        return;
      }

      link.classList.add("is-current");
      link.setAttribute("aria-current", "page");
    });
  }

  function initRevealAnimations() {
    var groups = [
      { selector: ".hero-section__copy > *", step: 90 },
      { selector: ".hero-board", step: 0 },
      { selector: ".bio-section__intro > *", step: 45 },
      { selector: ".bio-section__body > *", step: 50 },
      { selector: ".bio-section__media", step: 0 },
      { selector: ".about-page__why .section-heading > *", step: 45 },
      { selector: ".about-page__why-card", step: 70 },
      { selector: ".placeholder-page__inner > *", step: 60 },
      { selector: ".services-page__problem .section-heading > *", step: 50 },
      { selector: ".services-page__problem-card", step: 65 },
      { selector: ".services-page__system .section-heading > *", step: 50 },
      { selector: ".services-page__system-layout > *", step: 70 },
      { selector: ".services-page__system-panel > *", step: 50 },
      { selector: ".services-page__system-pillars > *", step: 55 },
      { selector: ".services-page__process .section-heading > *", step: 55 },
      { selector: ".services-page__process .process-card", step: 65 },
      { selector: ".services-page__outcomes .section-heading > *", step: 55 },
      { selector: ".services-page__outcomes-card", step: 0 },
      { selector: ".services-page__difference .section-heading > *", step: 45 },
      { selector: ".services-page__difference-copy > *", step: 55 },
      { selector: "#website-check .section-copy > *", step: 70 },
      { selector: "#website-check .audit-card > *", step: 65 },
      { selector: "#proof .section-heading > *", step: 40 },
      { selector: "#proof .logo-marquee", step: 0 },
      { selector: "#proof .stat-card", step: 80 },
      { selector: "#leistungen .section-heading > *", step: 55 },
      { selector: "#leistungen .process-card", step: 65 },
      { selector: "#arbeiten .section-heading > *", step: 55 },
      { selector: "#arbeiten .project-card", step: 70 },
      { selector: "#stimmen .section-heading > *", step: 55 },
      { selector: "#stimmen .testimonial-carousel", step: 0 },
      { selector: "#framework .framework-card > *", step: 70 },
      { selector: "#ueber-uns .section-copy > *", step: 55 },
      { selector: "#ueber-uns .person-card", step: 75 },
      { selector: "#cta .section-copy > *", step: 55 },
      { selector: "#cta .audit-card > *", step: 55 },
      { selector: ".site-footer__topbar > *", step: 40 },
      { selector: ".site-footer__column", step: 65 }
    ];
    var targets = [];

    groups.forEach(function (group) {
      var nodes = document.querySelectorAll(group.selector);

      nodes.forEach(function (node, index) {
        node.classList.add("reveal");
        node.style.setProperty(
          "--reveal-delay",
          String(index * (group.step || 0)) + "ms"
        );
        targets.push(node);
      });
    });

    if (!targets.length) {
      return;
    }

    if (!("IntersectionObserver" in window) || prefersReducedMotion) {
      targets.forEach(function (target) {
        target.classList.add("is-visible");
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        });
      },
      {
        threshold: 0.16,
        rootMargin: "0px 0px -8% 0px"
      }
    );

    targets.forEach(function (target) {
      if (target.getBoundingClientRect().top <= window.innerHeight * 0.94) {
        target.classList.add("is-visible");
        return;
      }

      observer.observe(target);
    });
  }

  function initNav() {
    var toggle = document.querySelector("[data-nav-toggle]");
    var nav = document.querySelector("[data-nav]");

    if (!toggle || !nav) {
      return;
    }

    function closeNav() {
      document.body.removeAttribute("data-nav-open");
      toggle.setAttribute("aria-expanded", "false");
    }

    toggle.addEventListener("click", function () {
      var isOpen = document.body.getAttribute("data-nav-open") === "true";

      if (isOpen) {
        closeNav();
        return;
      }

      document.body.setAttribute("data-nav-open", "true");
      toggle.setAttribute("aria-expanded", "true");
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeNav);
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 860) {
        closeNav();
      }
    });
  }

  function initHeaderScroll() {
    var header = document.querySelector("[data-site-header]");
    var lastScroll = window.scrollY;
    var ticking = false;

    if (!header) {
      return;
    }

    function updateHeader() {
      var currentScroll = window.scrollY;
      var navOpen = document.body.getAttribute("data-nav-open") === "true";

      if (navOpen || currentScroll < 24) {
        header.classList.remove("site-header--hidden");
        lastScroll = currentScroll;
        ticking = false;
        return;
      }

      if (currentScroll > lastScroll && currentScroll > 96) {
        header.classList.add("site-header--hidden");
      } else if (currentScroll < lastScroll - 6) {
        header.classList.remove("site-header--hidden");
      }

      lastScroll = currentScroll;
      ticking = false;
    }

    window.addEventListener(
      "scroll",
      function () {
        if (ticking) {
          return;
        }

        ticking = true;
        window.requestAnimationFrame(updateHeader);
      },
      { passive: true }
    );
  }

  function formatCount(value, prefix, suffix) {
    return String(prefix || "") + String(value) + String(suffix || "");
  }

  function initCountUp() {
    var items = document.querySelectorAll("[data-count-up]");

    if (!items.length) {
      return;
    }

    function animateItem(node) {
      var target = parseInt(node.getAttribute("data-target"), 10);
      var prefix = node.getAttribute("data-prefix") || "";
      var suffix = node.getAttribute("data-suffix") || "";
      var startTime;
      var duration = 1100;

      if (Number.isNaN(target)) {
        return;
      }

      function tick(timestamp) {
        if (!startTime) {
          startTime = timestamp;
        }

        var progress = Math.min((timestamp - startTime) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3);
        var current = Math.round(target * eased);
        node.textContent = formatCount(current, prefix, suffix);

        if (progress < 1) {
          window.requestAnimationFrame(tick);
        }
      }

      window.requestAnimationFrame(tick);
    }

    if (!("IntersectionObserver" in window) || prefersReducedMotion) {
      items.forEach(function (item) {
        var target = item.getAttribute("data-target");
        item.textContent = formatCount(
          target,
          item.getAttribute("data-prefix"),
          item.getAttribute("data-suffix")
        );
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) {
            return;
          }

          animateItem(entry.target);
          obs.unobserve(entry.target);
        });
      },
      {
        threshold: 0.45
      }
    );

    items.forEach(function (item) {
      observer.observe(item);
    });
  }

  function parseDomain(value) {
    var input = (value || "").trim();
    var normalized = input;

    if (!normalized) {
      return null;
    }

    if (!/^https?:\/\//i.test(normalized)) {
      normalized = "https://" + normalized;
    }

    try {
      var parsed = new URL(normalized);
      var host = parsed.hostname.replace(/^www\./, "");
      if (!host || host.indexOf(".") === -1 || /\s/.test(host)) {
        return null;
      }
      return host;
    } catch (error) {
      return null;
    }
  }

  function parsePhone(value) {
    var input = (value || "").trim();
    var digits = input.replace(/[^\d+]/g, "");

    if (!digits || digits.replace(/\D/g, "").length < 6) {
      return null;
    }

    return input;
  }

  function submitDemoLead(payload) {
    return new Promise(function (resolve) {
      var storageKey = "ks-site-check-submissions";
      var entries = [];

      try {
        entries = JSON.parse(window.localStorage.getItem(storageKey) || "[]");
      } catch (error) {
        entries = [];
      }

      entries.push(payload);

      try {
        window.localStorage.setItem(storageKey, JSON.stringify(entries));
      } catch (error) {
        // Ignore storage errors in preview mode.
      }

      window.setTimeout(function () {
        resolve();
      }, 280);
    });
  }

  function submitFormsparkLead(endpoint, payload) {
    var formData = new window.URLSearchParams();

    Object.keys(payload).forEach(function (key) {
      formData.append(key, payload[key]);
    });

    return window
      .fetch(endpoint, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: formData.toString()
      })
      .then(function (response) {
        if (!response.ok) {
          throw new Error("Formspark request failed");
        }

        return response.json().then(function (data) {
          if (!data || !data.domain || !data.phone) {
            throw new Error("Formspark request failed");
          }

          return data;
        });
      });
  }

  function initForms() {
    var forms = document.querySelectorAll("[data-site-check-form]");

    if (!forms.length) {
      return;
    }

    forms.forEach(function (form) {
      var formMode = form.getAttribute("data-form-mode") || "demo";
      var formEndpoint = form.getAttribute("data-form-endpoint") || "";
      var status = form.querySelector("[data-form-status]");
      var success = form.querySelector("[data-form-success]");
      var submitButton = form.querySelector("button[type='submit']");

      form.addEventListener("submit", function (event) {
        event.preventDefault();

        var domainInput = form.querySelector("input[name='domain']");
        var phoneInput = form.querySelector("input[name='phone']");
        var domainError = form.querySelector("[data-error-for='domain']");
        var phoneError = form.querySelector("[data-error-for='phone']");
        var parsedDomain = parseDomain(domainInput.value);
        var parsedPhone = parsePhone(phoneInput.value);
        var hasError = false;

        success.hidden = true;
        status.textContent = "";
        domainError.textContent = "";
        phoneError.textContent = "";
        domainInput.classList.remove("is-invalid");
        phoneInput.classList.remove("is-invalid");

        if (!parsedDomain) {
          domainError.textContent = "Bitte gib eine gültige Domain ein.";
          domainInput.classList.add("is-invalid");
          hasError = true;
        }

        if (!parsedPhone) {
          phoneError.textContent = "Bitte gib eine gültige Telefonnummer ein.";
          phoneInput.classList.add("is-invalid");
          hasError = true;
        }

        if (hasError) {
          return;
        }

        submitButton.disabled = true;
        status.textContent = "Wird verarbeitet...";
        var payload = {
          domain: parsedDomain,
          phone: parsedPhone,
          source: form.getAttribute("data-form-context") || "homepage",
          submittedAt: new Date().toISOString()
        };
        var submitRequest =
          formMode === "formspark" && formEndpoint
            ? submitFormsparkLead(formEndpoint, payload)
            : submitDemoLead(payload);

        submitRequest
          .then(function () {
            form.reset();
            status.textContent = "";
            success.hidden = false;
          })
          .catch(function () {
            status.textContent =
              "Gerade gab es ein Problem. Bitte versuche es noch einmal.";
          })
          .finally(function () {
            submitButton.disabled = false;
          });
      });
    });
  }

  function initDialogs() {
    var triggers = document.querySelectorAll("[data-dialog-target]");
    var dialogs = document.querySelectorAll("[data-project-dialog]");

    if (!triggers.length || !dialogs.length) {
      return;
    }

    function closeDialog(dialog) {
      if (dialog && typeof dialog.close === "function" && dialog.open) {
        dialog.close();
      }
      document.body.classList.remove("dialog-open");
    }

    triggers.forEach(function (trigger) {
      trigger.addEventListener("click", function () {
        var dialog = document.getElementById(
          trigger.getAttribute("data-dialog-target")
        );

        if (!dialog || typeof dialog.showModal !== "function") {
          return;
        }

        dialog.showModal();
        document.body.classList.add("dialog-open");
      });
    });

    dialogs.forEach(function (dialog) {
      dialog
        .querySelectorAll("[data-dialog-close]")
        .forEach(function (closeButton) {
          closeButton.addEventListener("click", function () {
            closeDialog(dialog);
          });
        });

      dialog.addEventListener("click", function (event) {
        var bounds = dialog.getBoundingClientRect();
        var isInDialog =
          bounds.top <= event.clientY &&
          event.clientY <= bounds.top + bounds.height &&
          bounds.left <= event.clientX &&
          event.clientX <= bounds.left + bounds.width;

        if (!isInDialog) {
          closeDialog(dialog);
        }
      });

      dialog.addEventListener("close", function () {
        document.body.classList.remove("dialog-open");
      });
    });
  }

  function initCarousel() {
    var carousel = document.querySelector("[data-testimonial-carousel]");

    if (!carousel) {
      return;
    }

    var slides = carousel.querySelectorAll("[data-testimonial-slide]");
    var dots = carousel.querySelectorAll("[data-carousel-dot]");
    var prev = carousel.querySelector("[data-carousel-prev]");
    var next = carousel.querySelector("[data-carousel-next]");
    var activeIndex = 0;
    var timerId = null;

    function render(index) {
      activeIndex = index;

      slides.forEach(function (slide, slideIndex) {
        var isActive = slideIndex === index;
        slide.hidden = !isActive;
        slide.classList.toggle("is-active", isActive);
      });

      dots.forEach(function (dot, dotIndex) {
        var isActive = dotIndex === index;
        dot.classList.toggle("is-active", isActive);
        dot.setAttribute("aria-selected", isActive ? "true" : "false");
      });
    }

    function goTo(index) {
      var lastIndex = slides.length - 1;
      if (index < 0) {
        render(lastIndex);
        return;
      }

      if (index > lastIndex) {
        render(0);
        return;
      }

      render(index);
    }

    function stopAutoplay() {
      if (timerId) {
        window.clearInterval(timerId);
        timerId = null;
      }
    }

    function startAutoplay() {
      if (prefersReducedMotion || slides.length < 2) {
        return;
      }

      stopAutoplay();
      timerId = window.setInterval(function () {
        goTo(activeIndex + 1);
      }, 6500);
    }

    if (prev) {
      prev.addEventListener("click", function () {
        goTo(activeIndex - 1);
      });
    }

    if (next) {
      next.addEventListener("click", function () {
        goTo(activeIndex + 1);
      });
    }

    dots.forEach(function (dot) {
      dot.addEventListener("click", function () {
        goTo(parseInt(dot.getAttribute("data-carousel-dot"), 10));
      });
    });

    carousel.addEventListener("mouseenter", stopAutoplay);
    carousel.addEventListener("mouseleave", startAutoplay);
    carousel.addEventListener("focusin", stopAutoplay);
    carousel.addEventListener("focusout", startAutoplay);

    render(0);
    startAutoplay();
  }

  document.addEventListener("DOMContentLoaded", function () {
    initCurrentLinks();
    initRevealAnimations();
    initHeaderScroll();
    initNav();
    initCountUp();
    initForms();
    initDialogs();
    initCarousel();
  });
})();
