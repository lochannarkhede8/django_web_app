document.addEventListener('DOMContentLoaded', function() {
    // Get all post cards
    const postCards = document.querySelectorAll('.post-card-wrapper');

    // Apply staggered animation to cards
    postCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.05}s`;
    });

    // Add hover interactions for cards
    postCards.forEach(card => {
        // Create subtle parallax effect on mouse move
        card.addEventListener('mousemove', function(e) {
            const cardRect = card.getBoundingClientRect();
            const cardCenterX = cardRect.left + cardRect.width / 2;
            const cardCenterY = cardRect.top + cardRect.height / 2;

            // Calculate mouse position relative to card center
            const mouseX = e.clientX - cardCenterX;
            const mouseY = e.clientY - cardCenterY;

            // Apply subtle rotation (max 2 degrees)
            const rotateX = mouseY * -0.005;
            const rotateY = mouseX * 0.005;

            // Apply transformation
            card.querySelector('.card').style.transform =
                `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
        });

        // Reset card position when mouse leaves
        card.addEventListener('mouseleave', function() {
            card.querySelector('.card').style.transform = '';
        });
    });

    // Image preview enhancements
    const imageContainers = document.querySelectorAll('.img-preview-container');
    imageContainers.forEach(container => {
        // Make overlay visible on touch for mobile devices
        container.addEventListener('touchstart', function() {
            const overlay = this.querySelector('.img-overlay');
            overlay.style.opacity = '1';
        });

        // Handle overlay hiding on touch end
        container.addEventListener('touchend', function() {
            setTimeout(() => {
                const overlay = this.querySelector('.img-overlay');
                overlay.style.opacity = '';
            }, 1500); // Hide after 1.5 seconds
        });
    });

    // File cards interaction
    const fileCards = document.querySelectorAll('.file-card');
    fileCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.classList.add('active-file-card');
            const downloadBtn = this.querySelector('.btn-outline-primary');
            if (downloadBtn) {
                downloadBtn.classList.remove('btn-outline-primary');
                downloadBtn.classList.add('btn-primary');
            }
        });

        card.addEventListener('mouseleave', function() {
            this.classList.remove('active-file-card');
            const downloadBtn = this.querySelector('.btn-primary');
            if (downloadBtn && !downloadBtn.classList.contains('btn-outline-secondary')) {
                downloadBtn.classList.remove('btn-primary');
                downloadBtn.classList.add('btn-outline-primary');
            }
        });
    });

    // Lazy loading for post images
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('.img-preview');
        images.forEach(img => {
            img.loading = 'lazy';
        });
    } else {
        // Fallback for browsers that don't support lazy loading
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
        document.body.appendChild(script);

        const images = document.querySelectorAll('.img-preview');
        images.forEach(img => {
            img.classList.add('lazyload');
            img.setAttribute('data-src', img.src);
            img.src = '';
        });
    }

    // Animation for category badges
    const badges = document.querySelectorAll('.category-badge');
    badges.forEach(badge => {
        badge.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
            this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
        });

        badge.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });

    // Initialize any additional components or animations
    function initializeComponents() {
        // Check if posts exist
        if (postCards.length === 0) {
            const emptyState = document.querySelector('.empty-state');
            if (emptyState) {
                // Add pulsing animation to empty state
                const icon = emptyState.querySelector('i');
                if (icon) {
                    setInterval(() => {
                        icon.style.transform = 'scale(1.1)';
                        setTimeout(() => {
                            icon.style.transform = 'scale(1)';
                        }, 500);
                    }, 3000);
                }
            }
        }
    }

    // Initialize all components
    initializeComponents();
});

// Add dynamic sizing based on content
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach((card, index) => {
        // Add size variation based on content length
        const content = card.querySelector('.post-content');
        const fileContainer = card.querySelector('.file-container');
        
        if (content && content.textContent.length > 200) {
            card.style.gridRow = 'span 2';
        }
        
        if (fileContainer) {
            const fileName = fileContainer.querySelector('.file-name');
            if (fileName && fileName.textContent.length > 50) {
                card.style.gridRow = 'span 2';
            }
        }
    });
});