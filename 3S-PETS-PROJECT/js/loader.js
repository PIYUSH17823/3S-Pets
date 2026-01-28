// js/loader.js

async function loadComponent(slotId, fileName) {
    try {
        const response = await fetch(`components/${fileName}`);
        if (!response.ok) throw new Error(`Could not find components/${fileName}`);
        const html = await response.text();
        document.getElementById(slotId).innerHTML = html;
        console.log(`Successfully loaded: ${fileName}`);
    } catch (error) {
        console.error("Loader Error:", error);
    }
}

async function initSite() {
    console.log("Starting to load components...");
    
    // Using 'await' ensures they load in this specific order
    await loadComponent('navbar-slot', 'navbar.html');
    await loadComponent('hero-slot', 'hero.html');
    await loadComponent('catalog-slot', 'catalog.html');
    await loadComponent('story-slot', 'story.html');
    await loadComponent('reviews-slot', 'reviews.html');
    await loadComponent('footer-slot', 'footer.html');

    console.log("All components loaded. Now triggering data render...");

    // Now that the HTML is definitely in the DOM, we call the render logic
    if (typeof renderAll === 'function') {
        renderAll();
    } else {
        console.error("renderAll function not found! Check your render.js file.");
    }
}

// Start the process
initSite();