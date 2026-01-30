// --- 1. THE MODEL (Data) ---
const catalogModel = {
    "Shampoo": [
        {
            title: "Silk-Finish Shampoo", tag: "Organic Formula", icon: "🧼", glow: "#FFD1D1",
            desc: "Enriched with cold-pressed aloe and neem for a professional salon finish at home.",
            specs: { "pH Level": "6.5 (Balanced)", "Key Botanical": "Neem & Aloe", "Coating": "Silky/Anti-Tangle", "Origin": "Organic Certified" }
        },
        {
            title: "Active Protect", tag: "Flea & Tick", icon: "🫧", glow: "#D1E8FF",
            desc: "A clinical-strength barrier that smells like eucalyptus and fresh mint.",
            specs: { "Active Agent": "Eucalyptus Oil", "Protection": "48-Hour Shield", "Scent": "Fresh Mint", "Safety": "Puppy/Kitten Safe" }
        }
    ],
    "Biscuits": [
        {
            title: "Crunchy Hearts", tag: "Daily Nutrition", icon: "🦴", glow: "#FFE4D1",
            desc: "Slow-baked protein hearts designed for dental health and high-reward training.",
            specs: { "Protein": "24% Min", "Calorie": "8 kcal/treat", "Grain": "Zero Grain", "Hardness": "Dental Grade" }
        },
        {
            title: "Vitality Bites", tag: "Superfood Blend", icon: "🥕", glow: "#D1FFD7",
            desc: "Rich in antioxidants and fiber to support digestion in active breeds.",
            specs: { "Fiber": "12% Max", "Superfood": "Real Carrots", "Digestion": "Probiotic Blend", "Vitamins": "A, E, and Omega-3" }
        }
    ],
    "Cat Litter": [
        {
            title: "Carbon-Lock Crystals", tag: "Odor Control", icon: "💎", glow: "#E4D1FF",
            desc: "Next-gen silica crystals with activated charcoal for 30-day freshness.",
            specs: { "Material": "Activated Silica", "Odor Control": "30-Day Guard", "Dust Level": "99.9% Dust Free", "Clumping": "Instant Lock" }
        }
    ]
};

const reviewData = [
    { user: "Sarah Montgomery", pet: "Luna • Siberian Husky", text: "The transition to Silk-Finish was seamless. Her coat has a natural luster I haven't seen with other organic brands.", rating: 5, type: "Verified Owner" },
    { user: "Rahul Kulkarni", pet: "Bruno • Golden Retriever", text: "Being in Pune, the dust is a real issue. The Active Protect formula keeps him fresh for days.", rating: 5, type: "Verified Owner" },
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

    if (!title) return;

    [title, desc, icon].forEach(el => el.style.opacity = 0);

    setTimeout(() => {
        title.innerText = data.title;
        desc.innerText = data.desc;
        icon.innerText = data.icon;
        tag.innerText = data.tag;
        if (glow) glow.style.backgroundColor = data.glow;

        [title, desc, icon].forEach(el => el.style.opacity = 1);
    }, 300);

    document.querySelectorAll('.cat-tab').forEach(tab => {
        tab.classList.toggle('active', tab.innerText === activeCat || (activeCat === "Cat Litter" && tab.innerText === "Litter"));
    });
}

