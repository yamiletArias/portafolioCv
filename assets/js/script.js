//  VARIABLES GLOBALES 
let isLightTheme = false;

//  FLOATING PARTICLES 
function createParticles() {
  const particlesContainer = document.getElementById("particles");
  const particleCount = 50;

  // Limpiar partículas existentes
  particlesContainer.innerHTML = "";

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.classList.add("particle");

    // Tamaño aleatorio entre 2px y 6px
    const size = Math.random() * 4 + 2;
    particle.style.width = size + "px";
    particle.style.height = size + "px";

    // Posición horizontal aleatoria
    particle.style.left = Math.random() * 100 + "%";

    // Delay de animación aleatorio
    particle.style.animationDelay = Math.random() * 20 + "s";

    // Duración de animación aleatoria
    particle.style.animationDuration = Math.random() * 10 + 15 + "s";

    particlesContainer.appendChild(particle);
  }
}

//  THEME TOGGLE 
function toggleTheme() {
  const body = document.body;
  const themeIcon = document.querySelector(".theme-toggle i");

  if (body.getAttribute("data-theme") === "light") {
    // Cambiar a tema oscuro
    body.removeAttribute("data-theme");
    themeIcon.className = "fas fa-sun";
    isLightTheme = false;

    // Guardar preferencia en localStorage (solo si está disponible)
    try {
      localStorage.setItem("theme", "dark");
    } catch (e) {
      console.log("localStorage no disponible");
    }
  } else {
    // Cambiar a tema claro
    body.setAttribute("data-theme", "light");
    themeIcon.className = "fas fa-moon";
    isLightTheme = true;

    // Guardar preferencia en localStorage (solo si está disponible)
    try {
      localStorage.setItem("theme", "light");
    } catch (e) {
      console.log("localStorage no disponible");
    }
  }

  // Recrear partículas para que se adapten al nuevo tema
  createParticles();
}

//  CARGAR TEMA GUARDADO 
function loadTheme() {
  const themeIcon = document.querySelector(".theme-toggle i");
  let savedTheme = "dark"; // Tema por defecto

  // Intentar cargar tema guardado
  try {
    savedTheme = localStorage.getItem("theme") || "dark";
  } catch (e) {
    console.log("localStorage no disponible, usando tema por defecto");
  }

  if (savedTheme === "light") {
    document.body.setAttribute("data-theme", "light");
    themeIcon.className = "fas fa-moon";
    isLightTheme = true;
  } else {
    document.body.removeAttribute("data-theme");
    themeIcon.className = "fas fa-sun";
    isLightTheme = false;
  }
}

//  SMOOTH SCROLL 
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));

      if (target) {
        const headerHeight = document.querySelector("header").offsetHeight;
        const targetPosition = target.offsetTop - headerHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });
}

//  NAVBAR SCROLL EFFECT 
function initNavbarScrollEffect() {
  const header = document.querySelector("header");
  let lastScrollY = window.scrollY;

  window.addEventListener("scroll", function () {
    const currentScrollY = window.scrollY;

    // Cambiar opacidad del header basado en el scroll
    if (currentScrollY > 100) {
      header.style.background = "rgba(15, 15, 15, 0.98)";
      header.style.backdropFilter = "blur(25px)";
    } else {
      header.style.background = "rgba(15, 15, 15, 0.95)";
      header.style.backdropFilter = "blur(20px)";
    }

    // Ocultar/mostrar navbar en móvil al hacer scroll
    if (window.innerWidth <= 768) {
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down
        header.style.transform = "translateY(-100%)";
      } else {
        // Scrolling up
        header.style.transform = "translateY(0)";
      }
    }

    lastScrollY = currentScrollY;
  });
}

//  ANIMACIONES AL HACER SCROLL 
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Observar elementos para animaciones
  const animatedElements = document.querySelectorAll(
    ".timeline-item, .skill-category, .contact-item, .section-title"
  );

  animatedElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });
}

//  TYPING EFFECT 
function initTypingEffect() {
  const subtitle = document.querySelector(".subtitle");
  if (!subtitle) return;

  const text = subtitle.textContent;
  subtitle.textContent = "";
  subtitle.style.borderRight = "2px solid var(--primary-color)";

  let i = 0;
  function typeWriter() {
    if (i < text.length) {
      subtitle.textContent += text.charAt(i);
      i++;
      setTimeout(typeWriter, 100);
    } else {
      // Efecto de parpadeo del cursor
      setInterval(() => {
        subtitle.style.borderRight =
          subtitle.style.borderRight === "none"
            ? "2px solid var(--primary-color)"
            : "none";
      }, 1000);
    }
  }

  // Iniciar el efecto después de un pequeño delay
  setTimeout(typeWriter, 1500);
}

//  PARALLAX EFFECT 
function initParallaxEffect() {
  window.addEventListener("scroll", function () {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll(".profile-img");

    parallaxElements.forEach((element) => {
      const speed = 0.5;
      element.style.transform = `translateY(${scrolled * speed}px)`;
    });
  });
}

