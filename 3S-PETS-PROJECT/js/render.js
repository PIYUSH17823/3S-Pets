// js/render.js

const productData = [
    { id: 1, name: "Super-Food Kibble", category: "Food", tag: "Shiny Coats", icon: "🥣", color: "#FFD1D1" },
    { id: 2, name: "Fresh-Step Crystals", category: "Litter", tag: "Zero Odor", icon: "✨", color: "#D1E8FF" },
    { id: 3, name: "Crunchy Hearts", category: "Biscuits", tag: "Grain Free", icon: "🦴", color: "#FFE4D1" }
];

function renderAll() {
    const container = document.getElementById('product-container');
    
    if (container) {
        container.innerHTML = productData.map(item => `
            <div class="bg-[#FFF8F0] p-8 rounded-[40px] hover:scale-105 transition-all cursor-pointer group shadow-sm">
                <div class="w-16 h-16 rounded-2xl mb-6 flex items-center justify-center text-3xl" style="background-color: ${item.color}">
                    ${item.icon}
                </div>
                <h3 class="text-2xl font-bold mb-1">${item.name}</h3>
                <span class="text-[#E63946] font-bold text-xs uppercase tracking-wider">${item.tag}</span>
            </div>
        `).join('');
        console.log("Products rendered successfully!");
    } else {
        console.error("Critical Error: #product-container not found in the DOM!");
    }
}