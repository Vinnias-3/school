document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.querySelector('.preloader');
    
    window.addEventListener('load', function() {
        preloader.style.opacity = '0';
        preloader.style.visibility = 'hidden';
        
        setTimeout(function() {
            preloader.style.display = 'none';
        }, 500);
    });

    // Mobile Navigation
    const menuBtn = document.querySelector('.header__menu-btn');
    const nav = document.querySelector('.nav');
    
    menuBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        nav.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav__link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (nav.classList.contains('active')) {
                menuBtn.classList.remove('active');
                nav.classList.remove('active');
                document.body.classList.remove('no-scroll');
            }
        });
    });

    // Header scroll effect
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active navigation link based on scroll position
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Hero parallax effect
    const heroBg = document.querySelector('.hero__bg-image');
    
    if (heroBg) {
        window.addEventListener('scroll', function() {
            const scrollValue = window.scrollY;
            const parallaxSpeed = parseFloat(heroBg.getAttribute('data-parallax')) || 0.3;
            heroBg.style.transform = `translateY(${scrollValue * parallaxSpeed}px)`;
        });
    }

    // Animate stats counter
    const statsNumbers = document.querySelectorAll('.stats__number');
    
    if (statsNumbers.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const countTo = parseInt(target.getAttribute('data-count'), 10);
                    const duration = 2000;
                    const step = countTo / (duration / 16);
                    let current = 0;
                    
                    const counter = setInterval(() => {
                        current += step;
                        if (current >= countTo) {
                            clearInterval(counter);
                            current = countTo;
                        }
                        target.textContent = Math.floor(current);
                    }, 16);
                    
                    observer.unobserve(target);
                }
            });
        }, { threshold: 0.5 });
        
        statsNumbers.forEach(number => {
            observer.observe(number);
        });
    }

    // Portfolio filtering
    const portfolioFilters = document.querySelectorAll('.portfolio__filter');
    const portfolioItems = document.querySelectorAll('.portfolio__item');
    
    if (portfolioFilters.length > 0 && portfolioItems.length > 0) {
        portfolioFilters.forEach(filter => {
            filter.addEventListener('click', function() {
                // Remove active class from all filters
                portfolioFilters.forEach(f => f.classList.remove('active'));
                
                // Add active class to clicked filter
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                
                portfolioItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }

    // Portfolio lightbox
    const portfolioLightbox = document.querySelector('.portfolio-lightbox');
    const portfolioLightboxClose = document.querySelector('.portfolio-lightbox__close');
    const portfolioLightboxImage = document.getElementById('lightbox-image');
    const portfolioLightboxTitle = document.getElementById('lightbox-title');
    const portfolioLightboxCategory = document.getElementById('lightbox-category');
    const portfolioLightboxDescription = document.getElementById('lightbox-description');
    const portfolioLightboxLink = document.getElementById('lightbox-link');
    
    if (portfolioLightbox) {
        // Open lightbox when clicking on portfolio item
        portfolioItems.forEach(item => {
            item.addEventListener('click', function() {
                const imageSrc = this.querySelector('img').getAttribute('src');
                const title = this.querySelector('.portfolio__title').textContent;
                const category = this.querySelector('.portfolio__category').textContent;
                
                portfolioLightboxImage.setAttribute('src', imageSrc);
                portfolioLightboxTitle.textContent = title;
                portfolioLightboxCategory.textContent = category;
                portfolioLightboxDescription.textContent = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
                portfolioLightboxLink.setAttribute('href', '#');
                
                portfolioLightbox.classList.add('active');
                document.body.classList.add('no-scroll');
            });
        });
        
        // Close lightbox
        portfolioLightboxClose.addEventListener('click', function() {
            portfolioLightbox.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
        
        // Close lightbox when clicking outside content
        portfolioLightbox.addEventListener('click', function(e) {
            if (e.target === this) {
                portfolioLightbox.classList.remove('active');
                document.body.classList.remove('no-scroll');
            }
        });
        
        // Lightbox navigation (would need more implementation for actual prev/next functionality)
        const lightboxNavPrev = document.querySelector('.portfolio-lightbox__nav--prev');
        const lightboxNavNext = document.querySelector('.portfolio-lightbox__nav--next');
        
        lightboxNavPrev.addEventListener('click', function() {
            // Previous item logic would go here
        });
        
        lightboxNavNext.addEventListener('click', function() {
            // Next item logic would go here
        });
    }

    // Testimonials slider
    const testimonialsTrack = document.querySelector('.testimonials__track');
    const testimonialsSlides = document.querySelectorAll('.testimonial');
    const testimonialControls = document.querySelectorAll('.testimonials__control');
    const testimonialPagination = document.querySelector('.testimonials__pagination');
    
    if (testimonialsTrack && testimonialsSlides.length > 0) {
        let currentSlide = 0;
        const slideWidth = testimonialsSlides[0].offsetWidth;
        
        // Create pagination dots
        testimonialsSlides.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.type = 'button';
            dot.ariaLabel = `Go to slide ${index + 1}`;
            if (index === 0) dot.classList.add('active');
            
            dot.addEventListener('click', () => {
                goToSlide(index);
            });
            
            testimonialPagination.appendChild(dot);
        });
        
        const dots = testimonialPagination.querySelectorAll('button');
        
        // Next/previous controls
        testimonialControls.forEach(control => {
            control.addEventListener('click', function() {
                if (this.classList.contains('testimonials__control--next')) {
                    currentSlide = (currentSlide + 1) % testimonialsSlides.length;
                } else {
                    currentSlide = (currentSlide - 1 + testimonialsSlides.length) % testimonialsSlides.length;
                }
                
                goToSlide(currentSlide);
            });
        });
        
        function goToSlide(index) {
            testimonialsTrack.style.transform = `translateX(-${index * 100}%)`;
            currentSlide = index;
            
            // Update active dot
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        }
        
        // Auto-advance slides (optional)
        let slideInterval = setInterval(() => {
            currentSlide = (currentSlide + 1) % testimonialsSlides.length;
            goToSlide(currentSlide);
        }, 5000);
        
        // Pause on hover
        testimonialsTrack.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        
        testimonialsTrack.addEventListener('mouseleave', () => {
            slideInterval = setInterval(() => {
                currentSlide = (currentSlide + 1) % testimonialsSlides.length;
                goToSlide(currentSlide);
            }, 5000);
        });
    }

    // Contact form validation
    const contactForm = document.getElementById('contact-form');
    const formSuccess = document.querySelector('.contact__form-success');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const formInputs = this.querySelectorAll('.form__input');
            
            formInputs.forEach(input => {
                const errorElement = input.nextElementSibling.nextElementSibling;
                
                if (input.value.trim() === '') {
                    input.classList.add('error');
                    errorElement.textContent = 'This field is required';
                    errorElement.style.opacity = '1';
                    isValid = false;
                } else if (input.type === 'email' && !isValidEmail(input.value)) {
                    input.classList.add('error');
                    errorElement.textContent = 'Please enter a valid email';
                    errorElement.style.opacity = '1';
                    isValid = false;
                } else {
                    input.classList.remove('error');
                    errorElement.style.opacity = '0';
                }
            });
            
            if (isValid) {
                // In a real implementation, you would send the form data to a server here
                // For demo purposes, we'll just show the success message
                this.style.display = 'none';
                formSuccess.classList.add('active');
                
                // Reset form button
                const resetBtn = formSuccess.querySelector('.contact__form-success-btn');
                resetBtn.addEventListener('click', function() {
                    contactForm.style.display = 'block';
                    formSuccess.classList.remove('active');
                    contactForm.reset();
                });
            }
        });
        
        function isValidEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        }
    }

    // Back to top button
    const backToTopBtn = document.querySelector('.back-to-top');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });
        
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Intersection Observer for animations
    const animateElements = document.querySelectorAll('.service-card, .portfolio__item, .blog-card, .team__member');
    
    if (animateElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        animateElements.forEach(element => {
            observer.observe(element);
        });
    }
});