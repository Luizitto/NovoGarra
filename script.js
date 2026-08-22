
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
            btnLerMais.classList.toggle('active');
            
            // Alterar o texto apenas do elemento .button-text
            const buttonText = btnLerMais.querySelector('.button-text');
            if (buttonText) {
                if (prfExpandivel.classList.contains('expandido')) {
                    buttonText.textContent = 'Ler menos';
                } else {
                    buttonText.textContent = 'Ler mais';
                }
            }
        });
    }

    const productPanels = document.querySelectorAll('.accordion-gallery .ag-panel');

    productPanels.forEach(panel => {
        panel.addEventListener('focus', () => {
            productPanels.forEach(item => item.classList.remove('is-active'));
            panel.classList.add('is-active');
        });

        panel.addEventListener('click', () => {
            productPanels.forEach(item => item.classList.remove('is-active'));
            panel.classList.add('is-active');
        });
    });

});



