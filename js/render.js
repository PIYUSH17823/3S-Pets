// --- 1. THE MODEL (Data) ---

// Offline fallback data — ensures the site works even without a backend.
const OFFLINE_FALLBACK = {
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
        // {
        //     title: "Crunchy Hearts", tag: "Daily Nutrition", icon: "🦴", glow: "#FFE4D1",
        //     desc: "Slow-baked protein hearts designed for dental health and high-reward training.",
        //     specs: { "Protein": "24% Min", "Calorie": "8 kcal/treat", "Grain": "Zero Grain", "Hardness": "Dental Grade" }
        // },
        // {
        //     title: "Vitality Bites", tag: "Superfood Blend", icon: "🥕", glow: "#D1FFD7",
        //     desc: "Rich in antioxidants and fiber to support digestion in active breeds.",
        //     specs: { "Fiber": "12% Max", "Superfood": "Real Carrots", "Digestion": "Probiotic Blend", "Vitamins": "A, E, and Omega-3" }
        // },
        {
            title: "Premium Cheese Treats", tag: "Calcium Rich", image: "assets/biscuits/cheese-biscuit.png", glow: "#FFF8E1",
            desc: "Delicious oven-baked cheese bites that provide a calcium boost while satisfying your pet's cravings.",
            specs: { "Protein": "18%", "Fat": "12%", "Calcium": "1.5%", "Shape": "Bone" }
        },
        {
            title: "Classic Chicken Crunch", tag: "High Protein", image: "assets/biscuits/chicken-biscuit.png", glow: "#FFF3E0",
            desc: "Pure chicken breast infused biscuits, perfect for muscle growth and high-energy play sessions.",
            specs: { "Protein": "28%", "Real Chicken": "40%", "Digestibility": "95%", "For": "All Breeds" }
        },
        {
            title: "Savory Meat Delights", tag: "Meaty Goodness", image: "assets/biscuits/meat-biscuit.png", glow: "#FBE9E7",
            desc: "A hearty blend of beef and lamb extracts, providing a rich savory flavor that pets find irresistible.",
            specs: { "Protein": "26%", "Flavor": "Beef & Lamb", "Grain Free": "Yes", "Iron": "High" }
        },
        {
            title: "Power-4 Super Treats", tag: "Multivitamin Boost", image: "assets/biscuits/mixed-biscuit.png", glow: "#F3E5F5",
            desc: "The ultimate nutritional powerhouse combining chicken, red meat, liver, and eggs for a complete snack.",
            specs: { "Ingredients": "4-in-1", "Vitamins": "A, D, E, B12", "Energy": "High", "Health": "Skin & Coat" }
        }
    ],
    "Cat Litter": [
        {
            "title": "Bentonite Premium", "tag": "Next-Gen Odor Control", "image": "assets/litter/litter-front.png", "glow": "#D1FFD7",
            "desc": "Bentonite premium cat litter with fast-clumping technology and low-dust formula for a clean home.",
            "specs": { "Base": "Natural Bentonite", "Clumping": "Fast-Action", "Weight Status": "5kg / 10kg", "Dust Level": "Low Dust", "Scents": "Lavender, Lemon, Rose" }
        }
    ]
};

let catalogModel = OFFLINE_FALLBACK; // Initialize with fallback

let reviewsData = [
    { user: "Sarah Montgomery", pet: "Luna • Siberian Husky", text: "The transition to Silk-Finish was seamless. Her coat has a natural luster I haven't seen with other organic brands.", rating: 5, type: "Verified Owner" },
    { user: "Rahul Kulkarni", pet: "Bruno • Golden Retriever", text: "Being in Pune, the dust is a real issue. The Active Protect formula keeps him fresh for days.", rating: 5, type: "Verified Owner" },
    { user: "Emma Watson", pet: "Misty • Persian Cat", text: "The Carbon-Lock crystals are a game changer for apartment living. 30 days of freshness is a reality.", rating: 5, type: "Verified Owner" }
];

// --- 2. STATE MANAGEMENT ---
let activeCat = "Shampoo";
let activeIdx = 0;

// --- 3. THE CONTROLLER (Logic) ---

