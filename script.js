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
        image: 'Weather Market Analyzer.png',
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
    'ecommster': {
        title: 'Ecommster - E-Commerce Platform',
        image: 'https://picsum.photos/600/400?random=2',
        description: 'A modern full-stack e-commerce platform built with Next.js and TypeScript. Features a complete shopping experience with product catalog, cart management, user authentication, and order processing. Built with scalability and performance in mind.',
        technologies: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma', 'Fastify', 'React'],
        features: [
            'Modern TypeScript-based architecture',
            'Responsive product catalog with filtering',
            'Shopping cart and checkout functionality',
            'User authentication and profile management',
            'Order history and tracking',
            'Admin dashboard for product management',
            'High-performance backend with Fastify'
        ],
        liveLink: 'https://billyndroid.github.io/ecommster/',
        githubLink: 'https://github.com/billyndroid/ecommster'
    },
    'cook-me-fresh': {
        title: 'Cook Me Fresh - Cooking Service',
        image: 'https://picsum.photos/600/400?random=3',
        description: 'A professional website for a cooking service business offering personalized meal planning, cooking classes, and food demonstrations. Features service descriptions, testimonials, and contact functionality for small business needs.',
        technologies: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design', 'Bootstrap'],
        features: [
            'Professional service presentation',
            'Detailed service offerings and pricing',
            'Client testimonials and reviews',
            'Contact forms and booking system',
            'Mobile-friendly responsive design',
            'SEO-optimized content structure',
            'Gallery showcasing cooking expertise'
        ],
        liveLink: 'https://billyndroid.github.io/cook-me-fresh/',
        githubLink: 'https://github.com/billyndroid/cook-me-fresh'
    },
    'premier-mobile': {
        title: 'Premier Mobile Car Care',
        image: 'https://picsum.photos/600/400?random=4',
        description: 'A comprehensive website for a mobile car detailing service. Features detailed service matrix, pricing information, booking system, and customer testimonials. Designed to showcase professional car care services.',
        technologies: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap', 'Responsive Design'],
        features: [
            'Detailed service matrix and pricing',
            'Professional service descriptions',
            'Customer testimonials and reviews',
            'Mobile-optimized booking interface',
            'Service comparison tables',
            'Location-based service information',
            'Professional branding and design'
        ],
        liveLink: 'https://billyndroid.github.io/premier-mobile-car-care/',
        githubLink: 'https://github.com/billyndroid/premier-mobile-car-care'
    },
    'stageready': {
        title: 'StageReady Guitar Studio',
        image: 'https://picsum.photos/600/400?random=5',
        description: 'A music education website for guitar lessons featuring lesson programs, instructor profiles, student testimonials, and booking functionality. Designed to attract students and showcase teaching expertise.',
        technologies: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design', 'Modern UI'],
        features: [
            'Comprehensive lesson program descriptions',
            'Instructor profile and credentials',
            'Student testimonials and success stories',
            'Flexible lesson scheduling system',
            'Multiple lesson types and pricing',
            'Professional music education branding',
            'Mobile-friendly interface for students'
        ],
        liveLink: 'https://billyndroid.github.io/lander2/',
        githubLink: 'https://github.com/billyndroid/lander2'
    },
    'endeavour': {
        title: 'Endeavour - Outdoor Adventures',
        image: 'Landing Page Example - Parallax Effect full.png',
        description: 'A beautiful website for an outdoor adventure company featuring hiking, climbing, and camping experiences. Showcases adventure packages, gear recommendations, and contact information with stunning photography.',
        technologies: ['HTML5', 'CSS3', 'JavaScript', 'Photography', 'Responsive Design'],
        features: [
            'Beautiful outdoor photography showcase',
            'Adventure activity descriptions',
            'Gear recommendations and guides',
            'Contact and booking information',
            'Responsive design for outdoor enthusiasts',
            'Professional outdoor industry branding',
            'Location and experience details'
        ],
        liveLink: 'https://billyndroid.github.io/landing-page-3/',
        githubLink: 'https://github.com/billyndroid/landing-page-3'
    },
    'new-potential': {
        title: 'New Potential - Digital Marketing',
        image: 'https://picsum.photos/600/400?random=7',
        description: 'A modern digital marketing agency website featuring team profiles, service offerings, and company vision. Designed to attract businesses looking for online marketing solutions with professional animations and layouts.',
        technologies: ['HTML5', 'CSS3', 'JavaScript', 'Animations', 'Modern UI'],
        features: [
            'Professional team member profiles',
            'Service offerings and capabilities',
            'Company mission and vision presentation',
            'Modern animations and interactions',
            'Business-focused design approach',
            'Lead generation contact forms',
            'Responsive design for business clients'
        ],
        liveLink: 'https://billyndroid.github.io/landing-page-2/',
        githubLink: 'https://github.com/billyndroid/landing-page-2'
    },
    'business-landers': {
        title: 'Business Landing Pages Collection',
        image: 'https://picsum.photos/600/400?random=8',
        description: 'A collection of modern, responsive business landing pages showcasing various design approaches and layouts. Features professional business templates suitable for different industries and business types.',
        technologies: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap', 'Responsive Design'],
        features: [
            'Multiple business template designs',
            'Cross-browser compatibility',
            'Mobile-first responsive approach',
            'Professional business branding',
            'Optimized performance and loading',
            'SEO-friendly structure',
            'Easy customization and deployment'
        ],
        liveLink: 'https://billyndroid.github.io/lander/',
        githubLink: 'https://github.com/billyndroid/lander'
    },
    'dashboard': {
        title: 'Financial Trading Dashboard',
        image: 'https://picsum.photos/600/400?random=9',
        description: 'A comprehensive financial trading dashboard with real-time data visualization, market indices, and portfolio management. Features interactive charts, market updates, and trading analytics for financial professionals.',
        technologies: ['HTML5', 'CSS3', 'JavaScript', 'Chart.js', 'Data Visualization'],
        features: [
            'Real-time market data display',
            'Interactive financial charts and graphs',
            'Portfolio position tracking',
            'Market indices and commodities data',
            'Professional trading interface',
            'Responsive design for mobile trading',
            'Data visualization and analytics'
        ],
        liveLink: 'https://billyndroid.github.io/dashboard-example/',
        githubLink: 'https://github.com/billyndroid/dashboard-example'
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