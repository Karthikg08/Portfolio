// social links

const links = {
  github: "https://github.com/Karthikg08/",
  linkedin: "https://www.linkedin.com/in/karthikg12/",
  instagram: "https://www.instagram.com/kxrthik.11/"
};

document.getElementById("github-link").href = links.github;
document.getElementById("linkedin-link").href = links.linkedin;
document.getElementById("instagram-link").href = links.instagram;
console.log(document.getElementById("instagram-link").href)   
console.log(links.instagram)   
// ======= typo animation ======
const phrases = [
     "Front-End Developer.",
     "Creative Thinker.",
     "Problem Solver.",
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function type() {
      const current = phrases[phraseIndex];

      if (!deleting) {
        charIndex++;
        document.getElementById('output').textContent = current.slice(0, charIndex);    

        if (charIndex === current.length) {
          deleting = true;
          setTimeout(type, 1400); // pause before deleting
          return;
        }
        setTimeout(type, 80); // typing speed

      } else {
        charIndex--;
        document.getElementById('output').textContent = current.slice(0, charIndex);

        if (charIndex === 0) {
          deleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
          setTimeout(type, 300); // pause before next phrase
          return;
        }
        setTimeout(type, 40); // deleting speed (faster)
      }
    }

    
    setTimeout(type, 1500); // initial delay before starting



// ===== skill card animation =====
document.querySelectorAll(".skill-card").forEach(card => {
  card.querySelector(".skill-bar-fill").style.width = "0%";
});

function animateCard(card) {
  const pct = parseInt(card.dataset.pct);
  const bar = card.querySelector(".skill-bar-fill");
  const label = card.querySelector(".skill-pct");

  card.classList.add("visible");

  setTimeout(() => {
    bar.style.transition = "width 0.9s cubic-bezier(0.22, 1, 0.36, 1)";
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        bar.style.width = pct + "%";
      });
    });

    let start = null;
    const duration = 3000;
    function step(ts) {
      if (!start) start = ts;
      const prog = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - prog, 3);
      label.textContent = Math.round(ease * pct) + "%";
      if (prog < 1) requestAnimationFrame(step);
      else label.textContent = pct + "%";
    }
    requestAnimationFrame(step);
  }, 450);
}

const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      animateCard(e.target);
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll(".skill-card").forEach(c => io.observe(c));

// ===== SCROLL ANIMATION WITH INTERSECTION OBSERVER =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            
            // Animation only once
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);


// Observe all elements with slide animation classes
document.addEventListener('DOMContentLoaded', () => {
    const slideElements = document.querySelectorAll('.slide-left, .slide-right, .slide-up, .fade-in-scale');
    slideElements.forEach(el => observer.observe(el));
});





 // ===== SOCIAL MEDIA HANDLER =====






// ===== CONTACT FORM HANDLER =====

async function handleSubmit(event) {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
    const formMessage = document.getElementById('formMessage');
    const submitBtn = document.getElementById('submitBtn');

    // ===== VALIDATION =====
    if (!name || !email || !subject || !message) {
        showMessage('❌ Please fill in all fields', 'error');
        return;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showMessage('❌ Please enter a valid email address', 'error');
        return;
    }

    // ===== DISABLE BUTTON & SHOW LOADING =====
    submitBtn.disabled = true;
    submitBtn.textContent = '⏳ Sending...';
    showMessage('Sending your message...', 'info');

    try {
        // ===== SEND EMAIL WITH EMAILJS =====
        const response = await emailjs.send(
            "service_gydr5x9",           // Replace with your Service ID
            "template_s3364p7",           // Replace with your Template ID
            {
                from_name: name,
                from_email: email,
                to_email: "karthikig07@gmail.com",  // Your email where you want to receive messages
                subject: subject,
                message: message,
                name: name,
                email: email
            }
        )

        // ===== SUCCESS =====
        showMessage('✓ Message sent successfully! I\'ll reply soon.', 'success');
        document.getElementById('contactForm').reset();
        submitBtn.textContent = 'Send Message';
        submitBtn.disabled = false;

    } catch (error) {
        // ===== ERROR =====
        console.error('EmailJS error:', error);
        showMessage('❌ Failed to send message. Please try again.', 'error');
        submitBtn.textContent = 'Send Message';
        submitBtn.disabled = false;
    }
}

// ===== SHOW MESSAGE HELPER =====
function showMessage(text, type) {
    const formMessage = document.getElementById('formMessage');
    formMessage.textContent = text;
    formMessage.classList.remove('success', 'error', 'info');
    formMessage.classList.add(type);

    // Auto-hide after 5 seconds
    setTimeout(() => {
        formMessage.classList.remove('success', 'error', 'info');
    }, 5000);
}

