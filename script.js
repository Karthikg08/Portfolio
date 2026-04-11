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

// scroll animations //


    
    // ===== SCROLL ANIMATIONS =====
    
    
