// Shared navigation behavior for the portfolio pages.
document.addEventListener("DOMContentLoaded", () => {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll("[data-nav]").forEach((link) => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    }
  });
  const year = document.querySelector("[data-year]");
  if (year) year.textContent = new Date().getFullYear();
});
