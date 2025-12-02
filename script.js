// Hero Slider Data
const slides = [
    {
        image: 'https://boze-theme.myshopify.com/cdn/shop/files/slider3-bg_2000x.jpg?v=1614355817',
        title: 'Listen differently.',
        subtitle: 'experience different.',
        description: 'Make listening to music a delightful experience make you feel like magic. Stay tuned.'
    },
    {
        image: 'https://boze-theme.myshopify.com/cdn/shop/files/slider2-bg_2000x.jpg?v=1614355816',
        title: 'Fine quality',
        subtitle: 'fine engineering',
        description: 'Headphones that make you forget everything around. Disconnect from the outer world.'
    },
    {
        image: 'https://boze-theme.myshopify.com/cdn/shop/files/slider1-bg_2000x.jpg?v=1614372408',
        title: 'Premium Sound',
        subtitle: 'Ultimate Experience',
        description: 'Headphones that make music sound like celebration and pleasant experience.'
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
if (hamburger && navLinks) {
    hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (navLinks.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
}

// Close menu when clicking on a link (except dropdown toggles)
document.querySelectorAll('.nav-links > a:not(.dropdown-toggle)').forEach(link => {
    link.addEventListener('click', () => {
        if (hamburger && navLinks) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});

// Mobile Dropdown Toggle
function initMobileDropdowns() {
    if (window.innerWidth <= 768) {
        document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
            // Remove existing listeners
            const newToggle = toggle.cloneNode(true);
            toggle.parentNode.replaceChild(newToggle, toggle);
            
            newToggle.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const navItem = newToggle.parentElement;
                
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
}

// Update mobile dropdown behavior on resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('mobile-active');
        });
        document.body.style.overflow = '';
    }
    initMobileDropdowns();
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (hamburger && navLinks) {
        if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
            
            // Close all mobile dropdowns
            document.querySelectorAll('.nav-item').forEach(item => {
                item.classList.remove('mobile-active');
            });
        }
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
    
    // Update text content for desktop and mobile
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
if (prevBtn) prevBtn.addEventListener('click', prevSlide);
if (nextBtn) nextBtn.addEventListener('click', nextSlide);

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentSlide = index;
        updateSlide(currentSlide);
        resetAutoSlide();
    });
});

// ==========================================
// PRODUCT SECTION - Mobile Auto Scroll
// ==========================================
let productAutoScrollInterval;
let currentProductPosition = 0;
function initProductAutoScroll() {
    const productsWrapper = document.querySelector('.products-wrapper');
    const productCards = document.querySelectorAll('.product-card');
    
    if (!productsWrapper || !productCards.length) return;
    
    if (window.innerWidth <= 768) {
        // Stop any existing animation
        clearInterval(productAutoScrollInterval);
        productsWrapper.style.animation = 'none';
        
        const cardWidth = productCards[0].offsetWidth + 16; // width + gap
        const totalCards = productCards.length;
        const maxPosition = totalCards; // Show 2 cards at a time, so max is total - 2
        
        productAutoScrollInterval = setInterval(() => {
            // Move by 1 product position
            currentProductPosition++;
            
            // When reached the last position, reset to first
            if (currentProductPosition > maxPosition) {
                currentProductPosition = 0;
            }
            
            // Quick smooth transition (0.6s)
            productsWrapper.style.transition = 'transform 0.6s ease-in-out';
            productsWrapper.style.transform = `translateX(-${currentProductPosition * cardWidth}px)`;
            
        }, 3000); // Slide every 3 seconds
        
    } else {
        // Desktop view - clear interval and reset
        clearInterval(productAutoScrollInterval);
        productsWrapper.style.transform = 'translateX(0)';
        productsWrapper.style.transition = 'none';
        productsWrapper.style.animation = '';
        currentProductPosition = 0;
    }
}
// Stop product scroll on touch (mobile)
const productsWrapper = document.querySelector('.products-wrapper');
if (productsWrapper) {
    productsWrapper.addEventListener('touchstart', () => {
        if (window.innerWidth <= 768) {
            clearInterval(productAutoScrollInterval);
        }
    });
    
    productsWrapper.addEventListener('touchend', () => {
        if (window.innerWidth <= 768) {
            setTimeout(() => initProductAutoScroll(), 1500);
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
        if (galleryMain && fullImageUrl) {
            galleryMain.src = fullImageUrl;
        }
    });
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
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

// Add click handlers to product buttons
document.querySelectorAll('.icon-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
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
            if (cartCountElement) {
                cartCountElement.textContent = cartCount;
            }
            
            // Add animation to cart icon
            const cartIcon = document.querySelector('.cart-icon');
            if (cartIcon) {
                cartIcon.style.animation = 'bounce 0.5s ease';
                setTimeout(() => {
                    cartIcon.style.animation = '';
                }, 500);
            }
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

function initInstagramSlider() {
    const wrapper = document.querySelector('.instagram-wrapper');
    const cards = document.querySelectorAll('.instagram-card');
    
    if (!wrapper || !cards.length) return;
    
    if (window.innerWidth <= 768) {
        // Enable horizontal scroll
        wrapper.style.display = 'flex';
        wrapper.style.overflowX = 'auto';
        wrapper.style.scrollSnapType = 'x mandatory';
        wrapper.style.webkitOverflowScrolling = 'touch';
        wrapper.style.scrollbarWidth = 'none'; // Firefox
        wrapper.style.msOverflowStyle = 'none'; // IE/Edge
        
        // Hide scrollbar for Chrome/Safari
        wrapper.style.cssText += `
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
        `;
        
        // Set each card
        cards.forEach(card => {
            card.style.minWidth = 'calc(50% - 0.5rem)';
            card.style.scrollSnapAlign = 'start';
            card.style.flexShrink = '0';
        });
        
        // Reset transform
        wrapper.style.transform = 'translateX(0)';
        wrapper.style.transition = 'none';
        
    } else {
        // Desktop view - reset all styles
        wrapper.style.display = 'grid';
        wrapper.style.overflowX = 'visible';
        wrapper.style.scrollSnapType = 'none';
        wrapper.style.transform = 'translateX(0)';
        wrapper.style.transition = 'none';
        
        cards.forEach(card => {
            card.style.minWidth = '';
            card.style.scrollSnapAlign = '';
            card.style.flexShrink = '';
        });
    }
}

// ==========================================
// SCROLL TO TOP BUTTON
// ==========================================
const scrollToTopBtn = document.getElementById('scrollToTop');

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
    animateText();
    startAutoSlide();
    initProductAutoScroll();
    initInstagramSlider();
    toggleScrollButton();
    initMobileDropdowns();
});

window.addEventListener('resize', () => {
    initProductAutoScroll();
    initInstagramSlider();
    currentProductPosition = 0; 
    currentInstagramIndex = 0;
    instagramDirection = 1;
});

// Stop sliders when page is not visible (performance optimization)
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        clearInterval(autoSlideInterval);
        clearInterval(productScrollInterval);
        clearInterval(instagramAutoSlide);
    } else {
        startAutoSlide();
        if (window.innerWidth <= 768) {
            initProductAutoScroll();
            initInstagramSlider();
        }
    }
});

// Prevent accidental navigation on swipe
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
});
