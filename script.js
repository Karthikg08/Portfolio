 function handleSubmit(event) {
            event.preventDefault();
 
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            const formMessage = document.getElementById('formMessage');
 
            // Validate form
            if (!name || !email || !subject || !message) {
                formMessage.textContent = '❌ Please fill in all fields';
                formMessage.classList.remove('success');
                formMessage.classList.add('error');
                return;
            }
 
            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                formMessage.textContent = '❌ Please enter a valid email address';
                formMessage.classList.remove('success');
                formMessage.classList.add('error');
                return;
            }
 
            // Show success message
            formMessage.textContent = '✓ Thank you! Your message has been sent successfully.';
            formMessage.classList.remove('error');
            formMessage.classList.add('success');
 
            // Reset form
            document.getElementById('contactForm').reset();
 
            // Hide message after 5 seconds
            setTimeout(() => {
                formMessage.classList.remove('success', 'error');
            }, 5000);
        }







      