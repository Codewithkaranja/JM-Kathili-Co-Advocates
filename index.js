document.addEventListener("DOMContentLoaded", () => {
  /* ====== VARIABLES ====== */
  const mobileMenu = document.querySelector(".mobile-menu");
  const navMenu = document.querySelector("nav ul");
  const header = document.querySelector("header");
  const heroSection = document.querySelector(".hero");
  const typewriterSpan = document.getElementById("typewriter");
  const statNumbers = document.querySelectorAll(".stat-number");
  const serviceCards = document.querySelectorAll(".service-card");
  const filterButtons = document.querySelectorAll(".filter-btn");

  const chatBody = document.getElementById("chat-body");
  const userInput = document.getElementById("user-input");
  const sendBtn = document.getElementById("send-btn");
  const closeChat = document.getElementById("close-chat");
  const whatsappBtn = document.getElementById("whatsapp-button");
  const whatsappChat = document.getElementById("whatsapp-chatbot");

  const whatsappNumber = "254723562484";

  /* ====== MOBILE MENU TOGGLE ====== */
  mobileMenu?.addEventListener("click", () => navMenu.classList.toggle("active"));

  /* ====== SMOOTH SCROLLING ====== */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", e => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute("href"));
      if (target) window.scrollTo({ top: target.offsetTop - 70, behavior: "smooth" });
      navMenu.classList.remove("active");
    });
  });

  /* ====== HEADER SCROLL EFFECT ====== */
  window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 100);
  });

  /* ====== HERO BACKGROUND SLIDER ====== */
  const bgImages = [
    "url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=2070&q=80')",
    "url('https://plus.unsplash.com/premium_photo-1695942301071-a70004b9e916?w=500&auto=format&fit=crop&q=60')",
    "url('https://plus.unsplash.com/premium_photo-1698084059393-103cb8b86253?w=500&auto=format&fit=crop&q=60')",
    "url('https://plus.unsplash.com/premium_photo-1698084059560-9a53de7b816b?auto=format&fit=crop&w=2070&q=80')",
    "url('https://plus.unsplash.com/premium_photo-1694088516778-186632fc2804?w=500&auto=format&fit=crop&q=60')",
    "url('https://images.unsplash.com/photo-1589216532372-1c2a367900d9?auto=format&fit=crop&w=2070&q=80')"
  ];
  let bgIndex = 0;
  const changeHeroBg = () => {
    heroSection.style.backgroundImage = bgImages[bgIndex];
    bgIndex = (bgIndex + 1) % bgImages.length;
  };
  changeHeroBg();
  setInterval(changeHeroBg, 5000);

  /* ====== TYPEWRITER EFFECT ====== */
  const texts = [
    "Trusted Legal Experts", "Strategic Counsel", "Strong Representation",
    "Protecting Your Business", "Your Rights, Secured", "Solutions That Deliver",
    "Confidence in Every Case", "Legal Excellence"
  ];
  let txtIndex = 0, charIndex = 0;

  const typeEffect = () => {
    if (charIndex < texts[txtIndex].length) {
      typewriterSpan.textContent += texts[txtIndex][charIndex++];
      setTimeout(typeEffect, 70);
    } else setTimeout(eraseEffect, 2000);
  };

  const eraseEffect = () => {
    if (charIndex > 0) {
      typewriterSpan.textContent = texts[txtIndex].substring(0, --charIndex);
      setTimeout(eraseEffect, 40);
    } else {
      txtIndex = (txtIndex + 1) % texts.length;
      setTimeout(typeEffect, 250);
    }
  };
  typeEffect();

  /* ====== COUNT UP STATS ====== */
  const animateCountUp = el => {
    const target = +el.dataset.target;
    let current = 0;
    const increment = target / 100;
    const update = () => {
      current += increment;
      el.textContent = current < target ? Math.ceil(current) : target + "+";
      if (current < target) requestAnimationFrame(update);
    };
    update();
  };

  let statsStarted = false;
  const statsObserver = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && !statsStarted) {
      statNumbers.forEach(animateCountUp);
      statsStarted = true;
    }
  }, { threshold: 0.5 });
  statsObserver.observe(document.querySelector(".stats"));

  /* ====== LAZY LOAD SERVICE IMAGES ====== */
  serviceCards.forEach(card => {
    const img = card.querySelector("img");
    img.loading = "lazy";
    img.classList.add("loading");
    img.addEventListener("load", () => img.classList.remove("loading"));
  });

  /* ====== 3D TILT EFFECT ON CARDS ====== */
  serviceCards.forEach(card => {
    card.addEventListener("mousemove", e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      card.style.transform = `rotateY(${x * 0.05}deg) rotateX(${-y * 0.05}deg) scale(1.03)`;
    });
    card.addEventListener("mouseleave", () => card.style.transform = "rotateY(0deg) rotateX(0deg) scale(1)");
  });

  /* ====== FILTER BUTTONS ====== */
  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      filterButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const filter = btn.dataset.filter;
      serviceCards.forEach(card => {
        if (filter === "all" || card.dataset.category === filter) {
          card.style.display = "flex";
          card.classList.add("fade-in");
        } else {
          card.style.display = "none";
          card.classList.remove("fade-in");
        }
      });
    });
  });

  /* ====== SWIPER SERVICES ====== */
  new Swiper(".services-swiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    loop: true,
    slidesPerView: "auto",
    coverflowEffect: { rotate: 30, stretch: 0, depth: 200, modifier: 1, slideShadows: true },
    autoplay: { delay: 2500, disableOnInteraction: false },
    pagination: { el: ".swiper-pagination", clickable: true },
  });

  new Swiper(".clientsSwiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    loop: true,
    coverflowEffect: { rotate: 0, stretch: 0, depth: 150, modifier: 2, slideShadows: false },
    autoplay: { delay: 2000, disableOnInteraction: false },
  });

  /* ====== CHATBOT LOGIC ====== */
  const addMessage = (msg, sender = "user") => {
    const div = document.createElement("div");
    div.className = sender === "user" ? "user-message" : "bot-message";
    div.textContent = msg;
    chatBody.appendChild(div);
    chatBody.scrollTop = chatBody.scrollHeight;
  };

  // Show chatbot
  whatsappBtn?.addEventListener("click", () => {
    whatsappChat.style.display = "flex";
  });

  // Close chatbot
  closeChat?.addEventListener("click", () => {
    whatsappChat.style.display = "none";
  });

  // Send message to WhatsApp
  sendBtn?.addEventListener("click", (e) => {
    e.preventDefault(); // prevent page refresh
    const text = userInput.value.trim();
    if (!text) return;
    addMessage(text, "user");
    userInput.value = "";
    setTimeout(() => addMessage("Click here to continue on WhatsApp.", "bot"), 500);
    setTimeout(() => {
      const waUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
      window.open(waUrl, "_blank");
    }, 1500);
  });
});
