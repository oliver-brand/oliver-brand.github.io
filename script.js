/* ================================================
   OLIVER BRAND PHOTOGRAPHY — LIGHTBOX SCRIPT
   ================================================
   This file powers the full-screen photo viewer.
   You do not need to edit anything in this file.
   ================================================ */

const lightbox       = document.getElementById('lightbox');
const lightboxImg    = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const closeBtn       = document.getElementById('lightbox-close');
const prevBtn        = document.getElementById('lightbox-prev');
const nextBtn        = document.getElementById('lightbox-next');

let currentIndex = 0;
let galleryItems = [];

/* Open the lightbox at a specific photo */
function openLightbox(index) {
    currentIndex = index;
    const item = galleryItems[currentIndex];
    lightboxImg.src    = item.dataset.src;
    lightboxImg.alt    = item.querySelector('img').alt;
    lightboxCaption.textContent = item.dataset.caption || '';
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

/* Close the lightbox */
function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    lightboxImg.src = '';
}

/* Navigate to previous photo */
function showPrev() {
    currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
    openLightbox(currentIndex);
}

/* Navigate to next photo */
function showNext() {
    currentIndex = (currentIndex + 1) % galleryItems.length;
    openLightbox(currentIndex);
}

/* Initialise everything once the page has loaded */
document.addEventListener('DOMContentLoaded', function () {

    /* --- DROPDOWN NAVIGATION --- */
    const navDropdown     = document.querySelector('.nav-dropdown');
    const dropdownToggle  = document.querySelector('.nav-dropdown-toggle');

    if (navDropdown && dropdownToggle) {

        /* Toggle open/closed when the button is clicked */
        dropdownToggle.addEventListener('click', function (e) {
            e.preventDefault();
            navDropdown.classList.toggle('open');
        });

        /* Close the dropdown if the user clicks anywhere outside it */
        document.addEventListener('click', function (e) {
            if (!navDropdown.contains(e.target)) {
                navDropdown.classList.remove('open');
            }
        });
    }


    galleryItems = Array.from(document.querySelectorAll('.gallery-item'));

    /* Click any photo to open it full screen */
    galleryItems.forEach(function (item, index) {
        item.addEventListener('click', function () {
            openLightbox(index);
        });
    });

    /* Button controls */
    closeBtn.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', showPrev);
    nextBtn.addEventListener('click', showNext);

    /* Click the dark background to close */
    lightbox.addEventListener('click', function (e) {
        if (e.target === lightbox) closeLightbox();
    });

    /* Keyboard controls: Escape to close, arrow keys to navigate */
    document.addEventListener('keydown', function (e) {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape')      closeLightbox();
        if (e.key === 'ArrowLeft')   showPrev();
        if (e.key === 'ArrowRight')  showNext();
    });

});
