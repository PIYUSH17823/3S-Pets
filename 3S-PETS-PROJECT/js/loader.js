// js/loader.js
async function loadComponent(slotId, fileName) {
    try {
        const response = await fetch(`./components/${fileName}`);
        if (!response.ok) throw new Error(`Missing: components/${fileName}`);
        const html = await response.text();
        const slot = document.getElementById(slotId);
        if (slot) {
            slot.innerHTML = html;
            console.log(`Loaded: ${fileName}`);
        }
    } catch (err) {
        console.error("Loader Error:", err);
    }
}

async function initSite() {
    // We execute all fetches simultaneously for maximum performance
    await Promise.all([
        loadComponent('navbar-slot', 'navbar.html'),
        loadComponent('hero-slot', 'hero.html'),
        loadComponent('catalog-slot', 'catalog.html'),
        loadComponent('story-slot', 'story.html'),
        loadComponent('reviews-slot', 'reviews.html'),
        loadComponent('contact-slot', 'contact.html'),
        loadComponent('footer-slot', 'footer.html')
    ]);

    console.log("DOM is ready. All components fetched concurrently.");
    if (typeof renderAll === "function") {
        renderAll();
    } else {
        console.error("renderAll is not defined! Check render.js");
    }
}

window.addEventListener('load', initSite);
