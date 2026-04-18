/* ================================================
   OLIVER BRAND PHOTOGRAPHY — JAVASCRIPT
   ================================================
   This file powers the lightbox, dropdown navigation,
   and mobile menu. You do not need to edit anything
   in this file.
   ================================================ */


document.addEventListener('DOMContentLoaded', function () {


    /* ============================================
       DROPDOWN NAVIGATION
       (Gallery menu expands within the sidebar)
       ============================================ */

    const navDropdown    = document.querySelector('.nav-dropdown');
    const dropdownToggle = document.querySelector('.nav-dropdown-toggle');

    if (navDropdown && dropdownToggle) {

        dropdownToggle.addEventListener('click', function (e) {
            e.preventDefault();
            navDropdown.classList.toggle('open');
        });

        /* Close dropdown if user clicks outside the sidebar */
        document.addEventListener('click', function (e) {
            if (!navDropdown.contains(e.target)) {
                navDropdown.classList.remove('open');
            }
        });
    }


    /* ============================================
       MOBILE HAMBURGER MENU
       ============================================ */

    const hamburger     = document.getElementById('hamburger');
    const sidebar       = document.getElementById('sidebar');
    const mobileOverlay = document.getElementById('mobile-overlay');

    if (hamburger && sidebar && mobileOverlay) {

        /* Open/close the sidebar */
        hamburger.addEventListener('click', function () {
            sidebar.classList.toggle('mobile-open');
            mobileOverlay.classList.toggle('active');
        });

        /* Close when tapping the dim overlay */
        mobileOverlay.addEventListener('click', function () {
            sidebar.classList.remove('mobile-open');
            mobileOverlay.classList.remove('active');
        });
    }


    /* ============================================
       LIGHTBOX (full-screen photo viewer)
       ============================================ */

    const lightbox        = document.getElementById('lightbox');
    const lightboxImg     = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn        = document.getElementById('lightbox-close');
    const prevBtn         = document.getElementById('lightbox-prev');
    const nextBtn         = document.getElementById('lightbox-next');

    let currentIndex = 0;
    let galleryItems = [];

    function openLightbox(index) {
        currentIndex = index;
        const item = galleryItems[currentIndex];
        lightboxImg.src = item.dataset.src;
        lightboxImg.alt = item.querySelector('img').alt;
        lightboxCaption.textContent = item.dataset.caption || '';
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
        lightboxImg.src = '';
    }

    function showPrev() {
        currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
        openLightbox(currentIndex);
    }

    function showNext() {
        currentIndex = (currentIndex + 1) % galleryItems.length;
        openLightbox(currentIndex);
    }

    galleryItems = Array.from(document.querySelectorAll('.gallery-item'));

    galleryItems.forEach(function (item, index) {
        item.addEventListener('click', function () {
            openLightbox(index);
        });
    });

    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    if (prevBtn)  prevBtn.addEventListener('click', showPrev);
    if (nextBtn)  nextBtn.addEventListener('click', showNext);

    /* Click the dark background to close */
    if (lightbox) {
        lightbox.addEventListener('click', function (e) {
            if (e.target === lightbox) closeLightbox();
        });
    }

    /* Keyboard controls */
    document.addEventListener('keydown', function (e) {
        if (!lightbox || !lightbox.classList.contains('active')) return;
        if (e.key === 'Escape')     closeLightbox();
        if (e.key === 'ArrowLeft')  showPrev();
        if (e.key === 'ArrowRight') showNext();
    });


});
