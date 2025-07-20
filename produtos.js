
const botoes = document.querySelectorAll('.filtros button');
const cards = document.querySelectorAll('.product-card');

botoes.forEach(botao => {
    botao.addEventListener('click', () => {
        document.querySelector('.filtros .ativo').classList.remove('ativo');
        botao.classList.add('ativo');

        const filtro = botao.dataset.filtro;
        cards.forEach(card => {
            card.style.display = (filtro === 'todos' || card.classList.contains(filtro)) ? 'block' : 'none';
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
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
}