async function renderCatalog() {
    // Safety check: Ensure the category and product exist
    if (!catalogModel[activeCat] || !catalogModel[activeCat][activeIdx]) {
        activeIdx = 0;
        if (!catalogModel[activeCat]) return;
    }

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
            const isLitter = activeCat === "Cat Litter";
            icon.classList.add('skeleton'); // Add loading pulse
            
            const img = new Image();
            img.src = data.image;
            img.onload = () => {
                icon.classList.remove('skeleton'); // Remove pulse when loaded
                icon.innerHTML = `<img src="${data.image}" 
                    class="w-full h-full object-contain animate-fade-in ${isLitter ? 'scale-[1.4]' : 'scale-110'}" 
                    style="transform-origin: bottom center;" 
                    alt="${data.title}">`;
                icon.style.opacity = 1;
            };
        } else {
            icon.classList.remove('skeleton');
            icon.innerText = data.icon;
            icon.style.opacity = 1;
        }

        tag.innerText = data.tag;
        if (glow) glow.style.backgroundColor = data.glow;

        [title, desc].forEach(el => el.style.opacity = 1);
    }, 100);

    document.querySelectorAll('.cat-tab').forEach(tab => {
        tab.classList.toggle('active', tab.innerText === activeCat || (activeCat === "Cat Litter" && tab.innerText === "Litter"));
    });
}

window.openTechSheet = () => {
    const data = catalogModel[activeCat][activeIdx];
    if (!data) return;

    const modal = document.getElementById('tech-modal');
    const content = document.getElementById('tech-content');

    if (!modal || !content) return;

    const specHtml = Object.entries(data.specs).map(([key, value]) => `
        <div class="border-b border-gray-100 py-4 flex justify-between items-center animate-fade-in">
            <span class="text-[10px] uppercase font-bold text-gray-400 tracking-widest">${key}</span>
            <span class="font-bold text-[#1D1D1F]">${value}</span>
        </div>
    `).join('');

    const brochureBtn = data.brochure ? `
        <button onclick="openBrochure('${data.brochure}')" class="w-full mt-6 bg-[#1D1D1F] text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-[#E63946] transition-all group">
            <span>Explore Full Brochure</span>
            <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
        </button>
    ` : '';

    content.innerHTML = `
        <div class="space-y-8">
            <div class="flex items-center gap-6">
                <div class="text-6xl bg-[#FFF8F0] w-24 h-24 flex items-center justify-center rounded-[30px] overflow-hidden">${data.image ? `<img src="${data.image}" class="w-full h-full object-contain">` : data.icon}</div>
                <div>
                    <h2 class="text-3xl font-bold tracking-tighter">${data.title}</h2>
                    <p class="text-[#E63946] font-bold text-[10px] tracking-[0.2em] uppercase">Tech Specifications</p>
                </div>
            </div>
            <div class="pt-4">${specHtml}</div>
            ${brochureBtn}
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

// --- 5. BROCHURE VIEWER LOGIC ---

window.openBrochure = (path) => {
    const viewer = document.getElementById('brochure-viewer');
    const container = document.getElementById('brochure-container');
    const img = document.getElementById('brochure-img');
    
    if (viewer && img) {
        // Reset Zoom State on open
        img.classList.add('max-h-[85vh]');
        img.classList.remove('max-h-full');
        if (container) container.scrollTop = 0;
        
        img.src = path;
        viewer.classList.remove('hidden');
        viewer.classList.add('flex');
        document.body.style.overflow = 'hidden';
    }
};

window.closeBrochure = () => {
    document.getElementById('brochure-viewer').classList.add('hidden');
    document.body.style.overflow = 'auto';
};

window.toggleBrochureZoom = () => {
    const img = document.getElementById('brochure-img');
    if (!img) return;
    
    const isZoomed = img.classList.contains('max-h-full');
    
    if (isZoomed) {
        img.classList.remove('max-h-full');
        img.classList.add('max-h-[85vh]');
    } else {
        img.classList.remove('max-h-[85vh]');
        img.classList.add('max-h-full');
    }
};

// --- 6. PREMIUM ANIMATIONS (SCROLL REVEAL) ---

function initScrollReveal() {
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const targets = document.querySelectorAll('section, .product-card, .review-card, .footer-content');
    targets.forEach(target => {
        target.classList.add('reveal-hidden');
        observer.observe(target);
    });
}

// --- 7. ADMIN & REVIEW INTERACTIVE LOGIC ---

function renderReviews() {
    const container = document.getElementById('review-container');
    const avgDisplay = document.getElementById('avg-rating-value');
    if (!container) return;

    // Calculate dynamic average rating
    if (reviewsData && reviewsData.length > 0) {
        const totalRating = reviewsData.reduce((acc, curr) => acc + (curr.rating || 0), 0);
        const avg = (totalRating / reviewsData.length).toFixed(1);
        if (avgDisplay) avgDisplay.innerText = `${avg}/5`;
    }

    container.innerHTML = reviewsData.map((rev, index) => `
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
            const errorMsg = error.message || "Unknown Connection Error";
            alert(`Connection failed: ${errorMsg}. Please ensure your backend is running at http://localhost:8080`);
            submitBtn.disabled = false;
            submitBtn.innerText = originalBtnText;
            submitBtn.classList.remove('opacity-50', 'cursor-not-allowed');
        }
    });
}

