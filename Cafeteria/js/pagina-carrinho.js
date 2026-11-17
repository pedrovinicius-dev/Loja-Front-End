
import {
    listarCarrinho,
    adicionarAoCarrinho,
    removerDoCarrinho
} from './carrinho.js';

// Recupera os elementos da página
const listaCarrinho = document.getElementById('lista-carrinho');
const totalCarrinho = document.getElementById('total-carrinho');

// Formata valores para a moeda brasileira
function formatarPreco(valor) {
    return Number(valor).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });
}

// Exibe os produtos armazenados no carrinho
function renderizarCarrinho() {

    const carrinho = listarCarrinho();

    // Limpa a lista antes de atualizar a exibição
    listaCarrinho.innerHTML = '';

    // Verifica se o carrinho está vazio
    if (carrinho.length === 0) {

        listaCarrinho.textContent = 'Seu carrinho está vazio.';

        totalCarrinho.textContent = 'Total: R$ 0,00';

        return;
    }

    let total = 0;

    // Percorre os produtos do carrinho
    carrinho.forEach(cafe => {

        // Cria o card do produto
        const card = document.createElement('div');
        card.className = 'card mb-3';

        const corpo = document.createElement('div');
        corpo.className = 'card-body d-flex justify-content-between align-items-center';

        // Exibe o nome do café
        const nome = document.createElement('h5');
        nome.textContent = cafe.title;

        // Calcula o subtotal do produto
        const subtotal = Number(cafe.price) * Number(cafe.quantity);

        const preco = document.createElement('p');
        preco.textContent = formatarPreco(subtotal);

        // Exibe a quantidade
        const quantidade = document.createElement('span');
        quantidade.textContent = `Quantidade: ${cafe.quantity}`;

        // Botão para adicionar uma unidade
        const botaoAdicionar = document.createElement('button');
        botaoAdicionar.textContent = '+';
        botaoAdicionar.className = 'btn btn-outline-success btn-sm me-2';

        botaoAdicionar.addEventListener('click', () => {
            adicionarAoCarrinho(cafe);
            renderizarCarrinho();
        });

        // Botão para remover uma unidade
        const botaoRemover = document.createElement('button');
        botaoRemover.textContent = '-';
        botaoRemover.className = 'btn btn-outline-danger btn-sm';

        botaoRemover.addEventListener('click', () => {
            removerDoCarrinho(cafe.id);
            renderizarCarrinho();
        });

        // Organiza os elementos do card
        corpo.appendChild(nome);
        corpo.appendChild(preco);
        corpo.appendChild(quantidade);
        corpo.appendChild(botaoAdicionar);
        corpo.appendChild(botaoRemover);

        card.appendChild(corpo);

        listaCarrinho.appendChild(card);

        // Soma o subtotal ao valor total
        total += subtotal;

    });

    // Exibe o valor total da compra
    totalCarrinho.textContent = `Total: ${formatarPreco(total)}`;

}

// Executa a função ao carregar a página
renderizarCarrinho();
