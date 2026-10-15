// script.js — minimal interactions

document.addEventListener('DOMContentLoaded', function () {
  // year in footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // nav toggle for small screens
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      const expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', String(!expanded));
      navMenu.classList.toggle('open');
    });
  }

  // Simple JS: collapse mobile nav on link click
  Array.from(document.querySelectorAll('.nav-links a')).forEach((a) => {
    a.addEventListener('click', () => {
      if (navMenu && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });
});

// people.html — bio toggle behaviour
(function () {
  document.addEventListener('DOMContentLoaded', function () {
    const toggles = Array.from(document.querySelectorAll('.bio-toggle'));
    toggles.forEach((btn, idx) => {
      btn.addEventListener('click', function (e) {
        const personInfo = btn.closest('.person-info');
        if (!personInfo) return;
        const bio = personInfo.querySelector('.person-bio');
        if (!bio) return;

        const expanded = bio.classList.toggle('expanded');
        btn.textContent = expanded ? 'Show less' : 'Show more';
        btn.setAttribute('aria-expanded', String(expanded));
      });
    });
  });
})();

/* ===== Hero Image Slider ===== */

const slides = document.querySelectorAll('.hero-slide');
let currentSlide = 0;

if (slides.length > 1) setInterval(() => {
  slides[currentSlide].classList.remove('active');
  currentSlide = (currentSlide + 1) % slides.length;
  slides[currentSlide].classList.add('active');
}, 4000); // 4 seconds

/* ===== Tabs behaviour ===== */
(function () {
  document.addEventListener('DOMContentLoaded', function () {
    // Tabs
    const tabButtons = Array.from(document.querySelectorAll('.tab-btn'));
    const tabContents = Array.from(document.querySelectorAll('.tab-content'));
    tabButtons.forEach((btn) => {
      btn.addEventListener('click', function () {
        const target = this.getAttribute('data-tab');
        // toggle active on buttons
        tabButtons.forEach((b) => {
          const active = b === this;
          b.classList.toggle('active', active);
          b.setAttribute('aria-selected', String(active));
        });
        // show/hide content
        tabContents.forEach((c) => {
          const isTarget = c.id === target;
          c.classList.toggle('active', isTarget);
          c.setAttribute('aria-hidden', String(!isTarget));
        });
        // scroll to tab region for smaller screens (optional)
        const el = document.getElementById('research-tabs');
        if (el && window.innerWidth < 700)
          el.scrollIntoView({ behavior: 'smooth' });
      });
    });

    // Navbar dropdown toggle (for .nav-dropdown .drop-btn)
    const navDropdowns = Array.from(document.querySelectorAll('.nav-dropdown'));
    navDropdowns.forEach((nd) => {
      const btn = nd.querySelector('.drop-btn');
      const menu = nd.querySelector('.dropdown-menu');
      if (!btn || !menu) return;
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const opened = nd.classList.toggle('open');
        btn.setAttribute('aria-expanded', String(opened));
      });
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', function () {
      navDropdowns.forEach((nd) => {
        nd.classList.remove('open');
        const btn = nd.querySelector('.drop-btn');
        if (btn) btn.setAttribute('aria-expanded', 'false');
      });
    });
  });
})();

/* ===== Fix Research dropdown item visibility (color + opacity) ===== */
document.addEventListener('DOMContentLoaded', () => {
  const style = document.createElement('style');
  style.textContent = `
    nav .nav-dropdown .dropdown-menu li,
    nav .nav-dropdown .dropdown-menu a {
      color: #010e16 !important;
      opacity: 1 !important;
    }

    nav .nav-dropdown .dropdown-menu a:hover {
      color: #f7f9fa !important;
    }
  `;
  document.head.appendChild(style);
});

/* ===== Make Research dropdown background blue ===== */
document.addEventListener('DOMContentLoaded', () => {
  const style = document.createElement('style');
  style.textContent = `
    nav .nav-dropdown .dropdown-menu {
      background-color: #043d63 !important; /* IIT-style blue */
      border-radius: 8px;
    }

    nav .nav-dropdown .dropdown-menu a {
      color: #ffffff !important; /* white text for contrast */
      opacity: 1 !important;
    }

    nav .nav-dropdown .dropdown-menu a:hover {
      background-color: rgba(255,255,255,0.15);
    }
  `;
  document.head.appendChild(style);
});
