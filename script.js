javascript: (function () {
    /** 
     * DOM MANIPULATION TOOLS
     * Utility refactoring for element scanning and cleanup.
     */
    const Utils = {
        // Find the element with the highest z-index (often the overlay)
        locateTopmost: () => {
            let candidates = document.getElementsByTagName('div');
            let maxZ = 0;
            let target = null;
            for (let el of candidates) {
                let z = window.getComputedStyle(el).zIndex;
                if (z !== 'auto' && !isNaN(z)) {
                    let val = parseInt(z);
                    if (val > maxZ) {
                        maxZ = val;
                        target = el;
                    }
                }
            }
            return target;
        },

        // Deep cookie cleanup to bypass reading limits
        flushStorage: () => {
            let cookies = document.cookie.split("; ");
            for (let i = 0; i < cookies.length; i++) {
                let domainParts = window.location.hostname.split(".");
                while (domainParts.length > 0) {
                    let base = encodeURIComponent(cookies[i].split(";")[0].split("=")[0]) +
                        '=; expires=Thu, 01-Jan-1970 00:00:01 GMT; domain=' + domainParts.join('.') + ' ;path=';
                    let pathParts = location.pathname.split('/');
                    document.cookie = base + '/';
                    while (pathParts.length > 0) {
                        document.cookie = base + pathParts.join('/');
                        pathParts.pop();
                    };
                    domainParts.shift();
                }
            }
        }
    };

    /**
     * SITE-SPECIFIC FIXES
     */
    const Fixers = {
        'youtube.com': () => {
            const popup = document.querySelector('ytd-popup-container');
            if (popup) popup.remove();
        },

        'imgur.com': () => {
            // Hide ads and annoying wrappers
            const styles = 'display: none !important;';
            document.querySelectorAll('.Ad.up-show, .Footer-wrapper, .EmeraldBanner, .Accolade-background, .NewPostsNotification')
                .forEach(el => el.style.cssText += styles);

            // Neutralize sponsored links
            document.querySelectorAll('a[href*="ad"]').forEach(link => {
                link.href = 'https://www.imgur.com/';
                link.target = '_self';
            });
        },

        'weather.com': () => {
            document.querySelectorAll('div').forEach(div => {
                if (div.className.includes('sp_') || div.id.includes('sp_')) div.remove();
            });
        },

        'nytimes.com': () => {
            document.querySelectorAll('[id*="gateway-content"], [id*="wrapper"], .css-1bd8bfl').forEach(el => el.remove());
            document.querySelectorAll('div').forEach(el => {
                if (el.style.background.includes('gradient')) el.style.background = 'none';
                if (el.style.overflow === 'hidden' || el.classList.contains('css-mcm29f')) {
                    el.style.setProperty('overflow', 'auto', 'important');
                }
            });
        },

        'standard.net': () => {
            document.querySelectorAll('#subscription-modal, .modal-backdrop, .redacted-overlay, .subscription-required')
                .forEach(el => el.style.setProperty('display', 'none', 'important'));
            document.querySelectorAll('.hide').forEach(el => el.classList.remove('hide'));
            document.querySelectorAll('.modal-open').forEach(el => el.style.overflow = 'auto');
        },

        'medium.com': () => {
            if (document.body.innerHTML.includes('medium.com')) {
                localStorage.clear(); // Drastic reset for viewing limits
                Utils.flushStorage();
                window.location.reload();
            }
        }
    };

    /**
     * MAIN EXECUTION
     */
    const currentHost = window.location.hostname;

    // Remove the generic overlay if present (from the original code)
    const genericOverlay = document.getElementById('adblock-overlay');
    if (genericOverlay) genericOverlay.remove();

    // Execute the site-specific fix if the domain matches
    Object.keys(Fixers).forEach(site => {
        if (currentHost.includes(site)) {
            Fixers[site]();
        }
    });

    // If we're not on a specific site, try to remove the topmost element
    if (!Object.keys(Fixers).some(site => currentHost.includes(site))) {
        const topOne = Utils.locateTopmost();
        if (topOne && topOne !== document.body && topOne !== document.documentElement) {
            topOne.remove();
        }
    }

    // Restore universal scrolling
    const restoreScroll = () => {
        const css = 'overflow: auto !important; overflow-y: scroll !important;';
        document.body.style.cssText += css;
        document.documentElement.style.cssText += css;
    };
    restoreScroll();

    // Scroll listener (essential for Imgur and dynamic loading)
    if (currentHost.includes('imgur.com')) {
        window.addEventListener('scroll', Fixers['imgur.com']);
    }

})();
