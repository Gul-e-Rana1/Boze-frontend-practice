// Hero Slider Data
const slides = [
    {
        image: 'https://boze-theme.myshopify.com/cdn/shop/files/slider3-bg_2000x.jpg?v=1614355817',
        title: 'Listen differently.',
        subtitle: 'experience different.',
        description: 'Make listening to music a delightful \n experience make you feel like \n magic. Stay tuned.'
    },
    {
        image: 'https://boze-theme.myshopify.com/cdn/shop/files/slider2-bg_2000x.jpg?v=1614355816',
        title: 'Fine quality',
        subtitle: 'fine engineering',
        description: 'Headphones that make you forget \n everything around. Disconnect \n from the outer world.'
    },
    {
        image: 'https://boze-theme.myshopify.com/cdn/shop/files/slider1-bg_2000x.jpg?v=1614372408',
        title: 'Premium Sound',
        subtitle: 'Ultimate Experience',
        description: 'Headphones that make music \n sound like celebration and \n pleasant experience.'
    }
];

let currentSlide = 0;
let autoSlideInterval;

// DOM Elements
const heroSection = document.querySelector('.hero-section');
const textContent = document.querySelector('.text-content');
const mobileTextBox = document.querySelector('.mobile-text-box');
const prevBtn = document.getElementById('prevSlide');
const nextBtn = document.getElementById('nextSlide');
const dots = document.querySelectorAll('.dot');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

// Hamburger Menu Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close menu when clicking on a link (except dropdown toggles)
document.querySelectorAll('.nav-links > a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Mobile Dropdown Toggle
if (window.innerWidth <= 768) {
    document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            const navItem = toggle.parentElement;
            
            // Close other dropdowns
            document.querySelectorAll('.nav-item').forEach(item => {
                if (item !== navItem) {
                    item.classList.remove('mobile-active');
                }
            });
            
            // Toggle current dropdown
            navItem.classList.toggle('mobile-active');
        });
    });
}

// Update mobile dropdown behavior on resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('mobile-active');
        });
    }
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        
        // Close all mobile dropdowns
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('mobile-active');
        });
    }
});

// Prevent dropdown from closing when clicking inside it
document.querySelectorAll('.dropdown-menu').forEach(menu => {
    menu.addEventListener('click', (e) => {
        e.stopPropagation();
    });
});

// Animate text elements
function animateText() {
    const title = document.querySelectorAll('.hero-title');
    const subtitle = document.querySelectorAll('.hero-subtitle');
    const description = document.querySelectorAll('.hero-description');
    const button = document.querySelectorAll('.cta-button');
    
    // Remove animation classes
    title.forEach(el => el.classList.remove('animate'));
    subtitle.forEach(el => el.classList.remove('animate'));
    description.forEach(el => el.classList.remove('animate'));
    button.forEach(el => el.classList.remove('animate'));
    
    // Add animation classes after a short delay
    setTimeout(() => {
        title.forEach(el => el.classList.add('animate'));
        subtitle.forEach(el => el.classList.add('animate'));
        description.forEach(el => el.classList.add('animate'));
        button.forEach(el => el.classList.add('animate'));
    }, 100);
}

// Update Slide Content
function updateSlide(index) {
    const slide = slides[index];
    
    // Update background image
    heroSection.style.backgroundImage = `url('${slide.image}')`;
    
    // Update text content for desktop
    const titleElements = document.querySelectorAll('.hero-title');
    const subtitleElements = document.querySelectorAll('.hero-subtitle');
    const descriptionElements = document.querySelectorAll('.hero-description');
    
    titleElements.forEach(el => el.textContent = slide.title);
    subtitleElements.forEach(el => el.textContent = slide.subtitle);
    descriptionElements.forEach(el => el.textContent = slide.description);
    
    // Update active dot
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
    
    // Animate text
    animateText();
}

// Next Slide
function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    updateSlide(currentSlide);
    resetAutoSlide();
}

// Previous Slide
function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateSlide(currentSlide);
    resetAutoSlide();
}

// Auto Slide
function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 5000);
}

function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
}

// Event Listeners for Slider
prevBtn.addEventListener('click', prevSlide);
nextBtn.addEventListener('click', nextSlide);

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentSlide = index;
        updateSlide(currentSlide);
        resetAutoSlide();
    });
});

// Product Slider (Mobile)
let productStartIndex = 0;
const productsWrapper = document.querySelector('.products-wrapper');
const productCards = document.querySelectorAll('.product-card');
const prevProductBtn = document.getElementById('prevProduct');
const nextProductBtn = document.getElementById('nextProduct');

function updateProductSlider() {
    if (window.innerWidth <= 768) {
        const cardWidth = productCards[0].offsetWidth + 16; // including gap
        productsWrapper.style.transform = `translateX(-${productStartIndex * cardWidth}px)`;
    } else {
        productsWrapper.style.transform = 'translateX(0)';
    }
}

if (prevProductBtn && nextProductBtn) {
    prevProductBtn.addEventListener('click', () => {
        if (productStartIndex > 0) {
            productStartIndex--;
            updateProductSlider();
        }
    });
    
    nextProductBtn.addEventListener('click', () => {
        const maxIndex = window.innerWidth <= 768 ? productCards.length - 2 : 0;
        if (productStartIndex < maxIndex) {
            productStartIndex++;
            updateProductSlider();
        }
    });
}

// Gallery Thumbs
const galleryThumbs = document.querySelectorAll('.thumb');
const galleryMain = document.getElementById('galleryMain');

