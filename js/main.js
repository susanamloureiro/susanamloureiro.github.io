// Main JavaScript file for portfolio website
document.addEventListener('DOMContentLoaded', () => {
    // This code will run when the DOM is fully loaded
    console.log('Portfolio website loaded successfully');
    
    // Add active class to current nav item based on URL hash
    const updateActiveNavItem = () => {
        const hash = window.location.hash || '#about';
        const navLinks = document.querySelectorAll('.navbar a');
        
        navLinks.forEach(link => {
            if (link.getAttribute('href') === hash) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    };
    
    // Initialize nav highlighting
    updateActiveNavItem();
    
    // Update on hash change
    window.addEventListener('hashchange', updateActiveNavItem);

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                window.scrollTo({
                    top: target.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Animate skill bars when they come into view
    const animateSkillBars = () => {
        const skillBars = document.querySelectorAll('.skill-level');
        
        if (skillBars.length === 0) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Get the width from the style attribute
                    const width = entry.target.style.width;
                    
                    // First set width to 0
                    entry.target.style.width = '0';
                    
                    // Then animate to the original width
                    setTimeout(() => {
                        entry.target.style.transition = 'width 1s ease-in-out';
                        entry.target.style.width = width;
                    }, 100);
                    
                    // Unobserve the element after animating
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        skillBars.forEach(bar => {
            observer.observe(bar);
        });
    };
    
    // Call animate skill bars function
    animateSkillBars();
    
    // Add animations to elements when they come into view
    const animateOnScroll = () => {
        const elementsToAnimate = document.querySelectorAll('.section');
        
        if (elementsToAnimate.length === 0) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-viewport');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        elementsToAnimate.forEach(element => {
            observer.observe(element);
        });
    };
    
    // Call animate on scroll function
    animateOnScroll();
    
    // Animate background circles
    const animateBackgroundCircles = () => {
        const circles = document.querySelectorAll('.background-circle');
        
        // Apply random subtle movements to each circle
        circles.forEach(circle => {
            // Generate random animation duration between 20 and 60 seconds
            const duration = Math.random() * 40 + 20;
            
            // Generate random X and Y movement range (small amounts)
            const xRange = Math.random() * 30 + 10; // 10 to 40 pixels
            const yRange = Math.random() * 30 + 10; // 10 to 40 pixels
            
            // Set CSS animations
            circle.style.transition = 'all 2s ease-in-out';
            
            // Create keyframe animation
            const animation = `
                @keyframes float-${circle.id} {
                    0% { transform: translate(0, 0); }
                    25% { transform: translate(${xRange}px, ${yRange}px); }
                    50% { transform: translate(${-xRange}px, ${yRange}px); }
                    75% { transform: translate(${-xRange}px, ${-yRange}px); }
                    100% { transform: translate(0, 0); }
                }
            `;
            
            // Add animation style to head
            const styleSheet = document.createElement('style');
            styleSheet.type = 'text/css';
            styleSheet.innerText = animation;
            document.head.appendChild(styleSheet);
            
            // Apply the animation to the circle
            circle.style.animation = `float-${circle.id} ${duration}s infinite ease-in-out`;
        });
    };
    
    // Call animate background circles function
    animateBackgroundCircles();
});