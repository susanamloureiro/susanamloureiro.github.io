/**
 * Susana Loureiro Portfolio
 * JavaScript for interactive elements - Editorial Style
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all interactive elements
    initThemeToggle();
    initCustomCursor();
    initRotatingQuotes();
    initPageTransitions();
    initProjectFilters();
    initScrollAnimations();
    initContactForm();
    initPageIndicator();
    initMagazineScrollEffects();
});

/**
 * Theme Toggle Functionality
 */
function initThemeToggle() {
    const themeToggle = document.querySelector('.toggle-switch');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Check for saved theme preference or use the system preference
    const currentTheme = localStorage.getItem('theme') || 
                         (prefersDarkScheme.matches ? 'dark' : 'light');
    
    // Set the initial theme
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }
    
    // Toggle theme when switch is clicked
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        
        // Save the preference
        const theme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
        localStorage.setItem('theme', theme);
    });
}

/**
 * Custom Cursor
 */
function initCustomCursor() {
    const cursor = document.querySelector('.cursor');
    
    // Only initialize on non-touch devices
    if (window.matchMedia('(pointer: fine)').matches && cursor) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.display = 'block';
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });
        
        // Cursor effects on interactive elements
        const interactiveElements = document.querySelectorAll('a, button, input, textarea, .project-card, .certification-badge');
        
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.width = '40px';
                cursor.style.height = '40px';
                cursor.style.backgroundColor = 'rgba(212, 175, 122, 0.1)';
            });
            
            el.addEventListener('mouseleave', () => {
                cursor.style.width = '20px';
                cursor.style.height = '20px';
                cursor.style.backgroundColor = 'transparent';
            });
        });
        
        // Hide cursor when it leaves the window
        document.addEventListener('mouseleave', () => {
            cursor.style.display = 'none';
        });
        
        document.addEventListener('mouseenter', () => {
            cursor.style.display = 'block';
        });
    } else if (cursor) {
        // Hide cursor on touch devices
        cursor.style.display = 'none';
    }
}

/**
 * Rotating Quotes for Homepage
 */
function initRotatingQuotes() {
    const quoteContainer = document.querySelector('.rotating-quote');
    if (!quoteContainer) return;
    
    const quotes = [
        "Elegance is clarity in structure",
        "Design is intelligence made visible",
        "Simplicity is the ultimate sophistication",
        "The details are not the details. They make the design",
        "Good design is obvious. Great design is transparent"
    ];
    
    let currentIndex = 0;
    const quoteText = quoteContainer.querySelector('.quote-text');
    
    // Set initial quote with animation
    if (quoteText) {
        quoteText.textContent = `"${quotes[currentIndex]}"`;
        quoteText.classList.add('fade-in');
    }
    
    // Rotate quotes every 5 seconds
    setInterval(() => {
        if (quoteText) {
            // Fade out
            quoteText.classList.remove('fade-in');
            quoteText.classList.add('fade-out');
            
            setTimeout(() => {
                // Change quote
                currentIndex = (currentIndex + 1) % quotes.length;
                quoteText.textContent = `"${quotes[currentIndex]}"`;
                
                // Fade in
                quoteText.classList.remove('fade-out');
                quoteText.classList.add('fade-in');
            }, 500);
        }
    }, 5000);
}

/**
 * Page Transitions - Editorial Style
 */
function initPageTransitions() {
    const pageTransition = document.querySelector('.page-transition');
    const links = document.querySelectorAll('a[href^="index"], a[href^="about"], a[href^="projects"], a[href^="education"], a[href^="contact"], a[href^="project-"]');
    
    if (!pageTransition) return;
    
    // Animate page in on load - like turning a page in a magazine
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
        setTimeout(() => {
            pageTransition.style.transform = 'translateY(100%)';
        }, 500);
    });
    
    // Animate page transition on internal link clicks
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            // Only transition for internal links
            if (href.startsWith('http') || href.startsWith('#')) return;
            
            e.preventDefault();
            
            // Add exit class to current page content
            document.querySelector('main').classList.add('page-exit');
            
            // Animate page transition like turning a page
            pageTransition.style.transform = 'translateY(0)';
            
            // Navigate after animation completes
            setTimeout(() => {
                window.location.href = href;
            }, 800);
        });
    });
}

/**
 * Project Filters
 */
function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (filterButtons.length === 0 || projectCards.length === 0) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filter = button.getAttribute('data-filter');
            
            // Filter projects
            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

/**
 * Scroll Animations - Editorial Style
 */
