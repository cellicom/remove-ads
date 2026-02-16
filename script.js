javascript: (function () {
    /* Rimuove l'overlay */
    var overlay = document.getElementById('adblock-overlay');
    if (overlay) {
        overlay.remove();
    }

    /* Ripristina lo scroll del body */
    document.body.style.overflow = 'auto';
    document.documentElement.style.overflow = 'auto'; // Per sicurezza su alcuni siti

})();