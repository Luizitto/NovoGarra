
const morphSlider = document.querySelector('.morph-slider');

if (morphSlider) {
    const canvas = morphSlider.querySelector('.morph-slider-canvas');
    const stage = morphSlider.querySelector('.morph-slider-stage');
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
    const configuredAutoplayDelay = Number(morphSlider.dataset.autoplay);
    const autoplayDelay = Number.isFinite(configuredAutoplayDelay) && configuredAutoplayDelay > 0
        ? configuredAutoplayDelay
        : 10000;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let currentIndex = 0;
    let autoplayTimer;
    let animationFrame;
    let transitionStart = 0;
    let transitionFrom = 0;
    let transitionTo = 0;
    let pointerStartX = null;
    let pointerIsOver = false;
    let hasKeyboardFocus = false;

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
        stage.setAttribute('aria-label', `Banner ${currentIndex + 1} de ${slides.length}`);
        dots.forEach((dot, index) => {
            const active = index === currentIndex;
            dot.classList.toggle('is-active', active);
            dot.setAttribute('aria-current', active ? 'true' : 'false');
        });
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
        if (reducedMotion.matches || pointerIsOver || hasKeyboardFocus) return;

        autoplayTimer = setTimeout(() => {
            showSlide(currentIndex + 1, false);
            startAutoplay();
        }, autoplayDelay);
    }

    function pauseAutoplay() {
        clearTimeout(autoplayTimer);
    }

    function resumeAutoplay() {
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
    morphSlider.addEventListener('mouseenter', () => {
        pointerIsOver = true;
        pauseAutoplay();
    });
    morphSlider.addEventListener('mouseleave', () => {
        pointerIsOver = false;
        resumeAutoplay();
    });
    morphSlider.addEventListener('focusin', () => {
        hasKeyboardFocus = true;
        pauseAutoplay();
    });
    morphSlider.addEventListener('focusout', event => {
        if (!(event.relatedTarget instanceof Node) || !morphSlider.contains(event.relatedTarget)) {
            hasKeyboardFocus = false;
            resumeAutoplay();
        }
    });
    reducedMotion.addEventListener('change', startAutoplay);
    window.addEventListener('resize', resizeCanvas);
    images.forEach(image => image.addEventListener('load', resizeCanvas, { once: true }));
    updateControls();
    resizeCanvas();
    startAutoplay();
}


document.addEventListener('DOMContentLoaded', function () {
    const menuHamburguer = document.getElementById('menu-hambuguer');
    const navBar = document.querySelector('.nav-bar');
    const navLinks = document.querySelectorAll('.nav-bar a');

    if (menuHamburguer && navBar) {
        menuHamburguer.addEventListener('click', function () {
            const isExpanded = navBar.classList.toggle('active');
            menuHamburguer.setAttribute('aria-expanded', String(isExpanded));
            menuHamburguer.setAttribute('aria-label', isExpanded ? 'Fechar menu' : 'Abrir menu');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', function () {
                navBar.classList.remove('active');
                menuHamburguer.setAttribute('aria-expanded', 'false');
                menuHamburguer.setAttribute('aria-label', 'Abrir menu');
            });
        });
    }

    const counters = document.querySelectorAll('.servicos-resultado [data-count]');
    const numberFormatter = new Intl.NumberFormat('pt-BR');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    function animateCounter(counter) {
        const target = Number(counter.dataset.count);
        if (!Number.isFinite(target)) {
            console.error('Valor inválido no contador de resultados.', counter);
            return;
        }

        if (reducedMotion.matches) {
            counter.textContent = `+${numberFormatter.format(target)}`;
            return;
        }

        const duration = 1800;
        const startTime = performance.now();

        function updateCounter(currentTime) {
            const progress = Math.min((currentTime - startTime) / duration, 1);
            const easedProgress = 1 - (1 - progress) ** 3;
            const currentValue = Math.round(target * easedProgress);
            counter.textContent = `+${numberFormatter.format(currentValue)}`;

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        }

        counter.textContent = '+0';
        requestAnimationFrame(updateCounter);
    }

    if (counters.length) {
        if (reducedMotion.matches || !('IntersectionObserver' in window)) {
            counters.forEach(animateCounter);
        } else {
            const counterObserver = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateCounter(entry.target);
                        counterObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.35 });

            counters.forEach(counter => counterObserver.observe(counter));
        }
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
        const canPlayOnHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches
            && !reducedMotion.matches;
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

        if (canPlayOnHover) {
            sobreVideo.addEventListener('pointerenter', playSobreVideo);
            sobreVideo.addEventListener('pointerleave', function () {
                sobreVideo.pause();
            });
            sobreVideo.addEventListener('focus', playSobreVideo);
            sobreVideo.addEventListener('blur', function () {
                sobreVideo.pause();
            });
        } else {
            sobreVideo.controls = true;
        }
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
