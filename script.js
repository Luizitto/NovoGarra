
let count = 1;
document.getElementById("radio1").checked = true

const carouselDelay = 10000;
let carouselInterval = null;
let carouselResumeTimeout = null;

function startCarousel() {
    stopCarousel();
    carouselInterval = setInterval(NextImg, carouselDelay);
}

function stopCarousel() {
    if (carouselInterval !== null) {
        clearInterval(carouselInterval);
        carouselInterval = null;
    }
}

function resetCarouselAfterInteraction() {
    stopCarousel();
    if (carouselResumeTimeout !== null) {
        clearTimeout(carouselResumeTimeout);
    }
    carouselResumeTimeout = setTimeout(startCarousel, carouselDelay);
}

startCarousel();

function NextImg() {
    count++;
    if (count > 3) {
        count = 1;
    }

    document.getElementById("radio" + count).checked = true

}


let lastScroll = 0;
const header = document.querySelector('header');


window.addEventListener('scroll', function () {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
        header.classList.remove('header-hide', 'header-opacity');
        return;
    }

    if (currentScroll > lastScroll) {
        // Rolando para baixo
        header.classList.add('header-hide');
        header.classList.remove('header-opacity');
    } else {
        // Rolando para cima
        header.classList.remove('header-hide');
        header.classList.add('header-opacity');
    }
    lastScroll = currentScroll;
});

document.addEventListener('DOMContentLoaded', function () {
    const menuHamburguer = document.getElementById('menu-hambuguer');
    const navBar = document.querySelector('.nav-bar');
    const navLinks = document.querySelectorAll('.nav-bar a');

    if (menuHamburguer && navBar) {
        menuHamburguer.addEventListener('click', function () {
            navBar.classList.toggle('active');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', function () {
                navBar.classList.remove('active');
                console.log('Link clicado, menu fechado');
            });
        });
    }

    const carousel = document.querySelector('.slider');
    const radioButtons = document.querySelectorAll('input[name="radio-btn"]');

    const resetCarouselOnInteraction = () => resetCarouselAfterInteraction();

    if (carousel) {
        carousel.addEventListener('click', resetCarouselOnInteraction);
    }

    radioButtons.forEach(radio => {
        radio.addEventListener('click', resetCarouselOnInteraction);
    });

    // Funcionalidade do botão "Ler Mais"
    const btnLerMais = document.getElementById('btnLerMais');
    const prfExpandivel = document.querySelector('.prf-expandivel');

    if (btnLerMais && prfExpandivel) {
        btnLerMais.addEventListener('click', function () {
            prfExpandivel.classList.toggle('expandido');
            
            // Alterar o texto do botão
            if (prfExpandivel.classList.contains('expandido')) {
                btnLerMais.textContent = 'Ler menos';
            } else {
                btnLerMais.textContent = 'Ler mais';
            }
        });
    }
});