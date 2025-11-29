// Menu mobile
document.addEventListener('DOMContentLoaded', function () {
  const btn = document.getElementById('mobile-menu-button');
  const menu = document.getElementById('mobile-menu');
  if (btn && menu) {
    btn.addEventListener('click', function () {
      menu.classList.toggle('hidden');
    });
  }
  const closeBtn = document.getElementById('close-mobile-menu');
  if (closeBtn && menu) {
    closeBtn.addEventListener('click', function () {
      menu.classList.add('hidden');
    });
  }
});

// Animations: utiliser GSAP si présent sinon fallback IntersectionObserver
if (window.gsap && window.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);
  const animations = [
    { element: ".header", y: -100 },
    { element: ".hero-section", y: 100 },
    { element: ".features-section", y: 30 },
    { element: ".features-section-1", x: -100 },
    { element: ".features-section-2", y: 100 },
    { element: ".features-section-3", y: 100 },
    { element: ".features-section-4", x: 100 },
    { element: ".cta-section", y: 80 },
    { element: ".cta-section-2", y: 80 },
    { element: ".how-it-work-1", x: -100 },
    { element: ".how-it-work-2", x: 100 },
    { element: ".footer", y: 100 },
    { element: ".custom", x: 100 },
    { element: ".cta-section-1", y: 80 },
  ];
  animations.forEach(({ element, x = 0, y = 0 }) => {
    if (document.querySelector(element)) {
      gsap.from(element, {
        x,
        y,
        opacity: 0,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: element,
          start: "top 90%",
          end: "+=500",
          scrub: true,
        },
      });
    }
  });
  // Animate generic utility classes as well
  document.querySelectorAll('.fade-in').forEach((el) => {
    gsap.from(el, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 90%",
        toggleActions: "play none none none",
      },
    });
  });
  document.querySelectorAll('.slide-in-left').forEach((el) => {
    gsap.from(el, {
      x: -60,
      opacity: 0,
      duration: 0.9,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 90%",
        toggleActions: "play none none none",
      },
    });
  });
  document.querySelectorAll('.slide-in-right').forEach((el) => {
    gsap.from(el, {
      x: 60,
      opacity: 0,
      duration: 0.9,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 90%",
        toggleActions: "play none none none",
      },
    });
  });
} else {
  document.addEventListener('DOMContentLoaded', function () {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right').forEach((el) => observer.observe(el));
  });
}

// Ajoute un écouteur d'événement pour le chargement du DOM
document.addEventListener("DOMContentLoaded", function () {
    const links = document.querySelectorAll(".nav-link, .nav-link-mobile");

    // Vérifier quelle page est active au chargement
    function setActiveLink() {
        const currentPage = window.location.pathname;
        links.forEach(link => {
            if (link.getAttribute("href") === currentPage) {
                if (link.classList.contains("nav-link")) {
                    link.classList.add("active-link");
                } else if (link.classList.contains("nav-link-mobile")) {
                    link.classList.add("active-link-mobile");
                }
            } else {
                link.classList.remove("active-link", "active-link-mobile");
            }
        });
    }

    // Détecter le clic et changer l'effet
    links.forEach(link => {
        link.addEventListener("click", function () {
            links.forEach(l => l.classList.remove("active-link", "active-link-mobile"));
            if (this.classList.contains("nav-link")) {
                this.classList.add("active-link");
            } else if (this.classList.contains("nav-link-mobile")) {
                this.classList.add("active-link-mobile");
            }
        });
    });

    setActiveLink(); // Appliquer l'effet au chargement de la page
});
document.addEventListener("DOMContentLoaded", function () {
  const slides = document.querySelectorAll(".bg-slider");
  let index = 0;

  function changeBackground() {
    if (slides.length === 0) return; // Vérifie si des diapositives existent

    const current = slides[index];
    const nextIndex = (index + 1) % slides.length;
    const next = slides[nextIndex];

    // 🔹 Réinitialiser toutes les classes
    slides.forEach((slide) => slide.classList.remove("active", "previous"));

    // 🔹 Mettre l'image actuelle en "previous" (elle sort vers la gauche)
    if (current) {
      current.classList.add("previous");
    }

    // 🔹 Mettre la prochaine image en "active" (elle entre depuis la droite)
    if (next) {
      next.classList.add("active");
    }

    // 🔹 Mettre à jour l'index pour la prochaine transition
    index = nextIndex;
  }

  // ⏳ Démarrer le slider toutes les 6 secondes
  setInterval(changeBackground, 6000);
});

