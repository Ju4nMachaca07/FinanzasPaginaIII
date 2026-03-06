// =========================
// MENÚ MÓVIL
// =========================
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => navMenu.classList.toggle("is-open"));
  navMenu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => navMenu.classList.remove("is-open"));
  });
}

// =========================
// CARRUSEL TESTIMONIOS (1 por vez)
// =========================
(function testimonialsSlider() {
  const track = document.getElementById("testimonialsTrack");
  const dotsWrap = document.getElementById("testimonialDots");
  const prevBtn = document.querySelector('.slider-btn.prev[data-target="testimonialsTrack"]');
  const nextBtn = document.querySelector('.slider-btn.next[data-target="testimonialsTrack"]');

  if (!track) return;

  const slides = Array.from(track.children);
  let index = 0;
  let timer = null;

  // Crear dots
  if (dotsWrap) {
    dotsWrap.innerHTML = "";
    slides.forEach((_, i) => {
      const dot = document.createElement("button");
      if (i === 0) dot.classList.add("is-active");
      dot.addEventListener("click", () => {
        index = i;
        update();
        restartAutoplay();
      });
      dotsWrap.appendChild(dot);
    });
  }

  function update() {
    // Ancho real del viewport (contenedor visible)
    const viewport = track.parentElement;
    const slideWidth = viewport.clientWidth;

    // Mover track exactamente por ancho del viewport
    track.style.transform = `translateX(-${index * slideWidth}px)`;

    // Actualizar dots
    if (dotsWrap) {
      [...dotsWrap.children].forEach((dot, i) => {
        dot.classList.toggle("is-active", i === index);
      });
    }
  }

  function next() {
    index = (index + 1) % slides.length;
    update();
  }

  function prev() {
    index = (index - 1 + slides.length) % slides.length;
    update();
  }

  function startAutoplay() {
    stopAutoplay();
    timer = setInterval(next, 5000);
  }

  function stopAutoplay() {
    if (timer) clearInterval(timer);
  }

  function restartAutoplay() {
    startAutoplay();
  }

  prevBtn?.addEventListener("click", () => {
    prev();
    restartAutoplay();
  });

  nextBtn?.addEventListener("click", () => {
    next();
    restartAutoplay();
  });

  // Pausa al pasar mouse
  track.addEventListener("mouseenter", stopAutoplay);
  track.addEventListener("mouseleave", startAutoplay);

  // Recalcular en resize
  window.addEventListener("resize", update);

  // Inicializar cuando carguen imágenes (importante)
  window.addEventListener("load", update);

  update();
  startAutoplay();
})();

// =========================
// CARRUSEL LOGOS (múltiples visibles)
// =========================
(function logosSlider() {
  const track = document.getElementById("logosTrack");
  const prevBtn = document.querySelector('.slider-btn.prev[data-target="logosTrack"]');
  const nextBtn = document.querySelector('.slider-btn.next[data-target="logosTrack"]');

  if (!track) return;

  const items = Array.from(track.children);
  let index = 0;
  let timer = null;

  function getStep() {
    if (!items.length) return 0;
    const itemRect = items[0].getBoundingClientRect();
    const styles = getComputedStyle(track);
    const gap = parseFloat(styles.gap || "0");
    return itemRect.width + gap;
  }

  function getVisibleCount() {
    if (!items.length) return 1;
    const viewport = track.parentElement;
    const viewportWidth = viewport.clientWidth;
    const itemWidth = items[0].getBoundingClientRect().width || viewportWidth;
    return Math.max(1, Math.floor(viewportWidth / itemWidth));
  }

  function getMaxIndex() {
    return Math.max(0, items.length - getVisibleCount());
  }

  function update() {
    const max = getMaxIndex();
    if (index > max) index = 0;
    if (index < 0) index = max;

    track.style.transform = `translateX(-${index * getStep()}px)`;
  }

  function next() {
    const max = getMaxIndex();
    index = index >= max ? 0 : index + 1;
    update();
  }

  function prev() {
    const max = getMaxIndex();
    index = index <= 0 ? max : index - 1;
    update();
  }

  function startAutoplay() {
    stopAutoplay();
    timer = setInterval(next, 2500);
  }

  function stopAutoplay() {
    if (timer) clearInterval(timer);
  }

  prevBtn?.addEventListener("click", () => {
    prev();
    startAutoplay();
  });

  nextBtn?.addEventListener("click", () => {
    next();
    startAutoplay();
  });

  track.addEventListener("mouseenter", stopAutoplay);
  track.addEventListener("mouseleave", startAutoplay);

  window.addEventListener("resize", update);
  window.addEventListener("load", update);

  update();
  startAutoplay();
})();