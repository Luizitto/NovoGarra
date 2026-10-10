
const botoes = document.querySelectorAll('.filtros button');
const cards = document.querySelectorAll('.product-card');

botoes.forEach(botao => {
    botao.addEventListener('click', () => {
        document.querySelector('.filtros .ativo')?.classList.remove('ativo');
        botao.classList.add('ativo');

        const filtro = botao.dataset.filtro;
        cards.forEach(card => {
            card.style.display = (filtro === 'todos' || card.classList.contains(filtro)) ? '' : 'none';
        });
    });
});

function abrirModal(id) {
    document.getElementById(id).style.display = 'block';
}

function fecharModal(id) {
    document.getElementById(id).style.display = 'none';
}

window.onclick = function (event) {
    if (event.target instanceof Element && event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const menuButton = document.getElementById("menu-hambuguer");
    const menuHeader = document.querySelector(".nav-bar");

    if (!menuButton || !menuHeader) return;

    menuButton.addEventListener("click", function () {
        const isExpanded = menuHeader.classList.toggle("active");
        menuButton.setAttribute("aria-expanded", String(isExpanded));
        menuButton.setAttribute("aria-label", isExpanded ? "Fechar menu" : "Abrir menu");
    });

    menuHeader.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", function () {
            menuHeader.classList.remove("active");
            menuButton.setAttribute("aria-expanded", "false");
            menuButton.setAttribute("aria-label", "Abrir menu");
        });
    });
});