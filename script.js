document.addEventListener('DOMContentLoaded', () => {
    // State
    let cartCount = 0;
    const cartItems = [];

    // DOM Elements
    const navToggle = document.querySelector('.nav-toggle');
    const navClose = document.querySelector('.nav-close');
    const navOverlay = document.querySelector('.nav-overlay');
    const navLinks = document.querySelectorAll('.nav-link');
    const cartCountEls = document.querySelectorAll('.cart-count-display');
    const addToCartBtns = document.querySelectorAll('.btn-add');
    const toast = document.getElementById('toast');
    const toastMessage = document.querySelector('.toast-message');

    // Navigation Logic
    function toggleMenu() {
        navOverlay.classList.toggle('active');
        document.body.style.overflow = navOverlay.classList.contains('active') ? 'hidden' : '';
    }

    navToggle.addEventListener('click', toggleMenu);
    navClose.addEventListener('click', toggleMenu);
    
    navLinks.forEach(link => {
        link.addEventListener('click', toggleMenu);
    });

    // Cart Logic
    function updateCartUI() {
        cartCountEls.forEach(el => {
            el.textContent = cartCount;
            // Animate counter
            el.style.transform = 'scale(1.2)';
            setTimeout(() => el.style.transform = 'scale(1)', 200);
        });
    }

    function showToast(message) {
        toastMessage.textContent = message;
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const item = e.target.dataset.item;
            const price = e.target.dataset.price;
            
            cartCount++;
            cartItems.push({ item, price });
            
            updateCartUI();
            showToast(`Added ${item} to bag`);
            
            // Button feedback
            const originalText = btn.textContent;
            btn.textContent = 'Added';
            btn.style.background = 'rgba(0, 255, 136, 0.2)';
            btn.style.color = '#00ff88';
            
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.background = '';
                btn.style.color = '';
            }, 2000);
        });
    });

    // Scroll Animations (Intersection Observer)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.product-card, .section-title, .hero-content').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });

    // Add class for animation
    const style = document.createElement('style');
    style.textContent = `
        .fade-in-up {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
});
