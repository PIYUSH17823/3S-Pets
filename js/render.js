// --- 1. THE MODEL (Data) ---
const catalogModel = {
    "Shampoo": [
        {
            title: "Dry Bath (DOVE)", tag: "Instant Cleanse", image: "assets/shampoo/dry-bath.png", glow: "#FFF8F0",
            desc: "The ultimate waterless solution for a quick refresh without the stress of a bath.",
            specs: { "Type": "Waterless", "Key Benefit": "Quick Refresh", "Scent": "Soft Dove", "Safety": "PH Balanced" }
        },
        {
            title: "Oatmeal Silk Protein", tag: "Hydrating Formula", image: "assets/shampoo/oatmeal-silk.png", glow: "#FFD1D1",
            desc: "Enriched with silk protein and oatmeal for deep hydration and a majestic shine.",
            specs: { "Key Ingredient": "Oatmeal", "Conditioner": "Built-in", "Benefit": "Silk Texture", "Size": "Professional" }
        },
        {
            title: "Puppy Shampoo", tag: "Gentle & Tear-Free", image: "assets/shampoo/puppy-shampoo.png", glow: "#D1E8FF",
            desc: "A mild, tear-free formula designed specifically for the sensitive skin of young pups.",
            specs: { "Age Group": "Puppies", "Tear Free": "Yes", "Conditioner": "Built-in", "Skin Type": "Sensitive" }
        },
        {
            title: "Anti Hair Fall", tag: "Strength & Repair", image: "assets/shampoo/anti-hairfall.png", glow: "#FFE4D1",
            desc: "Clinical-strength formula to reduce shedding and strengthen hair from the roots.",
            specs: { "Target": "Shedding Control", "Conditioner": "Built-in", "Formula": "Pro-V Strength", "Effect": "Root Repair" }
        },
        {
            title: "Kitten Cat Shampoo", tag: "Feline Care", image: "assets/shampoo/kitten-cat.png", glow: "#E4D1FF",
            desc: "Specifically formulated for felines, maintaining the perfect pH level for cat skin.",
            specs: { "Target Pet": "Cats/Kittens", "Conditioner": "Built-in", "pH Level": "Balanced", "Scent": "Cat-Friendly" }
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
        
        // Handle images vs icons
        if (data.image) {
            icon.innerHTML = `<img src="${data.image}" class="w-full h-full object-contain animate-fade-in" alt="${data.title}">`;
        } else {
            icon.innerText = data.icon;
        }

        tag.innerText = data.tag;
        if (glow) glow.style.backgroundColor = data.glow;

        [title, desc, icon].forEach(el => el.style.opacity = 1);
    }, 300);

    document.querySelectorAll('.cat-tab').forEach(tab => {
        tab.classList.toggle('active', tab.innerText === activeCat || (activeCat === "Cat Litter" && tab.innerText === "Litter"));
    });
}

window.openTechSheet = () => {
    const data = catalogModel[activeCat][activeIdx];
    const modal = document.getElementById('tech-modal');
    const content = document.getElementById('tech-content');

    if (!modal || !content) return;

    const specHtml = Object.entries(data.specs).map(([key, value]) => `
        <div class="border-b border-gray-100 py-4 flex justify-between items-center animate-fade-in">
            <span class="text-[10px] uppercase font-bold text-gray-400 tracking-widest">${key}</span>
            <span class="font-bold text-[#1D1D1F]">${value}</span>
        </div>
    `).join('');

    content.innerHTML = `
        <div class="space-y-8">
            <div class="flex items-center gap-6">
                <div class="text-6xl bg-[#FFF8F0] w-24 h-24 flex items-center justify-center rounded-[30px]">${data.image ? `<img src="${data.image}" class="w-full h-full object-contain">` : data.icon}</div>
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

async function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const submitBtn = form.querySelector('button[type="submit"]');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = {
            fullName: document.getElementById('name-input')?.value || "",
            petInfo: document.getElementById('pet-input')?.value || "",
            email: document.getElementById('email-input')?.value || "",
            phone: document.getElementById('phone-input')?.value || "",
            message: document.getElementById('message-input')?.value || ""
        };

        if (!formData.fullName || !formData.email || !formData.message) {
            alert("Please fill in your name, email, and message so we can help you! 🐾");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            alert("Please enter a valid email address. 📧");
            return;
        }

        const originalBtnText = submitBtn.innerText;
        submitBtn.disabled = true;
        submitBtn.innerText = "SHIPPING YOUR INQUIRY...";
        submitBtn.classList.add('opacity-50', 'cursor-not-allowed');

        try {
            const result = await ApiService.sendEnquiry(formData);

            submitBtn.innerText = "Pawsome! Received 🐾";
            submitBtn.classList.replace('bg-[#E63946]', 'bg-green-500');
            
            setTimeout(() => {
                alert(`Success! Your query is registered (ID: ${result.id}). The 3S PETS team will reach out shortly.`);
                form.reset();
                submitBtn.innerText = originalBtnText;
                submitBtn.disabled = false;
                submitBtn.classList.remove('opacity-50', 'cursor-not-allowed');
                submitBtn.classList.replace('bg-green-500', 'bg-[#E63946]');
            }, 500);

        } catch (error) {
            console.error("3S Backend Error:", error);
            // Show more detailed error for troubleshooting
            const errorMsg = error.message || "Unknown Connection Error";
            alert(`Connection failed: ${errorMsg}. Please ensure your backend is running at http://localhost:8080`);
            submitBtn.disabled = false;
            submitBtn.innerText = originalBtnText;
            submitBtn.classList.remove('opacity-50', 'cursor-not-allowed');
        }
    });
}

// --- 4. THE MASTER TRIGGER ---
function renderAll() {
    renderCatalog();
    renderReviews();
    initContactForm();
}

window.changeCategory = (c) => { activeCat = c; activeIdx = 0; renderCatalog(); };
window.nextProduct = () => { activeIdx = (activeIdx + 1) % catalogModel[activeCat].length; renderCatalog(); };
window.prevProduct = () => { activeIdx = (activeIdx - 1 + catalogModel[activeCat].length) % catalogModel[activeCat].length; renderCatalog(); };
