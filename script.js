document.addEventListener('DOMContentLoaded', () => {
    const typedText = document.getElementById('typed-text');
    const cursor = document.querySelector('.cursor');
    const words = ['Data Scientist', 'Coder', 'Fast Learner', 'Creative Thinker', 'ML Engineer', 'Team Player', 'Active Listener', 'Leader', 'Effective Communicator'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentWord = words[wordIndex];
        if (isDeleting) {
            typedText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            if (charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
            }
        } else {
            typedText.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            if (charIndex === currentWord.length) {
                isDeleting = true;
            }
        }
        setTimeout(type, isDeleting ? 100 : 200);
    }

    setTimeout(type, 500);

    function toggleDarkMode() {
        document.body.classList.toggle('dark-mode');
        document.querySelector('header').classList.toggle('dark-mode');
        document.querySelector('main').classList.toggle('dark-mode');
        document.querySelector('#about-section').classList.toggle('dark-mode');
        document.querySelectorAll('nav a').forEach(link => link.classList.toggle('dark-mode'));
    
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('darkMode', 'enabled');
        } else {
            localStorage.setItem('darkMode', 'disabled');
        }
    }
    
    // Check the saved dark mode state on page load
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
        document.querySelector('header').classList.add('dark-mode');
        document.querySelector('main').classList.add('dark-mode');
        document.querySelector('#about-section').classList.add('dark-mode');
        document.querySelectorAll('nav a').forEach(link => link.classList.add('dark-mode'));
    }
    
    // Attach the toggleDarkMode function to the button
    const darkModeButton = document.querySelector('.dark-mode-button');
    if (darkModeButton) {
        darkModeButton.addEventListener('click', toggleDarkMode);
    }
    
});

document.getElementById("contact-form").addEventListener("submit", async function(event) {
    event.preventDefault(); // Prevent default form submission
  
    let form = this;
    let formData = new FormData(form);
    let messageBox = document.getElementById("form-message");
  
    try {
      let response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });
  
      let data = await response.json();
  
      if (data.success) {
        messageBox.style.display = "block";
        messageBox.innerHTML = "✅ Your message has been sent successfully!<br>Thank you! We will reply to you within 2-3 working days.";
        messageBox.style.color = "green";
  
        // Clear form fields
        form.reset();
  
        // Hide success message after 5 seconds
        setTimeout(() => {
          messageBox.style.display = "none";
        }, 5000);
      } else {
        throw new Error(data.message || "Error submitting form. Please try again.");
      }
    } catch (error) {
      messageBox.style.display = "block";
      messageBox.innerHTML = "❌ Oops! Something went wrong. Please try again.";
      messageBox.style.color = "red";
  
      // Hide error message after 5 seconds
      setTimeout(() => {
        messageBox.style.display = "none";
      }, 5000);
    }
  });
  
  function toggleMenu() {
    const navLinks = document.querySelector(".nav-links");
    navLinks.classList.toggle("active");
  }
  