function initScrollAnimations() {
    // Check if IntersectionObserver is supported
    if (!('IntersectionObserver' in window)) return;
    
    // Elements to animate with different effects
    const fadeElements = document.querySelectorAll('.project-card, .certification-badge, .timeline-item, .pull-quote, .keyword');
    const revealElements = document.querySelectorAll('.content-block, .project-description, .formal-education, .personal-insights');
    const staggerElements = document.querySelectorAll('.stagger-item');
    
    // Split text into words for text reveal animations
    const textElements = document.querySelectorAll('.split-text');
    textElements.forEach(element => {
        const text = element.textContent;
        const words = text.split(' ');
        element.innerHTML = '';
        
        words.forEach((word, index) => {
            const span = document.createElement('span');
            span.className = 'word';
            span.style.transitionDelay = `${index * 0.05}s`;
            span.textContent = word + ' ';
            element.appendChild(span);
        });
    });
    
    // Fade in observer
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Reveal observer (slide up with opacity)
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    // Staggered animation observer
    const staggerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const children = entry.target.children;
                Array.from(children).forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('stagger-in');
                    }, index * 100);
                });
                staggerObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Word-by-word text reveal observer
    const wordObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const words = entry.target.querySelectorAll('.word');
                words.forEach((word, index) => {
                    setTimeout(() => {
                        word.classList.add('word-in');
                    }, index * 50);
                });
                wordObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    });
    
    // Initialize all animations
    fadeElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.8s cubic-bezier(0.19, 1, 0.22, 1), transform 0.8s cubic-bezier(0.19, 1, 0.22, 1)';
        fadeObserver.observe(element);
    });
    
    revealElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(40px)';
        element.style.transition = 'opacity 1s cubic-bezier(0.19, 1, 0.22, 1), transform 1s cubic-bezier(0.19, 1, 0.22, 1)';
        revealObserver.observe(element);
    });
    
    staggerElements.forEach(element => {
        staggerObserver.observe(element);
    });
    
    textElements.forEach(element => {
        wordObserver.observe(element);
    });
    
    // Add the CSS for the animations
    const style = document.createElement('style');
    style.textContent = `
        .fade-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        
        .reveal {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        
        .stagger-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        
        .word {
            display: inline-block;
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.5s ease, transform 0.5s ease;
        }
        
        .word-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .fade-out {
            opacity: 0 !important;
            transition: opacity 0.5s ease;
        }
    `;
    document.head.appendChild(style);
}

/**
 * Contact Form
 */
function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = contactForm.querySelector('input[name="name"]').value;
        const email = contactForm.querySelector('input[name="email"]').value;
        const message = contactForm.querySelector('textarea[name="message"]').value;
        
        // Validate form
        let valid = true;
        let errorMessage = '';
        
        if (!name.trim()) {
            valid = false;
            errorMessage += 'Please enter your name.\n';
        }
        
        if (!email.trim() || !isValidEmail(email)) {
            valid = false;
            errorMessage += 'Please enter a valid email address.\n';
        }
        
        if (!message.trim()) {
            valid = false;
            errorMessage += 'Please enter a message.\n';
        }
        
        if (!valid) {
            showFormNotification(errorMessage, 'error');
            return;
        }
        
        // Simulate form submission
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
        
        // Simulate API call delay
        setTimeout(() => {
            // Success message
            showFormNotification('Your message has been sent. I will get back to you soon!', 'success');
            
            // Reset form
            contactForm.reset();
            
            // Reset button
            submitButton.disabled = false;
            submitButton.textContent = originalText;
        }, 1500);
    });
}

// Helper function to validate email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Helper function to show form notifications
function showFormNotification(message, type) {
    // Create notification element if it doesn't exist
    let notification = document.querySelector('.form-notification');
    
    if (!notification) {
        notification = document.createElement('div');
        notification.className = 'form-notification';
        document.querySelector('.contact-form').appendChild(notification);
    }
    
    // Set message and type
    notification.textContent = message;
    notification.className = `form-notification ${type}`;
    
    // Show notification
    notification.style.opacity = '1';
    notification.style.transform = 'translateY(0)';
    
    // Hide notification after 5 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(-10px)';
    }, 5000);
}

/**
 * Page Indicator - Shows reading progress
 */
function initPageIndicator() {
    const progressIndicator = document.querySelector('.page-progress');
    if (!progressIndicator) return;
    
    // Calculate scroll progress
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.body.offsetHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressIndicator.style.width = scrollPercent + '%';
    });
}

/**
 * Magazine-style Scroll Effects
 */
function initMagazineScrollEffects() {
    // Parallax elements
    const parallaxElements = document.querySelectorAll('.parallax');
    
    // Pull quotes that slide in from the side
    const pullQuotes = document.querySelectorAll('.pull-quote');
    
    // Images that have a slight rotation on scroll
    const rotateImages = document.querySelectorAll('.rotate-on-scroll');
    
    // Handle scroll events
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        
        // Parallax effect
        parallaxElements.forEach(element => {
            const speed = element.getAttribute('data-speed') || 0.2;
            const yPos = -(scrollTop * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
        
        // Rotate images slightly based on scroll position
        rotateImages.forEach(element => {
            const rect = element.getBoundingClientRect();
            const centerPosition = rect.top + rect.height / 2;
            const viewportCenter = window.innerHeight / 2;
            const distanceFromCenter = (centerPosition - viewportCenter) * 0.01;
            const maxRotation = 3; // Maximum rotation in degrees
            
            // Limit rotation to maxRotation degrees
            const rotation = Math.max(-maxRotation, Math.min(maxRotation, distanceFromCenter));
            
            element.style.transform = `rotate(${rotation}deg)`;
        });
    });
    
    // Turn page indicator
    const turnPageIndicator = document.querySelector('.turn-page-indicator');
    if (turnPageIndicator) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                turnPageIndicator.style.opacity = '0';
            } else {
                turnPageIndicator.style.opacity = '1';
            }
        });
    }
}

/* End of file */
