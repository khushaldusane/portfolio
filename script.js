
document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. Typing Effect for Hero Section
       ========================================================================== */
    const roles = [
        "Data Analyst",
        "SQL Enthusiast",
        "Power BI Developer",
        "Python & EDA Specialist",
        "Financial Enthusiast"
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingElement = document.querySelector(".typing");

    function handleTyping() {
        if (!typingElement) return;

        const currentRole = roles[roleIndex];

        if (isDeleting) {
            // Deleting characters
            typingElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            // Typing characters
            typingElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 40 : 90;

        // If complete word is typed
        if (!isDeleting && charIndex === currentRole.length) {
            typeSpeed = 1800; // Pause at end of word
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeSpeed = 400; // Pause before new word
        }

        setTimeout(handleTyping, typeSpeed);
    }

    handleTyping();


    /* ==========================================================================
       2. Scroll Progress Bar & Navbar Sticky State
       ========================================================================== */
    const progressBar = document.getElementById("progress-bar");
    const navbar = document.getElementById("navbar");

    window.addEventListener("scroll", () => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const progressPercent = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;

        if (progressBar) {
            progressBar.style.width = `${progressPercent}%`;
        }

        // Toggle scrolled styling on navbar
        if (navbar) {
            if (scrollTop > 40) {
                navbar.classList.add("scrolled");
            } else {
                navbar.classList.remove("scrolled");
            }
        }
    });


    /* ==========================================================================
       3. Mobile Hamburger Navigation
       ========================================================================== */
    const hamburgerBtn = document.getElementById("hamburger-btn");
    const navLinks = document.getElementById("nav-links");
    const navItems = document.querySelectorAll(".nav-item");

    if (hamburgerBtn && navLinks) {
        hamburgerBtn.addEventListener("click", () => {
            const isOpen = navLinks.classList.contains("mobile-open");
            if (isOpen) {
                closeMobileNav();
            } else {
                openMobileNav();
            }
        });

        function openMobileNav() {
            navLinks.classList.add("mobile-open");
            hamburgerBtn.classList.add("active");
            hamburgerBtn.setAttribute("aria-expanded", "true");
        }

        function closeMobileNav() {
            navLinks.classList.remove("mobile-open");
            hamburgerBtn.classList.remove("active");
            hamburgerBtn.setAttribute("aria-expanded", "false");
        }

        // Close menu when clicking on any nav link
        navItems.forEach(item => {
            item.addEventListener("click", () => {
                closeMobileNav();
            });
        });

        // Close when clicking outside of navbar
        document.addEventListener("click", (e) => {
            if (!navbar.contains(e.target) && navLinks.classList.contains("mobile-open")) {
                closeMobileNav();
            }
        });
    }


    /* ==========================================================================
       4. Active Navigation Link Highlighting on Scroll
       ========================================================================== */
    const sections = document.querySelectorAll("section[id]");

    function updateActiveNav() {
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 140;
            const sectionId = current.getAttribute("id");
            const navLink = document.querySelector(`.nav-links a[href*="${sectionId}"]`);

            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLink.classList.add("active");
                } else {
                    navLink.classList.remove("active");
                }
            }
        });
    }

    window.addEventListener("scroll", updateActiveNav);


    /* ==========================================================================
       5. Project Category Filter
       ========================================================================== */
    const filterButtons = document.querySelectorAll(".filter-btn");
    const projectCards = document.querySelectorAll(".project-card");

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            const filterValue = button.getAttribute("data-filter");

            projectCards.forEach(card => {
                const category = card.getAttribute("data-category");

                if (filterValue === "all" || category === filterValue) {
                    card.style.display = "flex";
                    setTimeout(() => {
                        card.style.opacity = "1";
                        card.style.transform = "translateY(0)";
                    }, 50);
                } else {
                    card.style.opacity = "0";
                    card.style.transform = "translateY(15px)";
                    setTimeout(() => {
                        card.style.display = "none";
                    }, 250);
                }
            });
        });
    });

    /* ==========================================================================
       6. Theme Toggle (Light / Fresh Ivory White Default <-> Dark)
       ========================================================================== */
    const themeToggleBtn = document.getElementById("theme-toggle");
    const currentTheme = localStorage.getItem("portfolio-theme") || "light";

    // Initialize theme based on preference or default to fresh ivory light
    if (currentTheme === "dark") {
        document.documentElement.setAttribute("data-theme", "dark");
        if (themeToggleBtn) {
            themeToggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
            themeToggleBtn.setAttribute("title", "Switch to light theme");
        }
    } else {
        document.documentElement.removeAttribute("data-theme");
        if (themeToggleBtn) {
            themeToggleBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
            themeToggleBtn.setAttribute("title", "Switch to dark theme");
        }
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener("click", () => {
            const isDark = document.documentElement.getAttribute("data-theme") === "dark";
            if (isDark) {
                document.documentElement.removeAttribute("data-theme");
                localStorage.setItem("portfolio-theme", "light");
                themeToggleBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
                themeToggleBtn.setAttribute("title", "Switch to dark theme");
            } else {
                document.documentElement.setAttribute("data-theme", "dark");
                localStorage.setItem("portfolio-theme", "dark");
                themeToggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
                themeToggleBtn.setAttribute("title", "Switch to light theme");
            }
        });
    }

});


