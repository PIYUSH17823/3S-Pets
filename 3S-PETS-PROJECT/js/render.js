// --- 1. THE MODEL (Data) ---
const catalogModel = {
    "Shampoo": [
        { title: "Silk-Finish Shampoo", tag: "Organic Formula", icon: "🧼", desc: "Enriched with cold-pressed aloe and neem for a professional salon finish at home.", glow: "#FFD1D1" },
        { title: "Active Protect", tag: "Flea & Tick", icon: "🫧", desc: "A clinical-strength barrier that smells like eucalyptus and fresh mint.", glow: "#D1E8FF" }
    ],
    "Biscuits": [
        { title: "Crunchy Hearts", tag: "Daily Nutrition", icon: "🦴", desc: "Slow-baked protein hearts designed for dental health and high-reward training.", glow: "#FFE4D1" },
        { title: "Vitality Bites", tag: "Superfood Blend", icon: "🥕", desc: "Rich in antioxidants and fiber to support digestion in active breeds.", glow: "#D1FFD7" }
    ],
    "Cat Litter": [
        { title: "Carbon-Lock Crystals", tag: "Odor Control", icon: "💎", desc: "Next-gen silica crystals with activated charcoal for 30-day freshness.", glow: "#E4D1FF" }
    ]
};

const reviewData = [
    { user: "Sarah Montgomery", pet: "Luna • Siberian Husky", text: "The transition to Silk-Finish was seamless. Her coat has a natural luster I haven't seen with other organic brands.", rating: 5, type: "Verified Owner" },
    { user: "Rahul Kulkarni", pet: "Bruno • Golden Retriever", text: "Being in Pune, the dust is a real issue. The Active Protect formula keeps him fresh for days. It's safe and effective!", rating: 5, type: "Verified Owner" },
    { user: "Emma Watson", pet: "Misty • Persian Cat", text: "The Carbon-Lock crystals are a game changer for apartment living. 30 days of freshness is a reality.", rating: 5, type: "Verified Owner" }
];

// --- 2. STATE MANAGEMENT ---
let activeCat = "Shampoo";
let activeIdx = 0;

// --- 3. THE CONTROLLER (Logic) ---

function renderCatalog() {
    const data = catalogModel[activeCat][activeIdx];
    const title = document.getElementById('product-title');
    const desc = document.getElementById('product-desc');
    const icon = document.getElementById('product-icon');
    const tag = document.getElementById('product-tag');
    const glow = document.getElementById('stage-glow');

    if (!title) return; // Safety check

    // Smooth UI Transition
    [title, desc, icon].forEach(el => el.style.opacity = 0);

    setTimeout(() => {
        title.innerText = data.title;
        desc.innerText = data.desc;
        icon.innerText = data.icon;
        tag.innerText = data.tag;
        if(glow) glow.style.backgroundColor = data.glow;
        
        [title, desc, icon].forEach(el => el.style.opacity = 1);
    }, 300);

    document.querySelectorAll('.cat-tab').forEach(tab => {
        tab.classList.toggle('active', tab.innerText === activeCat || (activeCat === "Cat Litter" && tab.innerText === "Litter"));
    });
}

function renderReviews() {
    const container = document.getElementById('review-container');
    if (!container) return;

    container.innerHTML = reviewData.map((rev, index) => `
        <div class="review-card group p-10 rounded-[40px] border border-gray-100 hover:border-[#E63946] transition-all duration-500 hover:shadow-2xl ${index % 2 !== 0 ? 'md:mt-12' : ''}">
            <div class="flex gap-1 mb-6">
                ${Array(rev.rating).fill('<span class="star-icon">★</span>').join('')}
            </div>
            <p class="text-xl text-[#1D1D1F] leading-snug font-medium mb-8">"${rev.text}"</p>
            <div class="flex items-center justify-between border-t border-gray-50 pt-8">
                <div class="flex items-center gap-4">
                    <div class="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center font-bold text-[#E63946]">${rev.user.charAt(0)}</div>
                    <div>
                        <h4 class="font-bold text-[#1D1D1F] text-sm">${rev.user}</h4>
                        <p class="text-[10px] text-gray-400 uppercase tracking-widest font-bold">${rev.pet}</p>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

function initContactForm() {
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            alert("Pawsome! Your message has been sent to the 3S PETS team. 🐾");
            form.reset();
        });
    }
}

// --- 4. THE MASTER TRIGGER ---
function renderAll() {
    console.log("🚀 3S Engine: Initializing Render...");
    renderCatalog();
    renderReviews();
    initContactForm();
}

// Global Nav Handlers
window.changeCategory = (c) => { activeCat = c; activeIdx = 0; renderCatalog(); };
window.nextProduct = () => { activeIdx = (activeIdx + 1) % catalogModel[activeCat].length; renderCatalog(); };
window.prevProduct = () => { activeIdx = (activeIdx - 1 + catalogModel[activeCat].length) % catalogModel[activeCat].length; renderCatalog(); };