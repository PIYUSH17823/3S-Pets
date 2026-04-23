// js/loader.js
async function loadComponent(slotId, fileName) {
    const slot = document.getElementById(slotId);
    if (!slot) return; // Silent return if slot doesn't exist on this page

    try {
        const response = await fetch(`./components/${fileName}`);
        if (!response.ok) throw new Error(`Missing: components/${fileName}`);
        const html = await response.text();
        slot.innerHTML = html;
        console.log(`Loaded: ${fileName}`);
    } catch (err) {
        console.error("Loader Error:", err);
    }
}

async function preloadImages() {
    const criticalAssets = [
        'assets/logo/logo-gold.png',
        'assets/hero/hero-dog.png',
        'assets/hero/hero-cat.png',
        'assets/hero/hero-dog-2.png',
        'assets/hero/hero-dog-3.png',
        'assets/shampoo/dry-bath.png',
        'assets/shampoo/oatmeal-silk.png',
        'assets/shampoo/4 in 1 copy.png'
    ];

    const promises = criticalAssets.map(src => {
        return new Promise((resolve) => {
            const img = new Image();
            img.src = src;
            img.onload = resolve;
            img.onerror = resolve; // Continue even if one fails
        });
    });

    return Promise.all(promises);
}

async function initSite() {
    const preloader = document.getElementById('preloader');
    const bar = document.getElementById('preloader-bar');

    try {
        if (bar) bar.style.width = '10%';

        // Concurrent execution: Components + Critical Images
        await Promise.all([
            loadComponent('navbar-slot', 'navbar.html'),
            loadComponent('hero-slot', 'hero.html'),
            loadComponent('catalog-slot', 'catalog.html'),
            loadComponent('story-slot', 'story.html'),
            loadComponent('reviews-slot', 'reviews.html'),
            loadComponent('contact-slot', 'contact.html'),
            loadComponent('footer-slot', 'footer.html'),
            loadComponent('modal-container', 'admin.html'),
            preloadImages() // New: Wait for images too
        ]);

        if (bar) bar.style.width = '80%';
        console.log("DOM and Critical Assets ready.");
        
        if (typeof renderAll === "function") {
            await renderAll();
            
            if (bar) bar.style.width = '100%';

            // Final Premium initialization
            if (typeof initScrollReveal === "function") initScrollReveal();
            if (typeof initHeroSlider === "function") initHeroSlider();

            // Smooth Preloader Exit — slightly longer delay for visual comfort
            setTimeout(() => {
                if (preloader) {
                    preloader.style.opacity = '0';
                    preloader.style.pointerEvents = 'none';
                    setTimeout(() => preloader.remove(), 1000);
                }
            }, 1200);

        } else {
            console.error("renderAll is not defined! Check render.js");
        }
    } catch (err) {
        console.error("Initialization Error:", err);
    }
}

window.addEventListener('load', initSite);
