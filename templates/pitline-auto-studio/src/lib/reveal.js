/**
 * Kaydırınca öğelerin yumuşakça yerine oturması. Kullanıcı "hareketi azalt" tercih ediyorsa
 * ya da tarayıcı IntersectionObserver desteklemiyorsa hiçbir şey yapılmaz ve içerik hep görünür kalır.
 */
export function initReveal() {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced || !('IntersectionObserver' in window)) return;

  document.documentElement.classList.add('reveal-on');
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
  );
  document.querySelectorAll('[data-reveal]').forEach((node) => io.observe(node));
}