galleryThumbs.forEach(thumb => {
    thumb.addEventListener('click', () => {
        // Remove active class from all thumbs
        galleryThumbs.forEach(t => t.classList.remove('active'));
        
        // Add active class to clicked thumb
        thumb.classList.add('active');
        
        // Update main image
        const fullImageUrl = thumb.getAttribute('data-full');
        galleryMain.src = fullImageUrl;
    });
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
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

// Initialize
window.addEventListener('load', () => {
    animateText();
    startAutoSlide();
    updateProductSlider();
});

window.addEventListener('resize', () => {
    updateProductSlider();
    productStartIndex = 0; // Reset on resize
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe sections
document.querySelectorAll('.info-section, .products-section, .features-section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(50px)';
    section.style.transition = 'all 0.8s ease';
    observer.observe(section);
});

// Product Card Hover Effect Enhancement
productCards.forEach(card => {
    const overlay = card.querySelector('.product-overlay');
    const mainImage = card.querySelector('.product-image.main');
    const hoverImage = card.querySelector('.product-image.hover');
    
    card.addEventListener('mouseenter', () => {
        // Add smooth transition effect
        mainImage.style.transition = 'transform 0.5s ease';
        hoverImage.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
});

// Add click handlers to product buttons
document.querySelectorAll('.icon-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const title = btn.getAttribute('title');
        
        // Add visual feedback
        btn.style.transform = 'scale(0.9)';
        setTimeout(() => {
            btn.style.transform = 'scale(1.1)';
        }, 100);
        
        console.log(`${title} clicked`);
        // Add your functionality here
    });
});

// CTA Buttons
document.querySelectorAll('.cta-button, .info-button').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Add ripple effect
        const ripple = document.createElement('span');
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255,255,255,0.6)';
        ripple.style.width = '20px';
        ripple.style.height = '20px';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s ease-out';
        
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
        
        console.log('Button clicked:', button.textContent);
    });
});

// Add ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Cart functionality
let cartCount = 0;
const cartCountElement = document.querySelector('.cart-count');

document.querySelectorAll('.info-button').forEach(button => {
    if (button.textContent.includes('Add to cart')) {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            cartCount++;
            cartCountElement.textContent = cartCount;
            
            // Add animation to cart icon
            const cartIcon = document.querySelector('.cart-icon');
            cartIcon.style.animation = 'bounce 0.5s ease';
            setTimeout(() => {
                cartIcon.style.animation = '';
            }, 500);
        });
    }
});

// Add bounce animation for cart
const cartStyle = document.createElement('style');
cartStyle.textContent = `
    @keyframes bounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
    }
`;
document.head.appendChild(cartStyle);

// ==========================================
// INSTAGRAM SECTION - Mobile Auto Slider
// ==========================================
let currentInstagramIndex = 0;
let instagramAutoSlide;

function initInstagramSlider() {
    if (window.innerWidth <= 768) {
        const wrapper = document.querySelector('.instagram-wrapper');
        const cards = document.querySelectorAll('.instagram-card');
        const totalCards = cards.length;
        
        // Clone cards for infinite loop effect
        if (!wrapper.hasAttribute('data-cloned')) {
            cards.forEach(card => {
                const clone = card.cloneNode(true);
                wrapper.appendChild(clone);
            });
            wrapper.setAttribute('data-cloned', 'true');
        }
        
        function slideInstagram() {
            currentInstagramIndex++;
            const cardWidth = cards[0].offsetWidth + 16; // width + gap
            wrapper.style.transform = `translateX(-${currentInstagramIndex * cardWidth}px)`;
            
            // Reset to start when reaching the end
            if (currentInstagramIndex >= totalCards) {
                setTimeout(() => {
                    wrapper.style.transition = 'none';
                    currentInstagramIndex = 0;
                    wrapper.style.transform = 'translateX(0)';
                    setTimeout(() => {
                        wrapper.style.transition = 'transform 0.5s ease';
                    }, 50);
                }, 500);
            }
        }
        
        // Clear existing interval
        clearInterval(instagramAutoSlide);
        
        // Start auto-slide every 3 seconds
        instagramAutoSlide = setInterval(slideInstagram, 3000);
        
    } else {
        // Desktop view - clear slider
        clearInterval(instagramAutoSlide);
        const wrapper = document.querySelector('.instagram-wrapper');
        if (wrapper) {
            wrapper.style.transform = 'translateX(0)';
        }
    }
}

// ==========================================
// SCROLL TO TOP BUTTON
// ==========================================
const scrollToTopBtn = document.getElementById('scrollToTop');
heroSection = document.querySelector('.hero-section');

// Show/hide scroll to top button
function toggleScrollButton() {
    if (!heroSection || !scrollToTopBtn) return;
    
    const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
    
    if (window.pageYOffset > heroBottom) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
}

// Scroll to top function
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Event Listeners
if (scrollToTopBtn) {
    scrollToTopBtn.addEventListener('click', scrollToTop);
}

window.addEventListener('scroll', toggleScrollButton);

// ==========================================
// INITIALIZE ON LOAD AND RESIZE
// ==========================================
window.addEventListener('load', () => {
    initInstagramSlider();
    toggleScrollButton();
});

window.addEventListener('resize', () => {
    initInstagramSlider();
});

// Stop slider when page is not visible (performance optimization)
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        clearInterval(instagramAutoSlide);
    } else {
        if (window.innerWidth <= 768) {
            initInstagramSlider();
        }
    }
});