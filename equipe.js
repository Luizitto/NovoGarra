const carousel = document.querySelector(".carousel");
const arrowBtns = document.querySelectorAll(".wrapper i");

let isDragging = false, startX, startScrollLeft;

// Clique nas setas
arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        const cardWidth = carousel.querySelector(".card").offsetWidth + 16; // largura + gap
        carousel.scrollLeft += btn.id === "left" ? -cardWidth : cardWidth;
    });
});

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


setInterval(() => {
    const card = carousel.querySelector(".card");
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
}, 3000);


carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
carousel.addEventListener("mouseup", dragStop);
carousel.addEventListener("mouseleave", dragStop);


