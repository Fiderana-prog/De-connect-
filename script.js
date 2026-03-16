const track = document.getElementById('carousel-track');
const original = [...track.querySelectorAll('li')];
const total = original.length; // 10
const navbar = document.getElementById("navbar");
const burgerBtn = document.getElementById('burger-btn');
const burgerIcon = document.getElementById('burger-icon');
const mobileMenu = document.getElementById('mobile-menu');
let isOpen = false;

window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        navbar.classList.add("bg-white","backdrop-blur-md","shadow-lg","top-0");
    } else {
        navbar.classList.remove("bg-white","backdrop-blur-md","shadow-lg","top-0");
    }
});

burgerBtn.addEventListener('click', () => {
    isOpen = !isOpen;
    mobileMenu.style.maxHeight = isOpen ? mobileMenu.scrollHeight + 'px' : '0';
    burgerIcon.classList.toggle('fa-bars', !isOpen);
    burgerIcon.classList.toggle('fa-xmark', isOpen);
});
track.prepend(original[total - 1].cloneNode(true)); 
track.appendChild(original[0].cloneNode(true));    

let current = 1;
let isAnimating = false;

const setPosition = (animate) => {
    track.style.transition = animate ? 'transform 500ms ease-in-out' : 'none';
    track.style.transform = `translateX(-${current * 100}%)`;
};

setPosition(false);

const go = (dir) => {
    if (isAnimating) return;
        isAnimating = true;

        current += dir;
        setPosition(true);

        setTimeout(() => {

            if (current === total + 1) {
                current = 1;
                setPosition(false);
            }
            if (current === 0) {
                current = total;
                setPosition(false);
            }
            isAnimating = false;
        }, 510);
    };

document.getElementById('prev').addEventListener('click', () => go(-1));
document.getElementById('next').addEventListener('click', () => go(1));

    // Auto-play
let autoPlay = setInterval(() => go(1), 3000);

// Réinitialise l'auto-play après clic manuel
document.getElementById('prev').addEventListener('click', () => {
    clearInterval(autoPlay);
    autoPlay = setInterval(() => go(1), 3000);
});
document.getElementById('next').addEventListener('click', () => {
    clearInterval(autoPlay);
    autoPlay = setInterval(() => go(1), 3000);
});