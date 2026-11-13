const botoesFiltro = document.querySelectorAll('.filtros__menu button');
const cardsProduto = document.querySelectorAll('.product-card');
const botoesModal = document.querySelectorAll('[data-modal-target]');
const modais = document.querySelectorAll('.modal');
const ultimoFocoModal = new WeakMap();

function aplicarFiltro(filtro) {
    cardsProduto.forEach(card => {
        card.hidden = filtro !== 'todos' && !card.classList.contains(filtro);
    });
}

botoesFiltro.forEach(botao => {
    botao.addEventListener('click', () => {
        botoesFiltro.forEach(opcao => {
            const selecionado = opcao === botao;
            opcao.classList.toggle('ativo', selecionado);
            opcao.setAttribute('aria-pressed', String(selecionado));
        });

        aplicarFiltro(botao.dataset.filtro);
    });
});

botoesModal.forEach(botao => {
    botao.addEventListener('click', () => {
        const modal = document.getElementById(botao.dataset.modalTarget);
        if (!(modal instanceof HTMLDialogElement)) return;

        ultimoFocoModal.set(modal, botao);
        if (modal.open) return;

        modal.showModal();
        modal.querySelector('.close')?.focus({ preventScroll: true });
    });
});

modais.forEach(modal => {
    modal.querySelector('.close')?.addEventListener('click', () => modal.close());

    modal.addEventListener('click', event => {
        if (event.target === modal) modal.close();
    });

    modal.addEventListener('close', () => {
        const botaoAnterior = ultimoFocoModal.get(modal);
        if (botaoAnterior instanceof HTMLElement) botaoAnterior.focus({ preventScroll: true });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const menuButton = document.getElementById('menu-hambuguer');
    const menuHeader = document.querySelector('.nav-bar');

    if (!menuButton || !menuHeader) return;

    menuButton.addEventListener('click', () => {
        const isExpanded = menuHeader.classList.toggle('active');
        menuButton.setAttribute('aria-expanded', String(isExpanded));
        menuButton.setAttribute('aria-label', isExpanded ? 'Fechar menu' : 'Abrir menu');
    });

    menuHeader.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menuHeader.classList.remove('active');
            menuButton.setAttribute('aria-expanded', 'false');
            menuButton.setAttribute('aria-label', 'Abrir menu');
        });
    });
});
