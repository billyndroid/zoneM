// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for in-page navigation links only
// Only attach the handler when the href points to an existing element on the page.
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    const href = anchor.getAttribute('href');
    // Skip bare '#' links or anchors that don't match any element on the page
    if (!href || href === '#' || !document.querySelector(href)) return;

    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(14, 14, 14, 0.98)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(14, 14, 14, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Portfolio Filter Functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        portfolioItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.style.display = 'block';
                item.style.animation = 'fadeIn 0.5s ease';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Testimonials Slider
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial-item');
const dots = document.querySelectorAll('.dot');

function showTestimonial(index) {
    // Hide all testimonials
    testimonials.forEach(testimonial => {
        testimonial.classList.remove('active');
    });
    
    // Remove active class from all dots
    dots.forEach(dot => {
        dot.classList.remove('active');
    });
    
    // Show current testimonial and dot
    if (testimonials[index]) {
        testimonials[index].classList.add('active');
        dots[index].classList.add('active');
    }
}

// Dot navigation for testimonials
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentTestimonial = index;
        showTestimonial(currentTestimonial);
    });
});

// Auto-advance testimonials
function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
}

// Auto-advance every 5 seconds
setInterval(nextTestimonial, 5000);

// Contact Form Handling
const contactForm = document.querySelector('.contact-form');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Basic validation
    if (!name || !email || !subject || !message) {
        alert('Please fill in all fields');
        return;
    }
    
    if (!isValidEmail(email)) {
        alert('Please enter a valid email address');
        return;
    }
    
    // Simulate form submission
    const submitButton = this.querySelector('.btn-primary');
    const originalText = submitButton.textContent;
    
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        alert('Thank you for your message! I\'ll get back to you soon.');
        this.reset();
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }, 2000);
});

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.skill-category, .service-card, .portfolio-item');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Typing animation for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing animation when page loads
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 150);
        }, 1000);
    }
});

// Skills progress animation
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        bar.style.width = progress + '%';
    });
}

// Stats counter animation
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace('+', ''));
        const increment = target / 100;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = target + '+';
                clearInterval(timer);
            } else {
                counter.textContent = Math.ceil(current) + '+';
            }
        }, 20);
    });
}

// Trigger animations when about section is visible
const aboutSection = document.querySelector('.about');
if (aboutSection) {
    const aboutObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                aboutObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    aboutObserver.observe(aboutSection);
}

// Smooth reveal animations for sections
function revealSection(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
        }
    });
}

const sectionObserver = new IntersectionObserver(revealSection, {
    threshold: 0.15
});

document.querySelectorAll('section').forEach(section => {
    section.classList.add('section-hidden');
    sectionObserver.observe(section);
});

// Add CSS for section reveals
const style = document.createElement('style');
style.textContent = `
    .section-hidden {
        opacity: 0;
        transform: translateY(50px);
        transition: opacity 0.8s ease, transform 0.8s ease;
    }
    
    .section-hidden.revealed {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);

// Parallax effect for hero background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Back to top button
const backToTopButton = document.createElement('button');
backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
backToTopButton.className = 'back-to-top';
backToTopButton.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: #6FA6A6;
    color: #0E0E0E;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
    box-shadow: 0 4px 15px rgba(111, 166, 166, 0.3);
`;

document.body.appendChild(backToTopButton);

// Show/hide back to top button
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
        backToTopButton.style.opacity = '1';
        backToTopButton.style.visibility = 'visible';
    } else {
        backToTopButton.style.opacity = '0';
        backToTopButton.style.visibility = 'hidden';
    }
});

// Scroll to top functionality
backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Preloader
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
});

console.log('Portfolio website initialized successfully!');

// Portfolio Modal Functionality
const portfolioModal = document.getElementById('portfolioModal');
const modalTitle = document.getElementById('modalTitle');
const modalImage = document.getElementById('modalImage');
const modalDescription = document.getElementById('modalDescription');
const modalTechStack = document.getElementById('modalTechStack');
const modalFeatures = document.getElementById('modalFeatures');
const modalLiveLink = document.getElementById('modalLiveLink');
const modalGithubLink = document.getElementById('modalGithubLink');
const closeModal = document.querySelector('.close');

