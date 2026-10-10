
const morphSlider = document.querySelector('.morph-slider');

if (morphSlider) {
    const canvas = morphSlider.querySelector('.morph-slider-canvas');
    const stage = morphSlider.querySelector('.morph-slider-stage');
    const caption = morphSlider.querySelector('.morph-slider-caption-text');
    const dots = [...morphSlider.querySelectorAll('.morph-slider-dot')];
    const previousButton = morphSlider.querySelector('.morph-slider-btn-prev');
    const nextButton = morphSlider.querySelector('.morph-slider-btn-next');
    const context = canvas.getContext('2d');
    const slides = [
        { source: './src/img/conteiner/banner1.png' },
        { source: './src/img/conteiner/banner2.png' },
        { source: './src/img/conteiner/banner3.png' }
    ];
    const images = slides.map(({ source }) => {
        const image = new Image();
        image.src = source;
        return image;
    });
    const autoplayDelay = Number(morphSlider.dataset.autoplay) || 10000;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let currentIndex = 0;
    let autoplayTimer;
    let animationFrame;
    let transitionStart = 0;
    let transitionFrom = 0;
    let transitionTo = 0;
    let pointerStartX = null;

    function drawImage(image, opacity = 1) {
        if (!image.complete || !image.naturalWidth) return;
        const scale = Math.max(canvas.width / image.naturalWidth, canvas.height / image.naturalHeight);
        const width = image.naturalWidth * scale;
        const height = image.naturalHeight * scale;
        const x = (canvas.width - width) / 2;
        const y = (canvas.height - height) / 2;
        context.globalAlpha = opacity;
        context.drawImage(image, x, y, width, height);
    }

    function render() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        if (transitionStart && !reducedMotion.matches) {
            const progress = Math.min((performance.now() - transitionStart) / 700, 1);
            const easedProgress = progress * (2 - progress);
            drawImage(images[transitionFrom]);
            drawImage(images[transitionTo], easedProgress);
            if (progress < 1) {
                animationFrame = requestAnimationFrame(render);
                return;
            }
        } else {
            drawImage(images[currentIndex]);
        }
        transitionStart = 0;
        context.globalAlpha = 1;
    }

    function resizeCanvas() {
        const bounds = canvas.getBoundingClientRect();
        const pixelRatio = window.devicePixelRatio || 1;
        canvas.width = Math.round(bounds.width * pixelRatio);
        canvas.height = Math.round(bounds.height * pixelRatio);
        render();
    }

    function updateControls() {
        dots.forEach((dot, index) => {
            const active = index === currentIndex;
            dot.classList.toggle('is-active', active);
            dot.setAttribute('aria-current', active ? 'true' : 'false');
        });
        caption.textContent = slides[currentIndex].text;
        caption.classList.remove('is-active');
        requestAnimationFrame(() => caption.classList.add('is-active'));
    }

    function showSlide(index, restartAutoplay = true) {
        const nextIndex = (index + slides.length) % slides.length;
        if (nextIndex === currentIndex) return;
        transitionFrom = currentIndex;
        transitionTo = nextIndex;
        currentIndex = nextIndex;
        transitionStart = performance.now();
        cancelAnimationFrame(animationFrame);
        render();
        updateControls();
        if (restartAutoplay) startAutoplay();
    }

    function startAutoplay() {
        clearTimeout(autoplayTimer);
        autoplayTimer = setTimeout(() => showSlide(currentIndex + 1, false), autoplayDelay);
    }

    function pauseAndResumeAutoplay() {
        clearTimeout(autoplayTimer);
        startAutoplay();
    }

    previousButton.addEventListener('click', () => showSlide(currentIndex - 1));
    nextButton.addEventListener('click', () => showSlide(currentIndex + 1));
    dots.forEach((dot, index) => dot.addEventListener('click', () => showSlide(index)));
    stage.addEventListener('keydown', event => {
        if (event.key === 'ArrowLeft') showSlide(currentIndex - 1);
        if (event.key === 'ArrowRight') showSlide(currentIndex + 1);
    });
    stage.addEventListener('pointerdown', event => {
        pointerStartX = event.clientX;
    });
    stage.addEventListener('pointerup', event => {
        if (pointerStartX === null) return;
        const distance = event.clientX - pointerStartX;
        if (Math.abs(distance) > 45) showSlide(currentIndex + (distance < 0 ? 1 : -1));
        pointerStartX = null;
    });
    morphSlider.addEventListener('mouseenter', pauseAndResumeAutoplay);
    morphSlider.addEventListener('mouseleave', startAutoplay);
    window.addEventListener('resize', resizeCanvas);
    images.forEach(image => image.addEventListener('load', resizeCanvas, { once: true }));
    updateControls();
    resizeCanvas();
    startAutoplay();
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

    const sobreVideo = document.querySelector('.sobre-video-section .sobre-video');

    if (sobreVideo) {
        const playSobreVideo = function () {
            const playRequest = sobreVideo.play();

            if (playRequest) {
                playRequest.catch(function (error) {
                    if (error.name !== 'AbortError') {
                        console.error('Não foi possível reproduzir o vídeo da seção Sobre Nós.', error);
                    }
                });
            }
        };

        sobreVideo.addEventListener('pointerenter', playSobreVideo);
        sobreVideo.addEventListener('pointerleave', function () {
            sobreVideo.pause();
        });
        sobreVideo.addEventListener('focus', playSobreVideo);
        sobreVideo.addEventListener('blur', function () {
            sobreVideo.pause();
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