/* ==========================================================================
   6. Detailed Project Modal Data & Handlers
   ========================================================================== */
const projectDetails = {
    bike: {
        title: "Bike Sales Analysis",
        category: "SQL Analytics & Database Querying",
        badgeClass: "badge-sql",
        image: "images/Bike.jpg",
        description: "An exploratory and relational SQL analysis analyzing multi-region bicycle sales, revenue distributions, and seasonal performance variations.",
        highlights: [
            "Extracted and cleaned large sales records using advanced SQL queries, subqueries, and window functions.",
            "Identified top-performing bike models and high-margin accessories contributing to 60%+ of net margins.",
            "Analyzed customer demographics and repeat purchase habits to recommend targeted promotional cycles.",
            "Benchmarked regional sales representatives and calculated monthly compound growth figures."
        ],
        technologies: ["SQL", "MySQL", "Relational DB", "Window Functions", "Data Aggregation"],
        githubLink: "https://github.com/khushaldusane/SQL/tree/main/Bikes%20Data%20Insights"
    },

    bank: {
        title: "Bank Customer Analysis",
        category: "Python EDA & Statistical Insights",
        badgeClass: "badge-python",
        image: "images/bank.jpg",
        description: "Comprehensive data science and customer behavior analysis using Python libraries to diagnose customer segments, account balances, and churn vulnerabilities.",
        highlights: [
            "Conducted robust data cleaning and handling of missing values across 10,000+ customer transaction rows using Pandas.",
            "Discovered key churn correlates among customers with low engagement, high credit card balances, and single-product usage.",
            "Produced intuitive visualization charts using Matplotlib and Seaborn for executive presentations.",
            "Created behavioral customer clusters to improve cross-selling opportunities for financial products."
        ],
        technologies: ["Python", "Pandas", "NumPy", "Matplotlib", "Seaborn", "Jupyter Notebook"],
        githubLink: "https://github.com/khushaldusane/Python/tree/main/Bank%20Analytics%20Project"
    },

    loan: {
        title: "Default Loan Dashboard",
        category: "Power BI & Risk Intelligence",
        badgeClass: "badge-powerbi",
        image: "images/loan.jpg",
        description: "An interactive Power BI business intelligence dashboard built to track loan portfolios, credit approvals, and borrower default patterns.",
        highlights: [
            "Designed a clean Star Schema data model in Power BI connecting loan accounts, applicant demographics, and payment histories.",
            "Authored custom DAX measures for Default Rate %, Debt-to-Income ratios, and risk score buckets.",
            "Implemented drill-through filters and interactive slicers enabling risk officers to inspect credit grades in real-time.",
            "Highlighted key early warning signals that reduced high-risk exposure."
        ],
        technologies: ["Power BI", "DAX", "Data Modeling", "Business Intelligence", "Risk Analytics"],
        githubLink: "https://github.com/khushaldusane/Power-Bi/tree/main/Default%20Loan%20Dashboard"
    },

    mankind: {
        title: "Mankind Pharma Financial Model",
        category: "Financial Valuation & Forecasting",
        badgeClass: "badge-financial",
        image: "images/mankind.jpg",
        description: "In-depth corporate financial model and Discounted Cash Flow (DCF) valuation of Mankind Pharma, analyzing historical growth, margins, and intrinsic value.",
        highlights: [
            "Constructed a dynamic 3-statement integrated financial model projecting 5-year revenue and cash flows.",
            "Modeled Weighted Average Cost of Capital (WACC), Terminal Value multiples, and sensitivity scenarios for share price estimates.",
            "Evaluated key pharmaceutical business drivers, R&D expenditure returns, and domestic market share stability.",
            "Packaged findings into clear executive charts and valuation sensitivity matrices."
        ],
        technologies: ["Microsoft Excel", "DCF Valuation", "Financial Modeling", "Scenario Analysis", "Sensitivity Tables"],
        githubLink: "https://github.com/khushaldusane/Financial-Models-and-Excel-Dashboard/tree/main/Mankind%20Pharma"
    }
};