//  SKILL TAGS HOVER EFFECT 
function initSkillTagsEffect() {
  const skillTags = document.querySelectorAll(".skill-tag");

  skillTags.forEach((tag) => {
    tag.addEventListener("mouseenter", function () {
      // Añadir efecto de ondas
      const ripple = document.createElement("span");
      ripple.classList.add("ripple");
      ripple.style.position = "absolute";
      ripple.style.borderRadius = "50%";
      ripple.style.background = "rgba(255, 255, 255, 0.3)";
      ripple.style.transform = "scale(0)";
      ripple.style.animation = "ripple-effect 0.6s linear";
      ripple.style.pointerEvents = "none";

      this.style.position = "relative";
      this.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });

  // Añadir CSS para el efecto ripple
  const style = document.createElement("style");
  style.textContent = `
        @keyframes ripple-effect {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
    `;
  document.head.appendChild(style);
}

//  CONTACT FORM ANIMATIONS 
function initContactAnimations() {
  const contactItems = document.querySelectorAll(".contact-item");

  contactItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.1}s`;

    item.addEventListener("mouseenter", function () {
      const icon = this.querySelector(".contact-icon");
      icon.style.transform = "rotate(360deg) scale(1.1)";
      icon.style.transition = "transform 0.6s ease";
    });

    item.addEventListener("mouseleave", function () {
      const icon = this.querySelector(".contact-icon");
      icon.style.transform = "rotate(0deg) scale(1)";
    });
  });
}

//  MOBILE MENU 
function initMobileMenu() {
  // Crear botón de hamburguesa para móvil
  const nav = document.querySelector("nav");
  const navLinks = document.querySelector(".nav-links");

  if (window.innerWidth <= 768) {
    const hamburgerBtn = document.createElement("button");
    hamburgerBtn.className = "hamburger-btn";
    hamburgerBtn.innerHTML = '<i class="fas fa-bars"></i>';
    hamburgerBtn.style.cssText = `
            display: block;
            background: none;
            border: none;
            color: var(--text-secondary);
            font-size: 1.2rem;
            cursor: pointer;
            padding: 0.5rem;
        `;

    nav.appendChild(hamburgerBtn);

    hamburgerBtn.addEventListener("click", function () {
      navLinks.style.display =
        navLinks.style.display === "flex" ? "none" : "flex";
      navLinks.style.position = "absolute";
      navLinks.style.top = "100%";
      navLinks.style.left = "0";
      navLinks.style.width = "100%";
      navLinks.style.background = "var(--bg-secondary)";
      navLinks.style.flexDirection = "column";
      navLinks.style.padding = "1rem";
      navLinks.style.borderTop = "1px solid var(--border-color)";
    });
  }
}

//  PERFORMANCE OPTIMIZATION 
function optimizePerformance() {
  // Lazy loading para imágenes
  const images = document.querySelectorAll("img");
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src || img.src;
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach((img) => imageObserver.observe(img));

  // Throttle para eventos de scroll
  let ticking = false;
  function updateScrollEffects() {
    initNavbarScrollEffect();
    initParallaxEffect();
    ticking = false;
  }

  window.addEventListener("scroll", function () {
    if (!ticking) {
      requestAnimationFrame(updateScrollEffects);
      ticking = true;
    }
  });
}

//  EASTER EGG 
function initEasterEgg() {
  const konamiCode = [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "KeyB",
    "KeyA",
  ];
  let userInput = [];

  document.addEventListener("keydown", function (e) {
    userInput.push(e.code);

    if (userInput.length > konamiCode.length) {
      userInput.shift();
    }

    if (JSON.stringify(userInput) === JSON.stringify(konamiCode)) {
      // Easter egg activado
      document.body.style.animation = "rainbow 2s infinite";

      const style = document.createElement("style");
      style.textContent = `
                @keyframes rainbow {
                    0% { filter: hue-rotate(0deg); }
                    100% { filter: hue-rotate(360deg); }
                }
            `;
      document.head.appendChild(style);

      setTimeout(() => {
        document.body.style.animation = "none";
        style.remove();
      }, 5000);

      userInput = [];
    }
  });
}

//  INICIALIZACIÓN 
document.addEventListener("DOMContentLoaded", function () {
  console.log("Portafolio de Deyanira Chacaliaza cargado exitosamente!");

  // Inicializar todas las funcionalidades
  loadTheme();
  createParticles();
  initSmoothScroll();
  initNavbarScrollEffect();
  initScrollAnimations();
  initTypingEffect();
  initParallaxEffect();
  initSkillTagsEffect();
  initContactAnimations();
  initMobileMenu();
  optimizePerformance();
  initEasterEgg();

  // Mostrar mensaje de bienvenida después de la carga
  setTimeout(() => {
    console.log("Gracias por visitar mi portafolio :3");
  }, 2000);
});

//  RESIZE HANDLER 
window.addEventListener("resize", function () {
  // Recrear partículas al cambiar el tamaño de ventana
  createParticles();

  // Reinicializar menú móvil si es necesario
  if (window.innerWidth > 768) {
    const navLinks = document.querySelector(".nav-links");
    navLinks.style.display = "flex";
    navLinks.style.position = "static";
    navLinks.style.flexDirection = "row";
    navLinks.style.background = "none";
    navLinks.style.padding = "0";
    navLinks.style.border = "none";

    const hamburgerBtn = document.querySelector(".hamburger-btn");
    if (hamburgerBtn) {
      hamburgerBtn.remove();
    }
  }
});

//  ERROR HANDLING 
window.addEventListener("error", function (e) {
  console.error("Error en el portafolio:", e.error);

  // Mostrar mensaje de error amigable al usuario
  const errorDiv = document.createElement("div");
  errorDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #ff4757;
        color: white;
        padding: 1rem;
        border-radius: 10px;
        z-index: 10000;
        max-width: 300px;
    `;
  errorDiv.innerHTML = "Algo salió mal, pero el portafolio sigue funcionando!";

  document.body.appendChild(errorDiv);

  setTimeout(() => {
    errorDiv.remove();
  }, 5000);
});

//  EXPORT PARA TESTING 
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    createParticles,
    toggleTheme,
    loadTheme,
    initSmoothScroll,
  };
}