// Project data
const projectData = {
    'make-it-rain': {
        title: 'Make It Rain - Weather/Market Analyser',
        image: 'https://via.placeholder.com/600x400/6FA6A6/ECECEC?text=Make+It+Rain+Screenshot',
        description: 'A comprehensive weather and market analysis tool that provides real-time data visualization. The application combines weather forecasting with market trend analysis to help users make informed decisions. Features interactive charts, responsive design, and real-time data updates from multiple APIs.',
        technologies: ['JavaScript', 'HTML5', 'CSS3', 'Chart.js', 'Weather API', 'Market API', 'Responsive Design'],
        features: [
            'Real-time weather data visualization',
            'Market trend analysis and charts',
            'Interactive dashboard with multiple data sources',
            'Responsive design for all devices',
            'API integration for live data feeds',
            'Custom charting and data visualization',
            'User-friendly interface with smooth animations'
        ],
        liveLink: 'https://billyndroid.github.io/make-it-rain/',
        githubLink: 'https://github.com/billyndroid/make-it-rain'
    },
    'ecommerce': {
        title: 'E-Commerce Platform',
        image: 'https://via.placeholder.com/600x400/BFAE97/0E0E0E?text=E-Commerce+Platform',
        description: 'A full-stack e-commerce solution built with modern technologies. Features include user authentication, product catalog, shopping cart, payment processing, and admin dashboard. Designed with scalability and security in mind.',
        technologies: ['React', 'Node.js', 'Express.js', 'MongoDB', 'Stripe API', 'JWT', 'Redux'],
        features: [
            'User authentication and authorization',
            'Product catalog with search and filters',
            'Shopping cart and checkout process',
            'Payment integration with Stripe',
            'Admin dashboard for inventory management',
            'Order tracking and history',
            'Responsive design for mobile commerce'
        ],
        liveLink: '#',
        githubLink: '#'
    },
    'weather-dashboard': {
        title: 'Weather Dashboard',
        image: 'https://via.placeholder.com/600x400/6FA6A6/ECECEC?text=Weather+Dashboard',
        description: 'A beautiful and intuitive weather application built with React. Provides detailed weather information including current conditions, hourly forecasts, and 7-day outlook. Features location-based weather detection and favorite cities management.',
        technologies: ['React', 'CSS3', 'OpenWeather API', 'Geolocation API', 'Local Storage'],
        features: [
            'Current weather conditions display',
            'Hourly and daily weather forecasts',
            'Location-based weather detection',
            'Search weather by city name',
            'Favorite cities management',
            'Beautiful animated weather icons',
            'Responsive mobile-first design'
        ],
        liveLink: '#',
        githubLink: '#'
    },
    'task-manager': {
        title: 'Task Management App',
        image: 'https://via.placeholder.com/600x400/BFAE97/0E0E0E?text=Task+Manager',
        description: 'A collaborative task management application with real-time updates. Built with Vue.js frontend and Node.js backend, featuring Socket.io for real-time collaboration. Includes project management, team collaboration, and progress tracking.',
        technologies: ['Vue.js', 'Express.js', 'Socket.io', 'MongoDB', 'Node.js', 'JWT'],
        features: [
            'Real-time collaborative task management',
            'Project organization and categorization',
            'Team member assignment and notifications',
            'Progress tracking with visual indicators',
            'Deadline management and reminders',
            'File attachments and comments',
            'Mobile-responsive interface'
        ],
        liveLink: '#',
        githubLink: '#'
    },
    'blog-platform': {
        title: 'Blog Platform & CMS',
        image: 'https://via.placeholder.com/600x400/6FA6A6/ECECEC?text=Blog+Platform',
        description: 'A comprehensive content management system with blog functionality. Features a rich text editor, media management, user roles, and SEO optimization. Built with Angular frontend and Django backend for robust performance.',
        technologies: ['Angular', 'Django', 'PostgreSQL', 'Redis', 'Nginx', 'AWS S3'],
        features: [
            'Rich text editor with media embedding',
            'User roles and permissions system',
            'SEO optimization and meta tag management',
            'Comment system with moderation',
            'Media library and file management',
            'Analytics dashboard for content performance',
            'Multi-language support and localization'
        ],
        liveLink: '#',
        githubLink: '#'
    }
};

// Event listeners for modal buttons
document.addEventListener('DOMContentLoaded', function() {
    const modalButtons = document.querySelectorAll('.portfolio-modal-btn');
    
    modalButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const projectId = this.getAttribute('data-project');
            openModal(projectId);
        });
    });

    // Ensure overlay external and GitHub links point to the project URLs from projectData
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach(item => {
        const modalBtn = item.querySelector('.portfolio-modal-btn');
        if (!modalBtn) return;
        const projectId = modalBtn.getAttribute('data-project');
        const project = projectData[projectId];
        if (!project) return;

        const anchors = item.querySelectorAll('.portfolio-links a');
        anchors.forEach(a => {
            const icon = a.querySelector('i');
            if (!icon) return;
            const classList = icon.className || '';
            if (classList.includes('fa-external-link-alt')) {
                a.href = project.liveLink || '#';
            }
            if (classList.includes('fa-github')) {
                a.href = project.githubLink || '#';
            }

            // Open external links in a new tab safely
            if (a.href && a.href !== '#' && (a.href.startsWith('http') || a.target === '_blank')) {
                a.target = '_blank';
                a.rel = 'noopener noreferrer';
            }
        });
    });

    // Close modal events
    closeModal.addEventListener('click', function() {
        portfolioModal.style.display = 'none';
    });

    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === portfolioModal) {
            portfolioModal.style.display = 'none';
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && portfolioModal.style.display === 'block') {
            portfolioModal.style.display = 'none';
        }
    });
});

function openModal(projectId) {
    const project = projectData[projectId];
    if (!project) return;

    // Populate modal content
    modalTitle.textContent = project.title;
    modalImage.src = project.image;
    modalImage.alt = project.title;
    modalDescription.textContent = project.description;

    // Populate tech stack
    modalTechStack.innerHTML = '';
    project.technologies.forEach(tech => {
        const techSpan = document.createElement('span');
        techSpan.className = 'tech-item';
        techSpan.textContent = tech;
        modalTechStack.appendChild(techSpan);
    });

    // Populate features
    modalFeatures.innerHTML = '';
    project.features.forEach(feature => {
        const featureLi = document.createElement('li');
        featureLi.textContent = feature;
        modalFeatures.appendChild(featureLi);
    });

    // Set links
    modalLiveLink.href = project.liveLink;
    modalGithubLink.href = project.githubLink;

    // Show modal
    portfolioModal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

// Hide body overflow when modal closes
function closePortfolioModal() {
    portfolioModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Update close functionality
closeModal.addEventListener('click', closePortfolioModal);
window.addEventListener('click', function(e) {
    if (e.target === portfolioModal) {
        closePortfolioModal();
    }
});
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && portfolioModal.style.display === 'block') {
        closePortfolioModal();
    }
});