const modal = document.getElementById('modal');
const modalImage = modal.querySelector('.modal-image');
const modalCaption = modal.querySelector('.modal-caption');
const modalClose = modal.querySelector('.modal-close');
const modalPrev = modal.querySelector('.modal-prev');
const modalNext = modal.querySelector('.modal-next');

// Updated galleries with reliable image URLs
const galleries = {
    freefire: [
        { src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzxd5f6owtc5TnHEQFm04eg1ZMeozaHey9NbeGFW4Ilga6diS49GVi64LkfY0lK8awlObi', caption: 'Free Fire Battle Royale Action' },
        { src: 'https://cdn.now.gg/apps-content/com.dts.freefireth/icon/free-fire.png', caption: 'Free Fire Online Gameplay' },
        { src: 'https://st1.techlusive.in/wp-content/uploads/2024/08/garena-free-fire.jpg', caption: 'Free Fire Hero Character' }
    ],
    guitar: [
        { src: 'https://www.native-instruments.com/typo3temp/pics/img-welcome-hero-session-guitarist-acoustic-sunburst-hero-8962c37bdf97270091c31b8c1bb265fd-m@2x.jpg', caption: 'Acoustic Guitar' },
        { src: 'https://plus.unsplash.com/premium_photo-1682265683254-3b08ea75ce40?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Z3VpdGFyJTIwcGxheWVyfGVufDB8fDB8fHww', caption: 'Electric Guitar on Stage' },
        { src: 'https://www.emmacolbertart.com/wp-content/uploads/2024/03/Hand2_Finished.jpg', caption: 'Hands Playing Guitar' }
    ]
};

let currentGallery = null;
let currentIndex = 0;

function openGallery(galleryName) {
    currentGallery = galleries[galleryName];
    if (!currentGallery || currentGallery.length === 0) return;
    currentIndex = 0;
    updateModalImage();
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    modal.focus();
    // Set aria-pressed true on button
    document.querySelectorAll('.hobby-item').forEach(el => el.setAttribute('aria-pressed', 'false'));
    if(galleryName === 'freefire') {
        document.getElementById('freefire-hobby').setAttribute('aria-pressed','true');
    } else if(galleryName === 'guitar') {
        document.getElementById('guitarist-hobby').setAttribute('aria-pressed','true');
    }
}

function updateModalImage() {
    const imageData = currentGallery[currentIndex];
    modalImage.src = imageData.src;
    modalImage.alt = imageData.caption;
    modalCaption.textContent = imageData.caption;
}

function closeModal() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    currentGallery = null;
    // Reset aria-pressed on hobbies
    document.querySelectorAll('.hobby-item').forEach(el => el.setAttribute('aria-pressed', 'false'));
}

function prevImage() {
    if (!currentGallery) return;
    currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
    updateModalImage();
}

function nextImage() {
    if (!currentGallery) return;
    currentIndex = (currentIndex + 1) % currentGallery.length;
    updateModalImage();
}

// Event listeners for hobbies
document.getElementById('freefire-hobby').addEventListener('click', () => openGallery('freefire'));
document.getElementById('guitarist-hobby').addEventListener('click', () => openGallery('guitar'));

modalClose.addEventListener('click', closeModal);
modalPrev.addEventListener('click', prevImage);
modalNext.addEventListener('click', nextImage);

modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
});

document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('active')) return;
    if (e.key === 'Escape') {
        closeModal();
    } else if (e.key === 'ArrowLeft') {
        prevImage();
    } else if (e.key === 'ArrowRight') {
        nextImage();
    }
});

// Animate skill bars when section enters viewport
const skills = document.querySelectorAll('.skill-level');
function animateSkills() {
    skills.forEach(skill => {
        const parent = skill.parentElement.parentElement;
        const rect = parent.getBoundingClientRect();
        if (rect.top <= window.innerHeight && rect.bottom >= 0) {
            skill.classList.add('skill-level-filled');
        }
    });
}

// Fade in sections on scroll
const fadeElems = document.querySelectorAll('.fade-in');
function fadeIn() {
    fadeElems.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.9) {
            el.classList.add('visible');
        }
    });
}

window.addEventListener('scroll', () => {
    animateSkills();
    fadeIn();
});
window.addEventListener('load', () => {
    animateSkills();
    fadeIn();
});