// --- 5. ADMIN & REVIEW INTERACTIVE LOGIC ---

let adminPass = "";
let currentRating = 5;

window.setRating = (val) => {
    currentRating = val;
    const stars = document.querySelectorAll('.star-btn');
    stars.forEach((s, i) => {
        if (i < val) {
            s.classList.add('text-yellow-400');
            s.classList.remove('text-gray-200');
        } else {
            s.classList.remove('text-yellow-400');
            s.classList.add('text-gray-200');
        }
    });
};

window.openReviewModal = () => {
    currentRating = 5; // Reset
    setRating(5);
    const modal = document.getElementById('review-modal');
    if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        document.body.style.overflow = 'hidden';
    }
};

window.closeReviewModal = () => {
    document.getElementById('review-modal').classList.add('hidden');
    document.body.style.overflow = 'auto';
};

window.submitUserReview = async () => {
    const formData = {
        user: document.getElementById('rev-name')?.value,
        pet: document.getElementById('rev-pet')?.value,
        text: document.getElementById('rev-text')?.value,
        rating: currentRating
    };

    if (!formData.user || !formData.text) {
        alert("Please fill in your name and review! 🐾");
        return;
    }

    try {
        await ApiService.submitReview(formData);
        alert("Pawsome! Your review has been submitted for verification. 🧼");
        closeReviewModal();
    } catch (err) {
        alert("Submission failed. Please try again.");
    }
};

window.openAdminPortal = () => {
    const modal = document.getElementById('admin-portal');
    if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        document.body.style.overflow = 'hidden';
    }
};

window.closeAdminPortal = () => {
    document.getElementById('admin-portal').classList.add('hidden');
    document.body.style.overflow = 'auto';
};

window.loginAdmin = async () => {
    const pass = document.getElementById('admin-pass-input')?.value;
    if (!pass) return;

    try {
        const reviews = await ApiService.getAdminReviews(pass);
        adminPass = pass;
        document.getElementById('admin-login').classList.add('hidden');
        document.getElementById('admin-dashboard').classList.remove('hidden');
        renderAdminDashboard(reviews);
    } catch (err) {
        alert("Incorrect Admin Password. Access Denied.");
    }
};

function renderAdminDashboard(reviews) {
    const queue = document.getElementById('review-queue');
    const pending = reviews.filter(r => r.status === 'pending');
    document.getElementById('pending-count').innerText = pending.length;

    queue.innerHTML = reviews.map(rev => `
        <div class="p-6 bg-gray-50 rounded-3xl border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div class="space-y-1">
                <div class="flex items-center gap-2">
                    <span class="font-bold text-[#1D1D1F]">${rev.user}</span>
                    <span class="text-[10px] px-2 py-0.5 rounded-full ${rev.status === 'approved' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'} font-bold uppercase">${rev.status || 'pending'}</span>
                </div>
                <p class="text-sm text-gray-500 italic">"${rev.text.substring(0, 80)}${rev.text.length > 80 ? '...' : ''}"</p>
                <p class="text-[10px] text-gray-400 font-bold uppercase tracking-widest">${rev.pet}</p>
            </div>
            <div class="flex gap-2 w-full md:w-auto">
                ${rev.status !== 'approved' ? `
                    <button onclick="handleAdminAction(${rev.id}, 'approve')" class="flex-1 md:flex-none px-4 py-2 bg-green-500 text-white rounded-xl text-xs font-bold hover:bg-green-600 transition-all">Approve</button>
                ` : ''}
                <button onclick="handleAdminAction(${rev.id}, 'delete')" class="flex-1 md:flex-none px-4 py-2 bg-gray-200 text-gray-600 rounded-xl text-xs font-bold hover:bg-[#E63946] hover:text-white transition-all">Delete</button>
            </div>
        </div>
    `).join('');
}