// ----------------- sidebar toggle --------------/

 const menuToggle = document.getElementById('menuToggle');
        const nav = document.getElementById('sidebar');
        const navOverlay = document.getElementById('navOverlay');
        const navLinks = nav.querySelectorAll('.sba');
 
        // Toggle menu
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            nav.classList.toggle('active');
            navOverlay.classList.toggle('active');
        });
 
        // Close menu when clicking overlay
        navOverlay.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            nav.classList.remove('active');
            navOverlay.classList.remove('active');
        });
 
        // Close menu when clicking a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                nav.classList.remove('active');
                navOverlay.classList.remove('active');
            });
        });

        //Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!nav.contains(e.target) && !menuToggle.contains(e.target)) {
                menuToggle.classList.remove('active');
                nav.classList.remove('active');
                navOverlay.classList.remove('active');
            }
        });

        //Close menu when scrolling 
        document.addEventListener('scroll', () => {
            menuToggle.classList.remove('active');
            nav.classList.remove('active');
            navOverlay.classList.remove('active');
        });

        // Close menu on ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                menuToggle.classList.remove('active');
                nav.classList.remove('active');
                navOverlay.classList.remove('active');
            }
        });
    
    


        /**
 * ==========================================================================
 * PARTICLE LAYER (Canvas 2D)
 * ----------------------------------------------------------------------
 * Why canvas instead of more DOM nodes: hundreds of DOM elements each with
 * their own animation would hurt layout/paint performance. A single canvas
 * redrawn via requestAnimationFrame is far cheaper for many small dots.
 *
 * The CSS cubes above (GPU-composited transforms) handle the "big, chunky
 * 3D shape" look; this canvas handles "lots of small ambient motion" —
 * splitting the work this way keeps both layers lightweight.
 * ==========================================================================
 */
(function () {
  'use strict';
 
  // ---- Config: tweak these to customize behavior ----
  const CONFIG = {
    particleCount: 70,          // fewer particles = better performance on low-end devices
    minRadius: 0.6,
    maxRadius: 2.2,
    speed: 0.15,                // base drift speed, px per frame (multiplied per-particle)
    connectDistance: 110,       // px — draw a faint line between particles closer than this
    color: getComputedStyle(document.documentElement)
             .getPropertyValue('--particle-color').trim() || '255, 255, 255'
  };
 
  const canvas = document.getElementById('particles');
  const ctx = canvas.getContext('2d');
  const hero = canvas.closest('.hero');
 
  let particles = [];
  let width = 0, height = 0;
  let animationId = null;
 
  // Respect the same reduced-motion preference the CSS honors.
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 
  /** Resize the canvas to match its container, accounting for device pixel ratio. */
  function resize() {
    const rect = hero.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2); // cap DPR to avoid huge canvases on 4K/mobile
    width = rect.width;
    height = rect.height;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
 
  /** Create the initial particle set with randomized position, size, and velocity. */
  function createParticles() {
    particles = Array.from({ length: CONFIG.particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: CONFIG.minRadius + Math.random() * (CONFIG.maxRadius - CONFIG.minRadius),
      vx: (Math.random() - 0.5) * CONFIG.speed,
      vy: (Math.random() - 0.5) * CONFIG.speed
    }));
  }
 
  /** Advance and draw a single animation frame. */
  function draw() {
    ctx.clearRect(0, 0, width, height);
 
    // Update + draw particles
    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;
 
      // Wrap around edges instead of bouncing — keeps motion continuous and simple
      if (p.x < 0) p.x = width; else if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height; else if (p.y > height) p.y = 0;
 
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${CONFIG.color}, 0.6)`;
      ctx.fill();
    }
 
    // Draw faint connecting lines between nearby particles (cheap "network" depth effect)
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < CONFIG.connectDistance) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(${CONFIG.color}, ${0.12 * (1 - dist / CONFIG.connectDistance)})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }
 
    animationId = requestAnimationFrame(draw);
  }
 
  /** Pause the animation when the hero is off-screen (e.g. user scrolled past it). */
  function observeVisibility() {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (!animationId) draw();
        } else if (animationId) {
          cancelAnimationFrame(animationId);
          animationId = null;
        }
      });
    }, { threshold: 0 });
    io.observe(hero);
  }
 
  function init() {
    resize();
    createParticles();
 
    if (prefersReducedMotion) return; // canvas is hidden via CSS in this case too
 
    draw();
    observeVisibility();
 
    // Debounce resize so we're not rebuilding particles on every pixel of a drag-resize
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        resize();
        createParticles();
      }, 200);
    });
  }
 
  init();
})();
