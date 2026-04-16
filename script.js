
// ===== SCROLL ANIMATION WITH INTERSECTION OBSERVER =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            
        }else {
            entry.target.classList.remove('animate-in'); // 👈 bring it back to hidden
        }
    });
}, observerOptions);


// Observe all elements with slide animation classes
document.addEventListener('DOMContentLoaded', () => {
    const slideElements = document.querySelectorAll('.slide-left, .slide-right, .slide-up, .fade-in-scale');
    slideElements.forEach(el => observer.observe(el));
});





 // ===== SOCIAL MEDIA HANDLER =====
const github = document.querySelectorAll('.js-github');

github.forEach((github) => {
     github.addEventListener('click', () => {
    window.open("https://github.com/karthikg08","_blank");
});
});

const linkedin = document.querySelectorAll('.js-linkedin');

linkedin.forEach((linkedin) => {
    linkedin.addEventListener('click', () => {
    window.open("https://www.linkedin.com/in/karthikg12/","_blank");
});
});

const instagram = document.querySelectorAll('.js-instagram');

instagram.forEach((instagram) => {
    instagram.addEventListener('click', () => {
    window.open("https://instagram.com/i.kxrthik","_blank");
});
});






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
                closeMenu();
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
    
    