// Hero background slider (home)
document.addEventListener("DOMContentLoaded", function () {
  const heroSliders = document.querySelectorAll('.hero-slider');
  if (heroSliders.length === 0) return;
  let currentSlide = 0;
  function showSlide(n) {
    heroSliders.forEach((slide) => slide.classList.remove('active'));
    currentSlide = (n + heroSliders.length) % heroSliders.length;
    heroSliders[currentSlide].classList.add('active');
  }
  setInterval(() => showSlide(currentSlide + 1), 6000);
});

// Scroll-to-top button
document.addEventListener('DOMContentLoaded', function () {
  const scrollToTopButton = document.getElementById('scrollToTop');
  if (!scrollToTopButton) return;
  const toggleBtn = () => {
    if (window.scrollY > 300) {
      scrollToTopButton.style.display = 'flex';
    } else {
      scrollToTopButton.style.display = 'none';
    }
  };
  window.addEventListener('scroll', toggleBtn);
  scrollToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  toggleBtn();
});

document.addEventListener("DOMContentLoaded", function () {
  const selects = document.querySelectorAll("#language-select, #language-select-1");
  let retryCount = 0; // Compteur de tentatives
  const maxRetries = 10; // Limite de tentatives pour éviter la boucle infinie

  function changeLanguage(lang) {
    localStorage.setItem("preferredLanguage", lang); // Sauvegarde la langue

    const googleTranslateCombo = document.querySelector(".goog-te-combo");
    if (googleTranslateCombo) {
      if (googleTranslateCombo.value !== lang) {
        // Évite les changements répétés
        googleTranslateCombo.value = lang;
        googleTranslateCombo.dispatchEvent(new Event("change"));
      }
    } else {
      if (retryCount < maxRetries) {
        console.warn("Google Translate n'est pas encore chargé... Tentative", retryCount + 1);
        retryCount++;
        setTimeout(() => changeLanguage(lang), 500); // Réessaie après 500ms
      } else {
        console.error("Google Translate ne s'est pas chargé après plusieurs tentatives.");
      }
      return;
    }

    // Synchroniser les selects
    selects.forEach((select) => {
      select.value = lang;
      // Mettre à jour l'attribut selected de l'option correspondante
      select.querySelectorAll("option").forEach((option) => {
        option.selected = option.value === lang;
      });
    });
  }

  // Appliquer la langue sauvegardée au chargement de la page
  const savedLanguage = localStorage.getItem("preferredLanguage");
  if (savedLanguage) {
    // Synchroniser les selects avec la langue sauvegardée
    selects.forEach((select) => {
      select.value = savedLanguage;
      select.querySelectorAll("option").forEach((option) => {
        option.selected = option.value === savedLanguage;
      });
    });
    changeLanguage(savedLanguage); // Appliquer immédiatement sans délai
  }

  // Écouter le changement sur les selects
  selects.forEach((select) => {
    select.addEventListener("change", (e) => {
      changeLanguage(e.target.value);
      // Rafraîchir la page pour synchroniser le choix de la langue
      location.reload();
    });
  });

  // Supprimer le bandeau et les tooltips de Google Translate
  function removeGoogleTranslateUI() {
    document.querySelectorAll(".goog-te-banner-frame, .goog-tooltip, .goog-te-balloon-frame").forEach((el) => {
      el.remove();
    });
    document.body.style.top = "0px"; // Empêcher Google de décaler la page
  }

  // Observer le DOM pour supprimer ces éléments indésirables
  const observer = new MutationObserver(removeGoogleTranslateUI);
  observer.observe(document.body, { childList: true, subtree: true });

  // Exécuter immédiatement
  removeGoogleTranslateUI();
});

// Expose Google Translate init for the loader script
window.googleTranslateElementInit = function () {
  try {
    var id = 'google_translate_element';
    if (!document.getElementById(id)) {
      var div = document.createElement('div');
      div.id = id;
      div.style.display = 'none';
      document.body.appendChild(div);
    }
    new google.translate.TranslateElement({ pageLanguage: 'fr', autoDisplay: false }, id);
  } catch (e) {
    // Ignore if google is not ready yet
  }
};
