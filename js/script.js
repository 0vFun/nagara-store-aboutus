/* ═══════════════════════════════════════
   HMR STORE — About Us script.js
═══════════════════════════════════════ */
'use strict';

/* ── Intro Loader ── */
window.addEventListener("load", () => {
  const intro = document.getElementById("introLoader");
  if (intro) {
    setTimeout(() => intro.classList.add("hide"), 1800);
  }
});

/* ── Topbar Scroll ── */
const topbar = document.getElementById("topbar");
window.addEventListener("scroll", () => {
  topbar?.classList.toggle("scrolled", window.scrollY > 50);
}, { passive: true });

/* ── Hamburger ── */
const burger  = document.getElementById("burger");
const mobMenu = document.getElementById("mobMenu");
const bSpans  = burger?.querySelectorAll("span") || [];

burger?.addEventListener("click", () => {
  const open = mobMenu.classList.toggle("open");
  bSpans[0].style.transform = open ? "rotate(45deg) translate(4.5px,4.5px)"  : "";
  bSpans[1].style.opacity   = open ? "0" : "";
  bSpans[2].style.transform = open ? "rotate(-45deg) translate(4.5px,-4.5px)" : "";
  document.body.style.overflow = open ? "hidden" : "";
});

window.closeMob = function () {
  mobMenu?.classList.remove("open");
  bSpans.forEach(s => { s.style.transform = ""; s.style.opacity = ""; });
  document.body.style.overflow = "";
};

document.querySelectorAll(".mob-link").forEach(a => {
  a.addEventListener("click", () => window.closeMob());
});

/* ── Smooth Scroll ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener("click", e => {
    const t = document.querySelector(a.getAttribute("href"));
    if (t) { e.preventDefault(); t.scrollIntoView({ behavior: "smooth" }); window.closeMob(); }
  });
});

/* ── Scroll Reveal ── */
const revEls = document.querySelectorAll(".reveal");
const revObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add("on");
      revObs.unobserve(e.target);
    }
  });
}, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });
revEls.forEach(el => revObs.observe(el));

/* ── Counter Animation ── */
const counterEls = document.querySelectorAll(".hs-num[data-target]");
const counterObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el     = e.target;
    const target = parseInt(el.dataset.target);
    const dur    = 1800;
    const start  = performance.now();
    const step   = now => {
      const p    = Math.min((now - start) / dur, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.floor(ease * target).toLocaleString();
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
    counterObs.unobserve(el);
  });
}, { threshold: 0.5 });
counterEls.forEach(el => counterObs.observe(el));

/* ── Parallax Hero ── */
const heroImg = document.querySelector(".hero-img");
window.addEventListener("scroll", () => {
  if (heroImg) {
    heroImg.style.transform = `scale(1.05) translateY(${window.scrollY * 0.1}px)`;
  }
}, { passive: true });

/* ── Active Nav Link ── */
const sections = document.querySelectorAll("section[id]");
const tbLinks  = document.querySelectorAll(".tb-link");
const activeObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      tbLinks.forEach(l => l.classList.remove("active"));
      const al = document.querySelector(`.tb-link[href="#${e.target.id}"]`);
      if (al) al.classList.add("active");
    }
  });
}, { threshold: 0.5 });
sections.forEach(s => activeObs.observe(s));

/* ── Service Worker ── */
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  });
}
