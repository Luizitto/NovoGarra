const carousel = document.querySelector(".carousel");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

let isDragging = false, startX, startScrollLeft;
let autoplayTimer;
let pointerIsOver = false;
let hasKeyboardFocus = false;

// Arraste com o mouse
const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add("dragging");
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
};

const dragging = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const positionDiff = e.pageX - startX;
    carousel.scrollLeft = startScrollLeft - positionDiff;
};

const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging");
};


function advanceCarousel() {
    const card = carousel.querySelector(".card");
    if (!card) return;

    const cardWidth = card.offsetWidth + 16;

    // Verifica se estamos no final (com margem de erro)
    const atEnd = Math.ceil(carousel.scrollLeft + carousel.offsetWidth) >= carousel.scrollWidth;

    if (atEnd) {
        // Restaura suavemente ao início
        carousel.scrollTo({
            left: 0,
            behavior: "smooth"
        });
    } else {
        // Avança 1 card
        carousel.scrollBy({
            left: cardWidth,
            behavior: "smooth"
        });
    }
}

function startAutoplay() {
    clearInterval(autoplayTimer);
    if (reducedMotion.matches || pointerIsOver || hasKeyboardFocus) return;
    autoplayTimer = setInterval(advanceCarousel, 5000);
}

carousel.addEventListener("mouseenter", () => {
    pointerIsOver = true;
    startAutoplay();
});
carousel.addEventListener("mouseleave", () => {
    pointerIsOver = false;
    startAutoplay();
});
carousel.addEventListener("focusin", () => {
    hasKeyboardFocus = true;
    startAutoplay();
});
carousel.addEventListener("focusout", event => {
    if (!(event.relatedTarget instanceof Node) || !carousel.contains(event.relatedTarget)) {
        hasKeyboardFocus = false;
        startAutoplay();
    }
});
reducedMotion.addEventListener("change", startAutoplay);
startAutoplay();

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
carousel.addEventListener("mouseup", dragStop);
carousel.addEventListener("mouseleave", dragStop);
