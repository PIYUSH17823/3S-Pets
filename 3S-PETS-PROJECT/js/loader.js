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
    // These must match your <div> IDs in index.html exactly
    await loadComponent('navbar-slot', 'navbar.html');
    await loadComponent('hero-slot', 'hero.html');
    await loadComponent('catalog-slot', 'catalog.html');
    await loadComponent('story-slot', 'story.html');
    await loadComponent('reviews-slot', 'reviews.html');
    await loadComponent('contact-slot', 'contact.html');
    await loadComponent('footer-slot', 'footer.html');

    console.log("DOM is ready. Calling renderAll...");
    if (typeof renderAll === "function") {
        renderAll();
    } else {
        console.error("renderAll is not defined! Check render.js");
    }
}

// Ensure the scripts are fully loaded before starting
window.addEventListener('load', initSite);