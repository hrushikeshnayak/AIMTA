document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations for elements
    initAnimations();
    
    // Initialize navigation functionality
    initNavigation();
    
    // Initialize track toggles
    initTrackToggles();
    
    // Form validation
    initFormValidation();
    
    // Smooth scrolling
    initSmoothScrolling();
});

// Initialize animations
function initAnimations() {
    const elementsToAnimate = document.querySelectorAll('.hero-content, .highlight-card, .section-title, .about-content, .track, .speaker-card');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    elementsToAnimate.forEach((element, index) => {
        // Add appropriate delay class
        if (index % 3 === 1) {
            element.classList.add('fade-in-delay-1');
        } else if (index % 3 === 2) {
            element.classList.add('fade-in-delay-2');
        } else if (index % 3 === 0 && index > 0) {
            element.classList.add('fade-in-delay-3');
        }
        
        observer.observe(element);
    });
}

// Initialize navigation
function initNavigation() {
    const header = document.getElementById('header');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');
    
    // Handle window scroll for header styling
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Update active navigation based on scroll position
        updateActiveNavLink();
    });
    
    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });
    
    // Close mobile menu when clicking a link
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });
    
    // Update active nav link on page load
    updateActiveNavLink();
}

// Update active navigation link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Initialize track toggles
function initTrackToggles() {
    const trackHeaders = document.querySelectorAll('.track-header');
    
    trackHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const trackContent = header.nextElementSibling;
            const toggleIcon = header.querySelector('.track-toggle');
            
            // Toggle active class
            trackContent.classList.toggle('active');
            toggleIcon.classList.toggle('active');
            
            // Change icon
            if (toggleIcon.classList.contains('active')) {
                toggleIcon.innerHTML = '<i class="fas fa-minus"></i>';
            } else {
                toggleIcon.innerHTML = '<i class="fas fa-plus"></i>';
            }
        });
    });
}

// Initialize form validation
function initFormValidation() {
    const registrationForm = document.getElementById('registration-form');
    const contactForm = document.getElementById('contact-form');
    
    if (registrationForm) {
        registrationForm.addEventListener('submit', function(event) {
            event.preventDefault();
            validateForm(registrationForm);
        });
    }
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            validateForm(contactForm);
        });
    }
    
    // Add input validation listeners to all required fields
    const requiredInputs = document.querySelectorAll('input[required], select[required], textarea[required]');
    requiredInputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateInput(input);
        });
        
        input.addEventListener('input', function() {
            // Clear error when user starts typing
            const errorElement = input.nextElementSibling;
            if (errorElement && errorElement.classList.contains('error-message')) {
                errorElement.textContent = '';
            }
        });
    });
}

// Validate form inputs
function validateForm(form) {
    let isValid = true;
    const requiredInputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    
    requiredInputs.forEach(input => {
        if (!validateInput(input)) {
            isValid = false;
        }
    });
    
    if (isValid) {
        // Simulate form submission
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        submitButton.disabled = true;
        submitButton.textContent = 'Submitting...';
        
        // Simulate submission delay
        setTimeout(() => {
            form.reset();
            submitButton.disabled = false;
            submitButton.textContent = originalText;
            
            // Show success message
            const formMessage = document.createElement('div');
            formMessage.className = 'form-message success';
            formMessage.textContent = 'Your submission was successful!';
            
            form.appendChild(formMessage);
            
            // Remove message after 5 seconds
            setTimeout(() => {
                formMessage.remove();
            }, 5000);
        }, 1500);
    }
}

// Validate individual input
function validateInput(input) {
    const errorElement = input.nextElementSibling;
    let errorMessage = '';
    
    // Check if the input is empty
    if (!input.value.trim()) {
        errorMessage = 'This field is required';
    } else if (input.type === 'email') {
        // Email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(input.value)) {
            errorMessage = 'Please enter a valid email address';
        }
    } else if (input.id === 'terms' && !input.checked) {
        // Checkbox validation
        errorMessage = 'You must agree to the terms and conditions';
    }
    
    // Display error message
    if (errorElement && errorElement.classList.contains('error-message')) {
        errorElement.textContent = errorMessage;
    }
    
    // Add or remove error styles
    if (errorMessage) {
        input.classList.add('error');
        return false;
    } else {
        input.classList.remove('error');
        return true;
    }
}

// Initialize smooth scrolling
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-links a, .footer-links a, .cta-button a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            // Only if the link is an internal anchor
            if (this.getAttribute('href').startsWith('#')) {
                event.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80;
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}