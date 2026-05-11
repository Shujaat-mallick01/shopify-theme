/* Ardent Maternity — reveal-on-scroll observer
   Any element with [data-reveal] fades up when it enters the viewport.
   Optional: [data-reveal-delay="200"] (ms) for staggered reveals. */
(function () {
  var els = document.querySelectorAll('[data-reveal]');
  if (!els.length) return;

  if (!('IntersectionObserver' in window)) {
    els.forEach(function (el) { el.classList.add('is-visible'); });
    return;
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var delay = parseInt(entry.target.getAttribute('data-reveal-delay') || '0', 10);
      if (delay > 0) {
        setTimeout(function () { entry.target.classList.add('is-visible'); }, delay);
      } else {
        entry.target.classList.add('is-visible');
      }
      io.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });

  els.forEach(function (el) { io.observe(el); });
})();
