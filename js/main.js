/* ==========================================================
   NAV MENU TOGGLE
========================================================== */
const navToggle = document.querySelector('.nav-toggle');
const body = document.body;

if (navToggle) {
  navToggle.addEventListener('click', () => {
    body.classList.toggle('nav-open');
  });
}

/* ==========================================================
   EVENT CARD CLICK + PAGE TRANSITION SUPPORT
========================================================== */
document.addEventListener('click', function (e) {
  const card = e.target.closest('.event-card');
  if (!card) return;

  const url = card.getAttribute('data-event-url');
  if (!url) return;

  e.preventDefault();
  body.classList.remove('page-visible');

  setTimeout(() => {
    window.location.href = url;
  }, 350);
});

/* ==========================================================
   STANDARD CAROUSEL CONTROLS
========================================================== */
document.querySelectorAll("[data-carousel]").forEach(carousel => {
  const track = carousel.querySelector(".carousel-track");
  const slides = Array.from(carousel.querySelectorAll(".carousel-slide"));
  const prevBtn = carousel.querySelector("[data-carousel-prev]");
  const nextBtn = carousel.querySelector("[data-carousel-next]");

  let index = 0;

  function updateCarousel() {
    track.style.transform = `translateX(-${index * 100}%)`;
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      index = (index - 1 + slides.length) % slides.length;
      updateCarousel();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      index = (index + 1) % slides.length;
      updateCarousel();
    });
  }
});

/* ==========================================================
   COPY LINK BUTTON
========================================================== */
const copyBtn = document.getElementById("copyLinkBtn");
const popup = document.getElementById("copyPopup");

if (copyBtn && popup) {
  copyBtn.addEventListener("click", () => {
    const link = copyBtn.getAttribute("data-copy-link");

    if (link) {
      navigator.clipboard.writeText(link);

      popup.style.opacity = "1";
      setTimeout(() => {
        popup.style.opacity = "0";
      }, 2000);
    }
  });
}

/* ==========================================================
   GLITCH CLICK EFFECT
========================================================== */
document.addEventListener("click", (e) => {
  if (e.target.closest('.nav-toggle')) return;

  const x = e.clientX;
  const y = e.clientY;

  const burst = document.createElement("div");
  burst.classList.add("glitch-burst");
  burst.style.left = `${x}px`;
  burst.style.top = `${y}px`;
  document.body.appendChild(burst);

  setTimeout(() => burst.remove(), 450);

  for (let i = 0; i < 6; i++) {
    const frag = document.createElement("div");
    frag.classList.add("glitch-frag");

    frag.style.left = `${x}px`;
    frag.style.top = `${y}px`;

    frag.style.setProperty("--dx", `${(Math.random() - 0.5) * 70}px`);
    frag.style.setProperty("--dy", `${(Math.random() - 0.5) * 70}px`);

    document.body.appendChild(frag);
    setTimeout(() => frag.remove(), 350);
  }
});

/* ==========================================================
   MULTIPLE FADE CAROUSELS (independent)
========================================================== */
document.querySelectorAll("[data-event-fade-carousel]").forEach(carousel => {
  const slides = carousel.querySelectorAll(".event-fade-slide");
  let index = 0;

  // Ensure first slide is active
  slides[0].classList.add("active");

  setInterval(() => {
    slides[index].classList.remove("active");
    index = (index + 1) % slides.length;
    slides[index].classList.add("active");
  }, 4500);
});
