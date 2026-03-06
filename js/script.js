/* ====================================================
   ALTIORA FINANCE — script.js
==================================================== */

// ── MENÚ MÓVIL ──────────────────────────────────────
(() => {
  const btn = document.getElementById('navToggle');
  const nav = document.getElementById('navMenu');
  if (!btn || !nav) return;

  btn.addEventListener('click', () => {
    nav.classList.toggle('is-open');
    btn.classList.toggle('is-open');
  });

  nav.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => {
      nav.classList.remove('is-open');
      btn.classList.remove('is-open');
    })
  );
})();

// ── HEADER SCROLL ───────────────────────────────────
(() => {
  const h = document.getElementById('header');
  if (!h) return;
  window.addEventListener('scroll', () => h.classList.toggle('scrolled', scrollY > 30), { passive: true });
})();

// ── SCROLL ANIMATIONS ───────────────────────────────
(() => {
  const els = document.querySelectorAll('[data-anim]');
  if (!els.length) return;

  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12 });

  els.forEach(el => io.observe(el));
})();

// ── LOGOS SLIDER ─────────────────────────────────────
(() => {
  const track   = document.getElementById('logosTrack');
  const prevBtn = document.querySelector('.prev-logo');
  const nextBtn = document.querySelector('.next-logo');
  if (!track) return;

  const items = Array.from(track.children);
  let index = 0;
  let timer;

  function step() {
    if (!items.length) return 0;
    const gap = parseFloat(getComputedStyle(track).gap) || 14;
    return items[0].getBoundingClientRect().width + gap;
  }

  function visibleCount() {
    const vw = track.parentElement.clientWidth;
    return Math.max(1, Math.floor(vw / (step() || 1)));
  }

  function maxIdx() { return Math.max(0, items.length - visibleCount()); }

  function update() {
    const m = maxIdx();
    if (index > m) index = 0;
    track.style.transform = `translateX(-${index * step()}px)`;
  }

  function next() { index = index >= maxIdx() ? 0 : index + 1; update(); }
  function prev() { index = index <= 0 ? maxIdx() : index - 1; update(); }
  function start() { stop(); timer = setInterval(next, 2600); }
  function stop()  { clearInterval(timer); }

  prevBtn?.addEventListener('click', () => { prev(); start(); });
  nextBtn?.addEventListener('click', () => { next(); start(); });
  track.addEventListener('mouseenter', stop);
  track.addEventListener('mouseleave', start);
  window.addEventListener('resize', update);
  window.addEventListener('load', update);

  update(); start();
})();

// ── TESTIMONIOS SLIDER ───────────────────────────────
(() => {
  const track    = document.getElementById('testimonialsTrack');
  const dotsWrap = document.getElementById('testimonialDots');
  const prevBtn  = document.querySelector('.prev-testi');
  const nextBtn  = document.querySelector('.next-testi');
  if (!track) return;

  const slides = Array.from(track.children);
  let index = 0;
  let timer;

  // Dots
  if (dotsWrap) {
    dotsWrap.innerHTML = '';
    slides.forEach((_, i) => {
      const d = document.createElement('button');
      d.setAttribute('aria-label', `Testimonio ${i + 1}`);
      if (i === 0) d.classList.add('is-active');
      d.addEventListener('click', () => { index = i; update(); restart(); });
      dotsWrap.appendChild(d);
    });
  }

  function update() {
    const w = track.parentElement.clientWidth;
    track.style.transform = `translateX(-${index * w}px)`;
    if (dotsWrap)
      [...dotsWrap.children].forEach((d, i) => d.classList.toggle('is-active', i === index));
  }

  function next() { index = (index + 1) % slides.length; update(); }
  function prev() { index = (index - 1 + slides.length) % slides.length; update(); }
  function start()   { stop(); timer = setInterval(next, 5000); }
  function stop()    { clearInterval(timer); }
  function restart() { start(); }

  prevBtn?.addEventListener('click', () => { prev(); restart(); });
  nextBtn?.addEventListener('click', () => { next(); restart(); });
  track.addEventListener('mouseenter', stop);
  track.addEventListener('mouseleave', start);
  window.addEventListener('resize', update);
  window.addEventListener('load', update);

  update(); start();
})();