// Cookies management functions
const COOKIES_CONSENT_KEY = "cookies-consent";
const COOKIES_BANNER = document.getElementById("cookies-banner");
const COOKIES_MODAL = document.getElementById("cookies-modal");

function initCookies() {
    const consent = localStorage.getItem(COOKIES_CONSENT_KEY);
    if (!consent) {
        COOKIES_BANNER?.classList.add("show");
    }
}

window.acceptAllCookies = function() {
    const preferences = {
        necessary: true,
        analytics: true,
        marketing: true,
        timestamp: new Date().toISOString()
    };
    localStorage.setItem(COOKIES_CONSENT_KEY, JSON.stringify(preferences));
    COOKIES_BANNER?.classList.remove("show");
    COOKIES_MODAL?.classList.remove("show");
};

window.openCookiesModal = function() {
    COOKIES_MODAL?.classList.add("show");
};

window.rejectCookies = function() {
    const preferences = {
        necessary: true,
        analytics: false,
        marketing: false,
        timestamp: new Date().toISOString()
    };
    localStorage.setItem(COOKIES_CONSENT_KEY, JSON.stringify(preferences));
    COOKIES_BANNER?.classList.remove("show");
    COOKIES_MODAL?.classList.remove("show");
};

window.saveCookiesPreferences = function() {
    const preferences = {
        necessary: true,
        analytics: document.getElementById("cookie-analytics")?.checked || false,
        marketing: document.getElementById("cookie-marketing")?.checked || false,
        timestamp: new Date().toISOString()
    };
    localStorage.setItem(COOKIES_CONSENT_KEY, JSON.stringify(preferences));
    COOKIES_BANNER?.classList.remove("show");
    COOKIES_MODAL?.classList.remove("show");
};

// Zavření modálu kliknutím mimo něj
COOKIES_MODAL?.addEventListener("click", (e) => {
    if (e.target === COOKIES_MODAL) {
        COOKIES_MODAL.classList.remove("show");
    }
});

// Initialize cookies banner
document.addEventListener("DOMContentLoaded", initCookies);