// NEW: Technical Sheet Logic
window.openTechSheet = () => {
    const data = catalogModel[activeCat][activeIdx];
    const modal = document.getElementById('tech-modal');
    const content = document.getElementById('tech-content');

    if (!modal || !content) return;

    // Mapping over our Object entries to build the spec list
    const specHtml = Object.entries(data.specs).map(([key, value]) => `
        <div class="border-b border-gray-100 py-4 flex justify-between items-center animate-fade-in">
            <span class="text-[10px] uppercase font-bold text-gray-400 tracking-widest">${key}</span>
            <span class="font-bold text-[#1D1D1F]">${value}</span>
        </div>
    `).join('');

    content.innerHTML = `
        <div class="space-y-8">
            <div class="flex items-center gap-6">
                <div class="text-6xl bg-[#FFF8F0] w-24 h-24 flex items-center justify-center rounded-[30px]">${data.icon}</div>
                <div>
                    <h2 class="text-3xl font-bold tracking-tighter">${data.title}</h2>
                    <p class="text-[#E63946] font-bold text-[10px] tracking-[0.2em] uppercase">Tech Specifications</p>
                </div>
            </div>
            <div class="pt-4">${specHtml}</div>
            <p class="text-[10px] text-gray-400 leading-relaxed italic pt-4">
                *Verified by 3S PETS Labs, Pune. All batches are cruelty-free and sustainably sourced.
            </p>
        </div>
    `;

    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
};

window.closeTechSheet = () => {
    document.getElementById('tech-modal').classList.add('hidden');
    document.body.style.overflow = 'auto';
};

function renderReviews() {
    const container = document.getElementById('review-container');
    if (!container) return;

    container.innerHTML = reviewData.map((rev, index) => `
        <div class="review-card group p-10 rounded-[40px] border border-gray-100 hover:border-[#E63946] transition-all duration-500 hover:shadow-2xl ${index % 2 !== 0 ? 'md:mt-12' : ''}">
            <div class="flex gap-1 mb-6">
                ${Array(rev.rating).fill('<span class="text-[#E63946]">★</span>').join('')}
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

// --- Updated inside your render.js ---
async function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // 1. Collect Data from your form inputs
        // Ensure your HTML inputs have these specific IDs or use querySelectors
        const formData = {
            fullName: document.getElementById('name-input')?.value || "Anonymous User",
            petInfo: document.getElementById('pet-input')?.value || "Not specified",
            message: document.getElementById('message-input')?.value || "No message provided"
        };

        // 2. Shipping the data to Spring Boot
        try {
            const response = await fetch('http://localhost:8080/api/v1/enquiry', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const result = await response.json();

                // 3. User Feedback
                alert(`Pawsome! Your query is registered (ID: ${result.id}). The 3S PETS team has been notified. 🐾`);
                form.reset();
            } else {
                throw new Error('Server responded with an error');
            }
        } catch (error) {
            console.error("3S Backend Error:", error);
            alert("Connection failed. Our systems are currently taking a nap. Please try again later!");
        }
    });
}
// Change from 'function openClubModal()' to this:
window.openClubModal = () => {
    const modal = document.getElementById('club-modal');
    if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        document.body.style.overflow = 'hidden';
    } else {
        console.error("3S PETS Error: club-modal element not found in DOM.");
    }
};

window.closeClubModal = () => {
    const modal = document.getElementById('club-modal');
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
};

function initClubMembership() {
    const clubForm = document.getElementById('club-form');
    if (!clubForm) return;

    clubForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const memberData = {
            fullName: document.getElementById('club-name').value,
            mobile: document.getElementById('club-mobile').value,
            email: document.getElementById('club-email').value
        };

        try {
            const response = await fetch('http://localhost:8080/api/v1/club/join', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(memberData)
            });

            if (response.ok) {
                alert("Welcome to the 3S Inner Circle! Check your inbox for your 10% discount code. 🐾");
                closeClubModal();
                clubForm.reset();
            }
        } catch (error) {
            console.error("Backend unreachable:", error);
            alert("Connection error. Please try again later.");
        }
    });
}

// --- 4. THE MASTER TRIGGER ---
function renderAll() {
    renderCatalog();
    renderReviews();
    initContactForm();
    initClubMembership(); // Initialize the 
}

window.changeCategory = (c) => { activeCat = c; activeIdx = 0; renderCatalog(); };
window.nextProduct = () => { activeIdx = (activeIdx + 1) % catalogModel[activeCat].length; renderCatalog(); };
window.prevProduct = () => { activeIdx = (activeIdx - 1 + catalogModel[activeCat].length) % catalogModel[activeCat].length; renderCatalog(); };