window.handleAdminAction = async (id, action) => {
    try {
        await ApiService.updateReviewStatus(adminPass, id, action);
        const reviews = await ApiService.getAdminReviews(adminPass);
        renderAdminDashboard(reviews);
        // Refresh public view
        renderReviews();
    } catch (err) {
        alert("Action failed.");
    }
};

async function initNewsletter() {
    const btn = document.getElementById('newsletter-btn');
    const emailInput = document.getElementById('newsletter-email');

    if (!btn || !emailInput) return;

    btn.addEventListener('click', async () => {
        const email = emailInput.value;
        if (!email || !email.includes('@')) {
            alert("Please enter a valid email address. 🐾");
            return;
        }

        const originalText = btn.innerText;
        btn.disabled = true;
        btn.innerText = "JOINING...";

        try {
            const result = await ApiService.subscribeNewsletter({ email });
            btn.innerText = "JOINED! 🐾";
            btn.style.backgroundColor = '#10b981'; // Green-500
            btn.style.color = 'white';
            alert(result.message);
            emailInput.value = "";
        } catch (error) {
            console.error("Newsletter Error:", error);
            alert("Subscription failed. Please ensure the backend is running.");
            btn.innerText = originalText;
            btn.disabled = false;
        }
    });
}

// --- 6. THE MASTER TRIGGER ---
async function renderAll() {
    try {
        // Parallel fetch for catalog and reviews
        const [liveData, liveReviews] = await Promise.all([
            ApiService.getProducts(),
            ApiService.getReviews()
        ]);

        if (liveData && Object.keys(liveData).length > 0) {
            catalogModel = liveData;
            console.log("3S Catalog synced with Backend API.");
        }

        if (liveReviews && liveReviews.length > 0) {
            reviewsData = liveReviews;
            console.log("3S Reviews synced with Backend API.");
        }
    } catch (error) {
        console.warn("Backend offline or partial sync failure. Using fallback data.");
    } finally {
        // Always render, whether we have live data or fallback
        renderCatalog();
        renderReviews();
        initContactForm();
        initNewsletter();
    }
}

// --- 7. ADMIN PORTAL LOGIC ---
window.sendBroadcast = async function () {
    const passInput = document.getElementById('admin-pass-input');
    const subjectInput = document.getElementById('broadcast-subject');
    const messageInput = document.getElementById('broadcast-message');
    const btn = document.getElementById('broadcast-btn');

    if (!passInput || !subjectInput || !messageInput || !btn) return;

    const pass = passInput.value;
    const subject = subjectInput.value;
    const message = messageInput.value;

    if (!subject || !message) {
        alert("Please provide both a subject and a message. 🐾");
        return;
    }

    if (!confirm(`Are you sure you want to broadcast this message to your subscribers?`)) return;

    const originalText = btn.innerText;
    btn.disabled = true;
    btn.innerText = "SENDING BROADCAST...";

    try {
        const result = await ApiService.broadcast(pass, subject, message);
        if (result.success) {
            alert(result.message);
            subjectInput.value = "";
            messageInput.value = "";
        } else {
            alert(result.error || "Broadcast failed.");
        }
    } catch (err) {
        console.error("Broadcast Logic Error:", err);
        alert("Connection failed. Please ensure the backend is running.");
    } finally {
        btn.disabled = false;
        btn.innerText = originalText;
    }
};

window.changeCategory = (c) => {
    if (catalogModel[c]) {
        activeCat = c;
        activeIdx = 0;
        renderCatalog();
    }
};

window.nextProduct = () => {
    if (catalogModel[activeCat]) {
        activeIdx = (activeIdx + 1) % catalogModel[activeCat].length;
        renderCatalog();
    }
};

window.prevProduct = () => {
    if (catalogModel[activeCat]) {
        activeIdx = (activeIdx - 1 + catalogModel[activeCat].length) % catalogModel[activeCat].length;
        renderCatalog();
    }
};

// --- 8. HERO SLIDER LOGIC ---
function initHeroSlider() {
    const slides = document.querySelectorAll('.hero-slide');
    if (slides.length === 0) return;

    let currentSlide = 0;
    
    setInterval(() => {
        slides[currentSlide].classList.remove('active');
        
        currentSlide = (currentSlide + 1) % slides.length;
        
        slides[currentSlide].classList.add('active');
    }, 5000); // Change every 5 seconds
}

// Export for loader
window.initHeroSlider = initHeroSlider;
