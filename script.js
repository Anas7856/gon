const menuToggle = document.getElementById("menuToggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("open");
  menuToggle.classList.toggle("active");
});

// Make sure GSAP is loaded first
// <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>

/*////////////////////////////////////////// hero gsap /////////////////////////////////////////////*/

window.addEventListener("load", function () {
  // Title animation
  gsap.from(".hero-title", {
    opacity: 0,
    y: 30,
    duration: 1,
    ease: "power2.out",
  });

  // Subtitle animation
  gsap.from(".hero-subtitle", {
    opacity: 0,
    y: 30,
    duration: 1,
    delay: 0.3,
    ease: "power2.out",
  });

  // Underline animation - animates from 0 to full width
  gsap.to(".hero-subtitle-underline", {
    width: "100%",
    duration: 1.2,
    delay: 1.3,
    ease: "power2.inOut",
  });

  // Description animation
  gsap.from(".hero-description", {
    opacity: 0,
    y: 30,
    duration: 1,
    delay: 0.6,
    ease: "power2.out",
  });

  // Buttons animation
  gsap.from(".hero-buttons", {
    opacity: 0,
    y: 30,
    duration: 1,
    delay: 0.9,
    ease: "power2.out",
  });
});

// /////////////////////////////about///////////////////////////
document.addEventListener("DOMContentLoaded", function () {
  const carouselTrack = document.querySelector(".carousel-track");
  const prevBtn = document.querySelector(".carousel-prev");
  const nextBtn = document.querySelector(".carousel-next");
  const indicators = document.querySelectorAll(".indicator");
  const cards = document.querySelectorAll(".diff-card");

  let currentSlide = 0;
  let totalSlides = 2;
  let cardsPerView = 3;
  const totalCards = 4;

  // Update cards per view based on screen size
  function updateCardsPerView() {
    const width = window.innerWidth;
    if (width <= 768) {
      cardsPerView = 1;
      totalSlides = 4; // Show all 4 cards one by one
    } else if (width <= 992) {
      cardsPerView = 2;
      totalSlides = 2; // Show 2 sets of 2 cards
    } else {
      cardsPerView = 3;
      totalSlides = 2; // Show 2 sets: first 3 cards, then last card
    }

    // Update indicators based on total slides
    updateIndicators();
  }

  // Update indicators dynamically
  function updateIndicators() {
    const indicatorsContainer = document.querySelector(".carousel-indicators");
    indicatorsContainer.innerHTML = "";

    for (let i = 0; i < totalSlides; i++) {
      const indicator = document.createElement("button");
      indicator.className = "indicator";
      if (i === 0) indicator.classList.add("active");
      indicator.setAttribute("data-slide", i);
      indicator.addEventListener("click", function () {
        moveToSlide(i);
        addIndicatorAnimation(this);
      });
      indicatorsContainer.appendChild(indicator);
    }
  }

  // Move to specific slide
  function moveToSlide(slideIndex) {
    if (slideIndex < 0 || slideIndex >= totalSlides) return;

    currentSlide = slideIndex;
    const cardWidth = cards[0].offsetWidth;
    const gap = window.innerWidth <= 768 ? 20 : 30;
    const translateX = -(currentSlide * cardsPerView * (cardWidth + gap));

    carouselTrack.style.transform = `translateX(${translateX}px)`;

    // Update indicators
    const allIndicators = document.querySelectorAll(".indicator");
    allIndicators.forEach((indicator, index) => {
      if (index === currentSlide) {
        indicator.classList.add("active");
      } else {
        indicator.classList.remove("active");
      }
    });

    // Update button states
    updateButtonStates();
  }

  // Update button disabled states
  function updateButtonStates() {
    prevBtn.style.opacity = currentSlide === 0 ? "0.5" : "1";
    prevBtn.style.cursor = currentSlide === 0 ? "not-allowed" : "pointer";
    prevBtn.disabled = currentSlide === 0;

    nextBtn.style.opacity = currentSlide === totalSlides - 1 ? "0.5" : "1";
    nextBtn.style.cursor =
      currentSlide === totalSlides - 1 ? "not-allowed" : "pointer";
    nextBtn.disabled = currentSlide === totalSlides - 1;
  }

  // Previous button
  prevBtn.addEventListener("click", function () {
    if (currentSlide > 0) {
      moveToSlide(currentSlide - 1);
      addClickAnimation(this);
    }
  });

  // Next button
  nextBtn.addEventListener("click", function () {
    if (currentSlide < totalSlides - 1) {
      moveToSlide(currentSlide + 1);
      addClickAnimation(this);
    }
  });

  // Indicator clicks
  const indicatorsContainer = document.querySelector(".carousel-indicators");
  indicatorsContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("indicator")) {
      const index = parseInt(e.target.getAttribute("data-slide"));
      moveToSlide(index);
      addIndicatorAnimation(e.target);
    }
  });

  // Add click animation to buttons
  function addClickAnimation(button) {
    button.style.transform = "scale(0.9)";
    setTimeout(() => {
      button.style.transform = "";
    }, 150);
  }

  // Add animation to indicators
  function addIndicatorAnimation(indicator) {
    indicator.style.transform = "scaleY(1.5)";
    setTimeout(() => {
      indicator.style.transform = "";
    }, 200);
  }

  // Card hover effects
  cards.forEach((card, index) => {
    // 3D tilt effect
    card.addEventListener("mousemove", function (e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;

      this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "";
    });

    // Glow effect follows mouse
    card.addEventListener("mousemove", function (e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const glow = this.querySelector(".card-glow");
      if (glow) {
        glow.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(218, 165, 32, 0.15) 0%, transparent 50%)`;
      }
    });
  });

  // Auto-play carousel
  let autoPlayInterval;

  function startAutoPlay() {
    autoPlayInterval = setInterval(() => {
      if (currentSlide < totalSlides - 1) {
        moveToSlide(currentSlide + 1);
      } else {
        moveToSlide(0);
      }
    }, 5000); // Change slide every 5 seconds
  }

  function stopAutoPlay() {
    clearInterval(autoPlayInterval);
  }

  // Start auto-play
  startAutoPlay();

  // Stop auto-play on hover
  const carouselWrapper = document.querySelector(".carousel-wrapper");
  carouselWrapper.addEventListener("mouseenter", stopAutoPlay);
  carouselWrapper.addEventListener("mouseleave", startAutoPlay);

  // Keyboard navigation
  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") {
      if (currentSlide > 0) {
        moveToSlide(currentSlide - 1);
      }
    } else if (e.key === "ArrowRight") {
      if (currentSlide < totalSlides - 1) {
        moveToSlide(currentSlide + 1);
      }
    }
  });

  // Touch/Swipe support
  let touchStartX = 0;
  let touchEndX = 0;

  carouselTrack.addEventListener("touchstart", function (e) {
    touchStartX = e.changedTouches[0].screenX;
  });

  carouselTrack.addEventListener("touchend", function (e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });

  function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0 && currentSlide < totalSlides - 1) {
        // Swipe left - next
        moveToSlide(currentSlide + 1);
      } else if (diff < 0 && currentSlide > 0) {
        // Swipe right - previous
        moveToSlide(currentSlide - 1);
      }
    }
  }

  // Responsive handling
  let resizeTimer;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      const oldCardsPerView = cardsPerView;
      updateCardsPerView();

      // Reset to first slide if cards per view changed
      if (oldCardsPerView !== cardsPerView) {
        currentSlide = 0;
        moveToSlide(0);
      } else {
        // Just recalculate position for current slide
        if (currentSlide >= totalSlides) {
          currentSlide = totalSlides - 1;
        }
        moveToSlide(currentSlide);
      }
    }, 250);
  });

  // Scroll animation for cards
  const observerOptions = {
    threshold: 0.2,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }, index * 100);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Initially hide cards for animation
  cards.forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";
    card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(card);
  });

  // Particle effect on card hover
  cards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      createParticles(this);
    });
  });

  function createParticles(card) {
    const particleCount = 15;
    const rect = card.getBoundingClientRect();

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div");
      particle.className = "particle";
      particle.style.cssText = `
        position: absolute;
        width: 4px;
        height: 4px;
        background: var(--primary-color);
        border-radius: 50%;
        pointer-events: none;
        z-index: 1000;
      `;

      const x = Math.random() * rect.width;
      const y = Math.random() * rect.height;

      particle.style.left = x + "px";
      particle.style.top = y + "px";

      card.appendChild(particle);

      // Animate particle
      const angle = Math.random() * Math.PI * 2;
      const velocity = 20 + Math.random() * 20;
      const tx = Math.cos(angle) * velocity;
      const ty = Math.sin(angle) * velocity;

      particle.animate(
        [
          { transform: "translate(0, 0) scale(1)", opacity: 1 },
          { transform: `translate(${tx}px, ${ty}px) scale(0)`, opacity: 0 },
        ],
        {
          duration: 800,
          easing: "cubic-bezier(0, .9, .57, 1)",
        }
      ).onfinish = () => particle.remove();
    }
  }

  // Initialize
  updateCardsPerView();
  updateButtonStates();

  // Animate section on scroll
  const section = document.querySelector(".differentiators");
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          section.style.opacity = "1";
          section.style.transform = "translateY(0)";
        }
      });
    },
    { threshold: 0.1 }
  );

  section.style.opacity = "0";
  section.style.transform = "translateY(50px)";
  section.style.transition = "opacity 0.8s ease, transform 0.8s ease";
  sectionObserver.observe(section);

  console.log("Differentiators carousel initialized successfully!");
});
// company data /////////////////////
// ==========================================
// COMPANY SECTION - GSAP ANIMATIONS & FUNCTIONALITY
// ==========================================

// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // ==========================================
  // GSAP REVEAL ANIMATIONS (WITHOUT SCROLL TRIGGER)
  // ==========================================

  // Set initial states for all animated elements
  gsap.set(".company-header", { opacity: 0, y: -50 });
  gsap.set(".capability-card", { opacity: 0, y: 60 });
  gsap.set(".info-card", { opacity: 0, y: 50 });
  gsap.set(".certificate-card", { opacity: 0, x: 60 });
  gsap.set(".certificates-heading", { opacity: 0, y: 30 });
  gsap.set(".company-decorative-circle", { scale: 0, opacity: 0 });
  gsap.set(".company-decorative-line", { scaleX: 0, scaleY: 0 });
  gsap.set(".naics-list li", { opacity: 0, x: -30 });
  gsap.set(".cert-badge", { opacity: 0, scale: 0.5 });
  gsap.set(".capability-item", { opacity: 0, x: -20 });
  gsap.set(".id-item", { opacity: 0, y: 20 });

  // Create IntersectionObserver for reveal animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
  };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const target = entry.target;

        // Trigger animations based on element class
        if (target.classList.contains("company-header")) {
          gsap.to(target, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
          });
        }

        if (target.classList.contains("capability-card")) {
          gsap.to(target, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
          });
        }

        if (target.classList.contains("info-grid")) {
          gsap.to(".info-card", {
            opacity: 1,
            y: 0,
            stagger: 0.15,
            duration: 0.8,
            ease: "power2.out",
          });
        }

        if (target.classList.contains("certificates-section")) {
          gsap.to(".certificates-heading", {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
          });

          gsap.to(".certificate-card", {
            opacity: 1,
            x: 0,
            stagger: 0.2,
            duration: 1,
            ease: "power3.out",
            delay: 0.2,
          });
        }

        if (target.classList.contains("company")) {
          gsap.to(".company-decorative-circle", {
            scale: 1,
            opacity: 0.05,
            stagger: 0.3,
            duration: 1.5,
            ease: "elastic.out(1, 0.5)",
          });

          gsap.to(".company-decorative-line", {
            scaleX: 1,
            scaleY: 1,
            stagger: 0.2,
            duration: 1,
            ease: "power2.out",
          });
        }

        if (target.classList.contains("naics-list")) {
          gsap.to(".naics-list li", {
            opacity: 1,
            x: 0,
            stagger: 0.1,
            duration: 0.6,
            ease: "power2.out",
          });
        }

        if (target.classList.contains("cert-badges")) {
          gsap.to(".cert-badge", {
            opacity: 1,
            scale: 1,
            stagger: 0.1,
            duration: 0.5,
            ease: "back.out(1.7)",
          });
        }

        if (target.classList.contains("capabilities-list")) {
          gsap.to(".capability-item", {
            opacity: 1,
            x: 0,
            stagger: 0.1,
            duration: 0.5,
            ease: "power2.out",
          });
        }

        if (target.classList.contains("id-items")) {
          gsap.to(".id-item", {
            opacity: 1,
            y: 0,
            stagger: 0.15,
            duration: 0.6,
            ease: "power2.out",
          });
        }

        // Unobserve after animation
        revealObserver.unobserve(target);
      }
    });
  }, observerOptions);

  // Observe all elements that should animate
  const elementsToObserve = [
    document.querySelector(".company"),
    document.querySelector(".company-header"),
    document.querySelector(".capability-card"),
    document.querySelector(".info-grid"),
    document.querySelector(".certificates-section"),
    document.querySelector(".naics-list"),
    document.querySelector(".cert-badges"),
    document.querySelector(".capabilities-list"),
    document.querySelector(".id-items"),
  ];

  elementsToObserve.forEach((el) => {
    if (el) revealObserver.observe(el);
  });

  // Continuous hover effect for capability icon (not scroll-based)
  const capabilityIcon = document.querySelector(".capability-icon");
  if (capabilityIcon) {
    // Gentle continuous rotation
    gsap.to(capabilityIcon, {
      rotation: 360,
      duration: 20,
      ease: "none",
      repeat: -1,
    });
  }

  // ==========================================
  // DOWNLOAD BUTTON FUNCTIONALITY
  // ==========================================

  const downloadBtn = document.querySelector(".download-btn");

  if (downloadBtn) {
    // Click event for download
    downloadBtn.addEventListener("click", function (e) {
      // Check if the href is a placeholder
      const href = this.getAttribute("href");

      if (href === "your-capability-statement.pdf" || !href || href === "#") {
        e.preventDefault();

        // Show alert or notification
        showNotification(
          "Please upload your capability statement PDF file first!",
          "warning"
        );

        // Add a shake animation to indicate error
        gsap.to(this, {
          x: [-10, 10, -10, 10, 0],
          duration: 0.4,
          ease: "power2.inOut",
        });

        return false;
      }

      // If valid file, show success message
      showNotification("Download started!", "success");

      // Add download animation
      gsap.to(this.querySelector("i"), {
        y: 5,
        duration: 0.3,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut",
      });
    });

    // Hover animation enhancement
    downloadBtn.addEventListener("mouseenter", function () {
      gsap.to(this.querySelector(".capability-icon"), {
        rotation: 360,
        duration: 0.6,
        ease: "power2.out",
      });
    });
  }

  // ==========================================
  // CERTIFICATE IMAGE MODAL/LIGHTBOX
  // ==========================================

  const certificateCards = document.querySelectorAll(".certificate-card");

  certificateCards.forEach((card) => {
    card.addEventListener("click", function () {
      const img = this.querySelector(".certificate-img");
      const imgSrc = img.getAttribute("src");
      const label = this.querySelector(".certificate-label").textContent;

      openLightbox(imgSrc, label);
    });
  });

  // ==========================================
  // LIGHTBOX FUNCTIONALITY
  // ==========================================

  function openLightbox(imgSrc, label) {
    // Create lightbox if it doesn't exist
    let lightbox = document.getElementById("certificate-lightbox");

    if (!lightbox) {
      lightbox = document.createElement("div");
      lightbox.id = "certificate-lightbox";
      lightbox.innerHTML = `
        <div class="lightbox-overlay">
          <div class="lightbox-content">
            <button class="lightbox-close">
              <i class="fa-solid fa-times"></i>
            </button>
            <div class="lightbox-image-container">
              <img src="" alt="Certificate" class="lightbox-image">
            </div>
            <div class="lightbox-label"></div>
            <div class="lightbox-controls">
              <button class="lightbox-download">
                <i class="fa-solid fa-download"></i> Download
              </button>
            </div>
          </div>
        </div>
      `;
      document.body.appendChild(lightbox);

      // Add styles
      addLightboxStyles();

      // Close button functionality
      lightbox
        .querySelector(".lightbox-close")
        .addEventListener("click", closeLightbox);
      lightbox
        .querySelector(".lightbox-overlay")
        .addEventListener("click", function (e) {
          if (e.target === this) closeLightbox();
        });

      // Download button
      lightbox
        .querySelector(".lightbox-download")
        .addEventListener("click", function () {
          downloadImage(imgSrc, label);
        });

      // Keyboard navigation
      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") closeLightbox();
      });
    }

    // Set image and label
    lightbox.querySelector(".lightbox-image").src = imgSrc;
    lightbox.querySelector(".lightbox-label").textContent = label;

    // Show lightbox with animation
    lightbox.style.display = "block";
    gsap.from(lightbox.querySelector(".lightbox-content"), {
      scale: 0.8,
      opacity: 0,
      duration: 0.4,
      ease: "power2.out",
    });
  }

  function closeLightbox() {
    const lightbox = document.getElementById("certificate-lightbox");
    if (lightbox) {
      gsap.to(lightbox.querySelector(".lightbox-content"), {
        scale: 0.8,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          lightbox.style.display = "none";
        },
      });
    }
  }

  function downloadImage(src, filename) {
    const link = document.createElement("a");
    link.href = src;
    link.download = filename.replace(/\s+/g, "-") + ".png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showNotification("Certificate download started!", "success");
  }

  // ==========================================
  // NOTIFICATION SYSTEM
  // ==========================================

  function showNotification(message, type = "info") {
    // Remove existing notification
    const existingNotif = document.querySelector(".company-notification");
    if (existingNotif) existingNotif.remove();

    // Create notification
    const notification = document.createElement("div");
    notification.className = `company-notification ${type}`;
    notification.innerHTML = `
      <i class="fa-solid fa-${
        type === "success"
          ? "check-circle"
          : type === "warning"
          ? "exclamation-circle"
          : "info-circle"
      }"></i>
      <span>${message}</span>
    `;

    document.body.appendChild(notification);

    // Animate in
    gsap.from(notification, {
      y: -100,
      opacity: 0,
      duration: 0.5,
      ease: "back.out(1.7)",
    });

    // Auto remove after 3 seconds
    setTimeout(() => {
      gsap.to(notification, {
        y: -100,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => notification.remove(),
      });
    }, 3000);
  }

  // ==========================================
  // INTERACTIVE HOVER EFFECTS
  // ==========================================

  // Info cards parallax effect
  const infoCards = document.querySelectorAll(".info-card");

  infoCards.forEach((card) => {
    card.addEventListener("mousemove", function (e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;

      gsap.to(this, {
        rotationX: rotateX,
        rotationY: rotateY,
        duration: 0.3,
        ease: "power2.out",
        transformPerspective: 1000,
      });
    });

    card.addEventListener("mouseleave", function () {
      gsap.to(this, {
        rotationX: 0,
        rotationY: 0,
        duration: 0.5,
        ease: "power2.out",
      });
    });
  });

  // Certification badges pulse effect
  const certBadges = document.querySelectorAll(".cert-badge");

  certBadges.forEach((badge) => {
    badge.addEventListener("mouseenter", function () {
      gsap.to(this, {
        scale: 1.1,
        duration: 0.3,
        ease: "back.out(1.7)",
      });
    });

    badge.addEventListener("mouseleave", function () {
      gsap.to(this, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    });
  });

  // ==========================================
  // LIGHTBOX STYLES
  // ==========================================

  function addLightboxStyles() {
    if (document.getElementById("lightbox-styles")) return;

    const style = document.createElement("style");
    style.id = "lightbox-styles";
    style.textContent = `
      #certificate-lightbox {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10000;
      }
      
      .lightbox-overlay {
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.95);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
      }
      
      .lightbox-content {
        position: relative;
        max-width: 900px;
        width: 100%;
        background: var(--background-color);
        border: 2px solid var(--primary-color);
        border-radius: 20px;
        padding: 30px;
      }
      
      .lightbox-close {
        position: absolute;
        top: 15px;
        right: 15px;
        width: 40px;
        height: 40px;
        background: var(--primary-color);
        border: none;
        border-radius: 50%;
        color: white;
        font-size: 20px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
        z-index: 10;
      }
      
      .lightbox-close:hover {
        transform: rotate(90deg);
        background: #c99a1f;
      }
      
      .lightbox-image-container {
        width: 100%;
        max-height: 70vh;
        overflow: hidden;
        border-radius: 10px;
        margin-bottom: 20px;
      }
      
      .lightbox-image {
        width: 100%;
        height: auto;
        display: block;
        border-radius: 10px;
      }
      
      .lightbox-label {
        font-family: var(--font-popin);
        font-size: 18px;
        color: white;
        text-align: center;
        margin-bottom: 20px;
        font-weight: 600;
      }
      
      .lightbox-controls {
        display: flex;
        justify-content: center;
        gap: 15px;
      }
      
      .lightbox-download {
        display: flex;
        align-items: center;
        gap: 10px;
        background: linear-gradient(135deg, var(--primary-color), #c99a1f);
        color: white;
        font-family: var(--font-popin);
        font-size: 16px;
        font-weight: 600;
        padding: 12px 30px;
        border: none;
        border-radius: 50px;
        cursor: pointer;
        transition: all 0.3s ease;
      }
      
      .lightbox-download:hover {
        transform: translateY(-3px);
        box-shadow: 0 10px 30px rgba(218, 165, 32, 0.5);
      }
      
      .company-notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--background-color);
        border: 2px solid var(--primary-color);
        border-radius: 10px;
        padding: 15px 25px;
        display: flex;
        align-items: center;
        gap: 12px;
        z-index: 10001;
        font-family: var(--font-popin);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
      }
      
      .company-notification i {
        font-size: 20px;
        color: var(--primary-color);
      }
      
      .company-notification span {
        color: white;
        font-size: 14px;
        font-weight: 500;
      }
      
      .company-notification.success {
        border-color: #4caf50;
      }
      
      .company-notification.success i {
        color: #4caf50;
      }
      
      .company-notification.warning {
        border-color: #ff9800;
      }
      
      .company-notification.warning i {
        color: #ff9800;
      }
      
      @media screen and (max-width: 768px) {
        .lightbox-content {
          padding: 20px;
        }
        
        .lightbox-image-container {
          max-height: 60vh;
        }
        
        .company-notification {
          top: 10px;
          right: 10px;
          left: 10px;
          padding: 12px 20px;
        }
      }
    `;

    document.head.appendChild(style);
  }

  // ==========================================
  // SMOOTH SCROLL TO SECTION
  // ==========================================

  const companyLinks = document.querySelectorAll('a[href="#company"]');

  companyLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const companySection = document.getElementById("company");
      if (companySection) {
        companySection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  console.log("✅ Company Section JavaScript Loaded Successfully!");
});

// ==========================================
// ADDITIONAL UTILITY FUNCTIONS
// ==========================================

// Counter animation for numbers (if needed)
function animateCounter(element, target, duration = 2000) {
  const start = 0;
  const increment = target / (duration / 16);
  let current = start;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current);
    }
  }, 16);
}

// Lazy load images
if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        const src = img.getAttribute("data-src");
        if (src) {
          img.src = src;
          img.removeAttribute("data-src");
        }
        observer.unobserve(img);
      }
    });
  });

  document.querySelectorAll("img[data-src]").forEach((img) => {
    imageObserver.observe(img);
  });
}
//////////////////////////////////////////////// contact//////////////////////////////////////////////
// ==========================================
// CONTACT SECTION - GSAP ANIMATIONS & FUNCTIONALITY
// ==========================================

document.addEventListener("DOMContentLoaded", function () {
  // ==========================================
  // GSAP REVEAL ANIMATIONS (WITHOUT SCROLL TRIGGER)
  // ==========================================

  // Set initial states for all animated elements
  gsap.set(".contact-header", { opacity: 0, y: -50 });
  gsap.set(".contact-info", { opacity: 0, x: -60 });
  gsap.set(".contact-form-wrapper", { opacity: 0, x: 60 });
  gsap.set(".contact-card", { opacity: 0, y: 30 });
  gsap.set(".social-link", { opacity: 0, scale: 0 });
  gsap.set(".form-group", { opacity: 0, y: 20 });
  gsap.set(".submit-btn", { opacity: 0, scale: 0.8 });
  gsap.set(".contact-decorative-circle", { scale: 0, opacity: 0 });
  gsap.set(".contact-decorative-line", { scaleX: 0, scaleY: 0 });

  // Create IntersectionObserver for reveal animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
  };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const target = entry.target;

        // Header Animation
        if (target.classList.contains("contact-header")) {
          gsap.to(target, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
          });
        }

        // Contact Info Animation
        if (target.classList.contains("contact-info")) {
          gsap.to(target, {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: "power3.out",
          });

          // Stagger contact cards
          gsap.to(".contact-card", {
            opacity: 1,
            y: 0,
            stagger: 0.15,
            duration: 0.6,
            ease: "power2.out",
            delay: 0.3,
          });

          // Social links animation
          gsap.to(".social-link", {
            opacity: 1,
            scale: 1,
            stagger: 0.1,
            duration: 0.5,
            ease: "back.out(1.7)",
            delay: 0.8,
          });
        }

        // Contact Form Animation
        if (target.classList.contains("contact-form-wrapper")) {
          gsap.to(target, {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: "power3.out",
          });

          // Form groups stagger
          gsap.to(".form-group", {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.5,
            ease: "power2.out",
            delay: 0.3,
          });

          // Submit button
          gsap.to(".submit-btn", {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            ease: "back.out(1.7)",
            delay: 1,
          });
        }

        // Decorative elements
        if (target.classList.contains("contact")) {
          gsap.to(".contact-decorative-circle", {
            scale: 1,
            opacity: 0.05,
            stagger: 0.3,
            duration: 1.5,
            ease: "elastic.out(1, 0.5)",
          });

          gsap.to(".contact-decorative-line", {
            scaleX: 1,
            scaleY: 1,
            stagger: 0.2,
            duration: 1,
            ease: "power2.out",
          });
        }

        // Unobserve after animation
        revealObserver.unobserve(target);
      }
    });
  }, observerOptions);

  // Observe all elements that should animate
  const elementsToObserve = [
    document.querySelector(".contact"),
    document.querySelector(".contact-header"),
    document.querySelector(".contact-info"),
    document.querySelector(".contact-form-wrapper"),
  ];

  elementsToObserve.forEach((el) => {
    if (el) revealObserver.observe(el);
  });

  // ==========================================
  // FORM VALIDATION & SUBMISSION
  // ==========================================

  const contactForm = document.getElementById("contactForm");
  const formStatus = document.getElementById("formStatus");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form data
      const formData = {
        fullName: document.getElementById("fullName").value,
        email: document.getElementById("email").value,
        company: document.getElementById("company").value,
        service: document.getElementById("service").value,
        message: document.getElementById("message").value,
      };

      // Validate form
      if (!validateForm(formData)) {
        return;
      }

      // Show loading state
      showLoadingState();

      // Simulate form submission (replace with actual API call)
      setTimeout(() => {
        // Success
        showFormStatus(
          "success",
          "Thank you! Your message has been sent successfully. We'll get back to you soon."
        );
        contactForm.reset();

        // Reset button state
        resetButtonState();

        // Hide status after 5 seconds
        setTimeout(() => {
          hideFormStatus();
        }, 5000);
      }, 2000);
    });
  }

  // ==========================================
  // FORM VALIDATION
  // ==========================================

  function validateForm(data) {
    // Full Name validation
    if (data.fullName.trim().length < 2) {
      showFormStatus("error", "Please enter your full name.");
      return false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      showFormStatus("error", "Please enter a valid email address.");
      return false;
    }

    // Message validation
    if (data.message.trim().length < 10) {
      showFormStatus(
        "error",
        "Please enter a message with at least 10 characters."
      );
      return false;
    }

    return true;
  }

  // ==========================================
  // FORM STATUS MESSAGES
  // ==========================================

  function showFormStatus(type, message) {
    formStatus.className = `form-status show ${type}`;
    formStatus.innerHTML = `
      <i class="fa-solid fa-${
        type === "success" ? "check-circle" : "exclamation-circle"
      }"></i>
      <span>${message}</span>
    `;

    // Animate in
    gsap.from(formStatus, {
      opacity: 0,
      y: -20,
      duration: 0.5,
      ease: "back.out(1.7)",
    });
  }

  function hideFormStatus() {
    gsap.to(formStatus, {
      opacity: 0,
      y: -20,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        formStatus.classList.remove("show");
      },
    });
  }

  // ==========================================
  // BUTTON LOADING STATE
  // ==========================================

  function showLoadingState() {
    const submitBtn = document.querySelector(".submit-btn");
    const btnText = submitBtn.querySelector(".btn-text");
    const btnIcon = submitBtn.querySelector(".btn-icon");

    submitBtn.disabled = true;
    btnText.textContent = "Sending...";
    btnIcon.className = "fa-solid fa-spinner fa-spin btn-icon";

    gsap.to(submitBtn, {
      scale: 0.98,
      duration: 0.2,
    });
  }

  function resetButtonState() {
    const submitBtn = document.querySelector(".submit-btn");
    const btnText = submitBtn.querySelector(".btn-text");
    const btnIcon = submitBtn.querySelector(".btn-icon");

    submitBtn.disabled = false;
    btnText.textContent = "Send Message";
    btnIcon.className = "fa-solid fa-paper-plane btn-icon";

    gsap.to(submitBtn, {
      scale: 1,
      duration: 0.3,
      ease: "back.out(1.7)",
    });
  }

  // ==========================================
  // INPUT ANIMATIONS
  // ==========================================

  const formInputs = document.querySelectorAll(
    ".form-input, .form-select, .form-textarea"
  );

  formInputs.forEach((input) => {
    // Focus animation
    input.addEventListener("focus", function () {
      const wrapper = this.closest(".input-wrapper");
      gsap.to(wrapper, {
        scale: 1.02,
        duration: 0.3,
        ease: "power2.out",
      });
    });

    // Blur animation
    input.addEventListener("blur", function () {
      const wrapper = this.closest(".input-wrapper");
      gsap.to(wrapper, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    });

    // Input validation on blur
    input.addEventListener("blur", function () {
      if (this.hasAttribute("required") && this.value.trim() === "") {
        this.style.borderColor = "#f44336";
        gsap.to(this, {
          x: [-5, 5, -5, 5, 0],
          duration: 0.4,
          ease: "power2.inOut",
        });
      } else {
        this.style.borderColor = "";
      }
    });
  });

  // ==========================================
  // CONTACT CARD INTERACTIONS
  // ==========================================

  const contactCards = document.querySelectorAll(".contact-card");

  contactCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      const icon = this.querySelector(".contact-card-icon");
      gsap.to(icon, {
        rotation: 360,
        duration: 0.6,
        ease: "power2.out",
      });
    });

    // Click to copy functionality
    card.addEventListener("click", function () {
      const link = this.querySelector(".contact-link");
      if (link) {
        const text = link.textContent.trim();
        copyToClipboard(text);
        showCopyNotification(this);
      }
    });
  });

  // ==========================================
  // COPY TO CLIPBOARD
  // ==========================================

  function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(
        function () {
          console.log("Copied to clipboard: " + text);
        },
        function (err) {
          console.error("Could not copy text: ", err);
        }
      );
    } else {
      // Fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand("copy");
        console.log("Copied to clipboard: " + text);
      } catch (err) {
        console.error("Could not copy text: ", err);
      }
      document.body.removeChild(textarea);
    }
  }

  function showCopyNotification(element) {
    // Create notification
    const notification = document.createElement("div");
    notification.className = "copy-notification";
    notification.innerHTML = '<i class="fa-solid fa-check"></i> Copied!';
    element.appendChild(notification);

    // Animate in
    gsap.fromTo(
      notification,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.3, ease: "back.out(1.7)" }
    );

    // Remove after 2 seconds
    setTimeout(() => {
      gsap.to(notification, {
        opacity: 0,
        y: -10,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => notification.remove(),
      });
    }, 2000);
  }

  // ==========================================
  // SOCIAL LINKS ANIMATIONS
  // ==========================================

  const socialLinks = document.querySelectorAll(".social-link");

  socialLinks.forEach((link) => {
    link.addEventListener("mouseenter", function () {
      gsap.to(this, {
        scale: 1.2,
        rotation: 360,
        duration: 0.5,
        ease: "back.out(1.7)",
      });
    });

    link.addEventListener("mouseleave", function () {
      gsap.to(this, {
        scale: 1,
        rotation: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    });
  });

  // ==========================================
  // INFO ICON CONTINUOUS ROTATION
  // ==========================================

  const infoIconMain = document.querySelector(".info-icon-main");
  if (infoIconMain) {
    gsap.to(infoIconMain, {
      rotation: 360,
      duration: 20,
      ease: "none",
      repeat: -1,
    });
  }

  // ==========================================
  // FORM ICON PULSE ANIMATION
  // ==========================================

  const formIcon = document.querySelector(".form-icon");
  if (formIcon) {
    gsap.to(formIcon, {
      scale: 1.1,
      duration: 1.5,
      ease: "power1.inOut",
      yoyo: true,
      repeat: -1,
    });
  }

  // ==========================================
  // SMOOTH SCROLL TO SECTION
  // ==========================================

  const contactLinks = document.querySelectorAll('a[href="#contact"]');

  contactLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  // ==========================================
  // CHARACTER COUNT FOR TEXTAREA (OPTIONAL)
  // ==========================================

  const messageTextarea = document.getElementById("message");
  if (messageTextarea) {
    const maxLength = 500;

    // Create character counter
    const counter = document.createElement("div");
    counter.className = "character-counter";
    counter.textContent = `0 / ${maxLength}`;
    messageTextarea.parentElement.appendChild(counter);

    messageTextarea.addEventListener("input", function () {
      const length = this.value.length;
      counter.textContent = `${length} / ${maxLength}`;

      if (length > maxLength) {
        counter.style.color = "#f44336";
      } else {
        counter.style.color = "#bbb";
      }
    });
  }

  // ==========================================
  // PARALLAX EFFECT ON MOUSE MOVE
  // ==========================================

  const contactSection = document.querySelector(".contact");
  const decorativeElements = document.querySelectorAll(
    ".contact-decorative-circle, .contact-decorative-line"
  );

  if (contactSection && window.innerWidth > 992) {
    contactSection.addEventListener("mousemove", function (e) {
      const rect = this.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;

      decorativeElements.forEach((element, index) => {
        const speed = (index + 1) * 10;
        const xMove = (x - 0.5) * speed;
        const yMove = (y - 0.5) * speed;

        gsap.to(element, {
          x: xMove,
          y: yMove,
          duration: 0.5,
          ease: "power2.out",
        });
      });
    });

    contactSection.addEventListener("mouseleave", function () {
      decorativeElements.forEach((element) => {
        gsap.to(element, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
        });
      });
    });
  }

  console.log("✅ Contact Section JavaScript Loaded Successfully!");
});

// ==========================================
// ADDITIONAL STYLES FOR DYNAMIC ELEMENTS
// ==========================================

// Add dynamic styles for copy notification
const style = document.createElement("style");
style.textContent = `
  .copy-notification {
    position: absolute;
    top: 50%;
    right: 20px;
    transform: translateY(-50%);
    background: var(--primary-color);
    color: white;
    padding: 8px 15px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 6px;
    pointer-events: none;
    z-index: 10;
  }

  .character-counter {
    position: absolute;
    bottom: 10px;
    right: 15px;
    font-size: 12px;
    color: #bbb;
    font-family: var(--font-popin);
    pointer-events: none;
  }
`;
document.head.appendChild(style);
// /////////////contact/////////////////////
