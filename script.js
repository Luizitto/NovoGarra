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
});