function openProjectModal(projectId) {
    const project = projectDetails[projectId];
    if (!project) return;

    const modal = document.getElementById("projectModal");
    const modalBody = document.getElementById("projectModalBody");

    const techBadgesHtml = project.technologies
        .map(tech => `<span class="project-tech-stack"><span>${tech}</span></span>`)
        .join("");

    const highlightsHtml = project.highlights
        .map(point => `<li>${point}</li>`)
        .join("");

    modalBody.innerHTML = `
        <img src="${project.image}" alt="${project.title}" class="modal-hero-img" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80';">
        <div class="modal-header-meta">
            <span class="project-badge ${project.badgeClass}">${project.category}</span>
        </div>
        <h2 class="modal-title">${project.title}</h2>
        <p class="modal-desc">${project.description}</p>

        <h4 class="modal-section-heading">Key Analytical Highlights</h4>
        <ul class="modal-key-points">
            ${highlightsHtml}
        </ul>

        <h4 class="modal-section-heading">Technologies Used</h4>
        <div class="modal-tech-list">
            ${techBadgesHtml}
        </div>

        <div class="modal-actions">
            <a href="${project.githubLink}" target="_blank" rel="noopener noreferrer" class="btn-primary">
                <i class="fa-brands fa-github"></i> View Full Repository
            </a>
            <button class="btn-secondary" onclick="closeProjectModal()">
                Close
            </button>
        </div>
    `;

    modal.classList.add("active");
    document.body.style.overflow = "hidden"; // Prevent background scroll
}

function closeProjectModal() {
    const modal = document.getElementById("projectModal");
    if (modal) {
        modal.classList.remove("active");
        document.body.style.overflow = "auto";
    }
}


/* ==========================================================================
   7. Certificate Lightbox Handlers
   ========================================================================== */
function openCertificatePopup(src, caption) {
    const popup = document.getElementById("certificate-popup");
    const popupImg = document.getElementById("popup-image");
    const popupCaption = document.getElementById("popup-caption");

    if (popup && popupImg) {
        popupImg.src = src;
        if (popupCaption) {
            popupCaption.textContent = caption || "Certificate Preview";
        }
        popup.classList.add("active");
        document.body.style.overflow = "hidden";
    }
}

function closeCertificatePopup() {
    const popup = document.getElementById("certificate-popup");
    if (popup) {
        popup.classList.remove("active");
        document.body.style.overflow = "auto";
    }
}


/* ==========================================================================
   8. Global Keydown Listener (ESC to close any modal)
   ========================================================================== */
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        closeProjectModal();
        closeCertificatePopup();
    }
});
