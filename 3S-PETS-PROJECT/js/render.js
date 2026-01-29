// --- THE MODEL ---
const productData = [
    { id: 1, name: "Super-Food Kibble", category: "Food", tag: "Shiny Coats", icon: "🥣", color: "#FFD1D1" },
    { id: 2, name: "Fresh-Step Crystals", category: "Litter", tag: "Zero Odor", icon: "✨", color: "#D1E8FF" },
    { id: 3, name: "Crunchy Hearts", category: "Biscuits", tag: "Grain Free", icon: "🦴", color: "#FFE4D1" }
];

const reviewData = [
    { user: "Sarah M.", pet: "Luna the Husky", text: "Finally a brand that cares about ingredients!", stars: 5 },
    { user: "Rahul K.", pet: "Bruno the Lab", text: "The biscuits are gone in 2 seconds. He loves them!", stars: 5 },
    { user: "Emma W.", pet: "Misty the Cat", text: "Best litter I have used so far.", stars: 4 }
];

// --- THE CONTROLLER ---
function renderCatalog() {
    const container = document.getElementById('product-container');
    if (container) {
        container.innerHTML = productData.map(item => `
            <div class="bg-[#FFF8F0] p-8 rounded-[40px] hover:scale-105 transition-all cursor-pointer group shadow-sm">
                <div class="w-16 h-16 rounded-2xl mb-6 flex items-center justify-center text-3xl" style="background-color: ${item.color}">
                    ${item.icon}
                </div>
                <h3 class="text-2xl font-bold mb-1 text-[#4A4A4A]">${item.name}</h3>
                <span class="text-[#E63946] font-bold text-xs uppercase tracking-wider">${item.tag}</span>
            </div>
        `).join('');
        console.log("✅ Catalog successfully injected.");
    }
}

function renderReviews() {
    const container = document.getElementById('review-container');
    if (container) {
        container.innerHTML = reviewData.map(rev => `
            <div class="bg-white p-6 rounded-3xl shadow-sm border border-[#FFD1D1] w-full md:w-80 transition-transform hover:-translate-y-2">
                <div class="flex text-yellow-400 mb-2">${'★'.repeat(rev.stars)}</div>
                <p class="italic text-gray-600 mb-4">"${rev.text}"</p>
                <div class="font-bold text-[#4A4A4A]">${rev.user}</div>
                <div class="text-xs text-[#E63946] font-semibold">${rev.pet}</div>
            </div>
        `).join('');
        console.log("✅ Reviews successfully injected.");
    }
}

// Global function to be called by loader.js
function renderAll() {
    console.log("🚀 Starting global data injection...");
    renderCatalog();
    renderReviews();
}