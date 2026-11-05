// Ortak davranışlar: etkin menü, mobil menü, yıl, görünür olunca belirme, önizleme cihaz seçimi.
document.addEventListener("DOMContentLoaded", () => {
  const current = window.location.pathname.split("/").pop() || "index.html";
  const section = document.body.dataset.section; // proje detay sayfaları "projects.html" altında işaretlenir
  document.querySelectorAll("[data-nav]").forEach((link) => {
    const href = link.getAttribute("href");
    if (href === current || (section && href === section)) {
      link.setAttribute("aria-current", "page");
    }
  });

  document.querySelectorAll("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));

  // Üst çubuk gölgesi
  const bar = document.querySelector(".topbar");
  if (bar) {
    const onScroll = () => bar.classList.toggle("is-scrolled", window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  // Mobil menü
  const toggle = document.querySelector(".nav-toggle");
  const panel = document.getElementById("mobile-nav");
  if (toggle && panel) {
    const setOpen = (open) => {
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Menüyü kapat" : "Menüyü aç");
      panel.hidden = !open;
    };
    toggle.addEventListener("click", () => setOpen(panel.hidden));
    panel.addEventListener("click", (e) => e.target.closest("a") && setOpen(false));
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !panel.hidden) { setOpen(false); toggle.focus(); }
    });
    window.matchMedia("(min-width: 52rem)").addEventListener("change", (e) => e.matches && setOpen(false));
  }

  // Önizleme: masaüstü / mobil genişlik
  const stage = document.querySelector("[data-stage]");
  if (stage) {
    document.querySelectorAll("[data-mode-btn]").forEach((btn) => {
      btn.addEventListener("click", () => {
        stage.dataset.mode = btn.dataset.modeBtn;
        document.querySelectorAll("[data-mode-btn]").forEach((b) => b.setAttribute("aria-pressed", String(b === btn)));
      });
    });
  }

  // Canlı küçük önizlemeler: yalnızca geniş ekranda, veri tasarrufu kapalıyken ve görünür olunca yüklenir.
  const minis = document.querySelectorAll("[data-live]");
  const canLoad = window.matchMedia("(min-width: 48rem)").matches && !(navigator.connection && navigator.connection.saveData);
  if (minis.length && canLoad && "IntersectionObserver" in window) {
    const BASE_W = 1440;
    const setScale = (m) => { const st = m.querySelector(".mini__stage"); if (st) m.style.setProperty("--s", String(st.clientWidth / BASE_W)); };
    const ro = "ResizeObserver" in window ? new ResizeObserver((es) => es.forEach((en) => setScale(en.target.closest(".mini")))) : null;
    const loader = new IntersectionObserver((entries) => entries.forEach((en) => {
      if (!en.isIntersecting) return;
      const m = en.target; loader.unobserve(m);
      const frame = document.createElement("iframe");
      frame.src = m.dataset.live;
      frame.tabIndex = -1;
      frame.setAttribute("aria-hidden", "true");
      frame.setAttribute("scrolling", "no");
      frame.setAttribute("loading", "lazy");
      frame.title = "";
      frame.addEventListener("load", () => m.classList.add("is-ready"));
      m.querySelector(".mini__stage").append(frame);
    }), { rootMargin: "200px 0px" });
    minis.forEach((m) => { setScale(m); if (ro) ro.observe(m.querySelector(".mini__stage")); loader.observe(m); });
  }

  // Görünür olunca belirme (hareket serbestse)
  const items = document.querySelectorAll("[data-reveal]");
  if (items.length && "IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.documentElement.classList.add("reveal-on");
    const io = new IntersectionObserver((entries) => entries.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); }
    }), { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });
    items.forEach((el) => io.observe(el));
  }
});
