(function () {
  "use strict";

  function initAos() {
    if (!window.AOS || typeof window.AOS.init !== "function") {
      return;
    }

    window.AOS.init({
      duration: 760,
      easing: "ease-out-quart",
      offset: 40,
      once: true,
      mirror: false
    });

    window.addEventListener(
      "load",
      function () {
        if (typeof window.AOS.refreshHard === "function") {
          window.AOS.refreshHard();
        }
      },
      { once: true }
    );
  }

  function initCountUp() {
    var counters = document.querySelectorAll(".js-count-up[data-target]");
    if (!counters.length) {
      return;
    }

    function animateCounter(node) {
      var target = parseInt(node.getAttribute("data-target"), 10);
      if (Number.isNaN(target) || target < 0) {
        return;
      }

      var duration = 1100;
      var start = 0;
      var startTime;

      function tick(timestamp) {
        if (!startTime) {
          startTime = timestamp;
        }

        var progress = Math.min((timestamp - startTime) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3);
        var value = Math.round(start + (target - start) * eased);
        node.textContent = String(value);

        if (progress < 1) {
          window.requestAnimationFrame(tick);
        }
      }

      window.requestAnimationFrame(tick);
    }

    if (!("IntersectionObserver" in window)) {
      counters.forEach(animateCounter);
      return;
    }

    var observer = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) {
            return;
          }

          animateCounter(entry.target);
          obs.unobserve(entry.target);
        });
      },
      {
        threshold: 0.4
      }
    );

    counters.forEach(function (counter) {
      observer.observe(counter);
    });
  }

  function initActiveSectionLinks() {
    var sections = document.querySelectorAll("section.site-section[id]");
    var navLinks = document.querySelectorAll(".masthead__menu-item a[href*='#']");
    if (!sections.length || !navLinks.length || !("IntersectionObserver" in window)) {
      return;
    }

    var linkById = {};
    navLinks.forEach(function (link) {
      var href = link.getAttribute("href") || "";
      var hashIndex = href.indexOf("#");
      if (hashIndex === -1) {
        return;
      }

      var sectionId = href.slice(hashIndex + 1);
      if (sectionId) {
        linkById[sectionId] = link;
      }
    });

    function clearActive() {
      navLinks.forEach(function (link) {
        link.classList.remove("is-active-link");
      });
    }

    var observer = new IntersectionObserver(
      function (entries) {
        var visible = entries
          .filter(function (entry) {
            return entry.isIntersecting;
          })
          .sort(function (a, b) {
            return b.intersectionRatio - a.intersectionRatio;
          });

        if (!visible.length) {
          return;
        }

        var activeSectionId = visible[0].target.getAttribute("id");
        if (!activeSectionId || !linkById[activeSectionId]) {
          return;
        }

        clearActive();
        linkById[activeSectionId].classList.add("is-active-link");
      },
      {
        rootMargin: "-20% 0px -60% 0px",
        threshold: [0.2, 0.45, 0.7]
      }
    );

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initAos();
    initCountUp();
    initActiveSectionLinks();
  });
})();
