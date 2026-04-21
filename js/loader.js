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

async function initSite() {
    const preloader = document.getElementById('preloader');
    const bar = document.getElementById('preloader-bar');

    try {
        if (bar) bar.style.width = '20%';

        // We execute all fetches simultaneously for maximum performance
        await Promise.all([
            loadComponent('navbar-slot', 'navbar.html'),
            loadComponent('hero-slot', 'hero.html'),
            loadComponent('catalog-slot', 'catalog.html'),
            loadComponent('story-slot', 'story.html'),
            loadComponent('reviews-slot', 'reviews.html'),
            loadComponent('contact-slot', 'contact.html'),
            loadComponent('footer-slot', 'footer.html'),
            loadComponent('modal-container', 'admin.html')
        ]);

        if (bar) bar.style.width = '60%';

        console.log("DOM is ready. All components fetched concurrently.");
        
        if (typeof renderAll === "function") {
            await renderAll();
            
            if (bar) bar.style.width = '100%';

            // Final Premium initialization:
            if (typeof initScrollReveal === "function") {
                initScrollReveal();
            }
            if (typeof initHeroSlider === "function") {
                initHeroSlider();
            }

            // Smooth Preloader Exit
            setTimeout(() => {
                if (preloader) {
                    preloader.style.opacity = '0';
                    preloader.style.pointerEvents = 'none';
                    setTimeout(() => preloader.remove(), 1000);
                }
            }, 800);

        } else {
            console.error("renderAll is not defined! Check render.js");
        }
    } catch (err) {
        console.error("Initialization Error:", err);
    }
}

window.addEventListener('load', initSite);
