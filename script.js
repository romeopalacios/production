const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
const header = document.querySelector(".site-header");

menuButton.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", isOpen);
});

document.querySelectorAll(".nav a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
  });
});

// Soft scroll reveal
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12,
    rootMargin: "0px 0px -6% 0px"
  }
);

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

// Smart sticky header: remains quiet while scrolling down,
// reappears when the user changes direction.
let lastScrollY = window.scrollY;
let ticking = false;

function updateHeader() {
  const currentY = window.scrollY;

  header.classList.toggle("header-scrolled", currentY > 20);

  if (currentY > 140 && currentY > lastScrollY && !nav.classList.contains("open")) {
    header.classList.add("header-hidden");
  } else {
    header.classList.remove("header-hidden");
  }

  lastScrollY = currentY;
  ticking = false;
}

window.addEventListener(
  "scroll",
  () => {
    if (!ticking) {
      window.requestAnimationFrame(updateHeader);
      ticking = true;
    }
  },
  { passive: true }
);

// Very subtle hero parallax on devices that support it.
// Kept intentionally small so mobile still feels fast and clean.
const heroNumber = document.querySelector(".hero-number");

window.addEventListener(
  "scroll",
  () => {
    if (!heroNumber || window.innerWidth < 781) return;

    const y = Math.min(window.scrollY, window.innerHeight);
    heroNumber.style.transform = `translate3d(0, ${y * 0.08}px, 0)`;
  },
  { passive: true }
);

document.getElementById("year").textContent = new Date().getFullYear();
