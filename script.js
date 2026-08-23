// ======================================
// TÁBOR ZUBŘÍ - SCRIPT.JS
// ======================================

document.addEventListener("DOMContentLoaded", () => {

    // ======================================
    // AKTIVNÍ NAVIGAČNÍ ODKAZ
    // ======================================

    function setActiveLink() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav a');
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href').split('/').pop() || 'index.html';
            if (href === currentPage) {
                link.classList.add('active');
            }
        });
    }

    setActiveLink();

    // ======================================
    // MOBILNÍ MENU
    // ======================================

    const menuToggle = document.querySelector(".menu-toggle");
    const nav = document.querySelector(".nav");

    if (menuToggle && nav) {

        menuToggle.addEventListener("click", () => {
            nav.classList.toggle("nav-open");
            menuToggle.classList.toggle("active");
        });

        // Zavření menu po kliknutí na odkaz

        nav.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                nav.classList.remove("nav-open");
                menuToggle.classList.remove("active");
            });
        });

    }

    // ======================================
    // HEADER PŘI SCROLLOVÁNÍ
    // ======================================

    const header = document.querySelector(".header");

    function updateHeader() {

        if (!header) return;

        if (window.scrollY > 20) {
            header.classList.add("header-scrolled");
        } else {
            header.classList.remove("header-scrolled");
        }

    }

    updateHeader();
    window.addEventListener("scroll", updateHeader);

    // ======================================
    // PLYNULÉ SCROLLOVÁNÍ NA KOTVY
    // ======================================

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", function (e) {

            const targetId = this.getAttribute("href");

            if (targetId === "#") return;

            const target = document.querySelector(targetId);

            if (!target) return;

            e.preventDefault();

            const headerHeight = header ? header.offsetHeight : 0;
            const targetPosition =
                target.getBoundingClientRect().top +
                window.pageYOffset -
                headerHeight -
                16;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        });

    });

    // ======================================
    // AKTIVNÍ SEKCE V NAVIGACI
    // ======================================

    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll('.nav a[href^="#"]');

    if (sections.length && navLinks.length) {

        const observer = new IntersectionObserver(entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                const id = entry.target.getAttribute("id");

                navLinks.forEach(link => {
                    link.classList.remove("active");

                    if (link.getAttribute("href") === `#${id}`) {
                        link.classList.add("active");
                    }
                });

            });

        }, {
            threshold: 0.35
        });

        sections.forEach(section => observer.observe(section));

    }

    // ======================================
    // ANIMACE PŘI ZOBRAZENÍ SEKCE
    // ======================================

    const animatedItems = document.querySelectorAll(
        ".card, .quick-item, .about-content, .about-image, .feature-card, .cta-band, .section-card"
    );

    if (animatedItems.length) {

        const revealObserver = new IntersectionObserver(entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                entry.target.classList.add("is-visible");
                revealObserver.unobserve(entry.target);

            });

        }, {
            threshold: 0.15
        });

        animatedItems.forEach(item => {
            item.classList.add("reveal");
            revealObserver.observe(item);
        });

    }

    // ======================================
    // ESC ZAVŘE MOBILNÍ MENU
    // ======================================

    document.addEventListener("keydown", e => {

        if (e.key !== "Escape") return;

        nav?.classList.remove("nav-open");
        menuToggle?.classList.remove("active");

    });

    // ======================================
    // ZAVŘENÍ MENU PŘI ZMĚNĚ ŠÍŘKY
    // ======================================

    window.addEventListener("resize", () => {

        if (window.innerWidth > 768) {
            nav?.classList.remove("nav-open");
            menuToggle?.classList.remove("active");
        }

    });

});

document.addEventListener("DOMContentLoaded", () => {
    // Zde by měly být tvé stávající funkce (menu, scrollování atd.)

    // ======================================
    // LIGHTBOX PRO PLAKÁTY
    // ======================================

    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const posterCards = document.querySelectorAll('.poster-card');
    
    if (lightbox && posterCards.length > 0) {
        let currentIndex = 0;
        const images = [];

        // Načteme data ze všech plakátů v HTML
        posterCards.forEach((card, index) => {
            const img = card.querySelector('.poster-image');
            const year = card.querySelector('.poster-year').innerText;
            images.push({ src: img.src, year: year });

            // Po kliknutí na kartu se otevře lightbox na správné fotce
            card.addEventListener('click', () => {
                currentIndex = index;
                showLightbox();
            });
        });

        function showLightbox() {
            lightboxImg.src = images[currentIndex].src;
            lightboxCaption.innerText = `Plakát tábora ${images[currentIndex].year}`;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden'; // Zastaví scrollování stránky pod galerií
        }

        function closeLightbox() {
            lightbox.classList.remove('active');
            document.body.style.overflow = ''; // Obnoví scrollování
        }

        function nextImage(e) {
            if (e) e.stopPropagation();
            currentIndex = (currentIndex + 1) % images.length;
            showLightbox();
        }

        function prevImage(e) {
            if (e) e.stopPropagation();
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            showLightbox();
        }

        // Tlačítka myší
        document.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
        document.querySelector('.lightbox-next').addEventListener('click', nextImage);
        document.querySelector('.lightbox-prev').addEventListener('click', prevImage);
        
        // Zavření při kliknutí kamkoliv do prázdna
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox || e.target.classList.contains('lightbox-content')) {
                closeLightbox();
            }
        });

        // Ovládání pomocí klávesnice
        document.addEventListener('keydown', (e) => {
            if (!lightbox.classList.contains('active')) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') nextImage();
            if (e.key === 'ArrowLeft') prevImage();
        });
    }
});