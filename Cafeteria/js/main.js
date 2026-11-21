import { buscarCafes } from './api.js';

import { 
        adicionarAoCarrinho, 
        listarCarrinho 
} from './carrinho.js';   

//função assíncrona para aguardar a resposta da API
async function iniciarSite() {

    const cafes = await buscarCafes();

    const root = document.getElementById('root');

    const titulo = document.createElement('h1');
    titulo.textContent = 'Château Café';
    titulo.className = 'text-center my-4';

    const container = document.createElement('div');
    container.className = 'container';
    const linha = document.createElement('div');
    linha.className = 'row g-4';

    const catalogo = document.createElement('div');
    catalogo.className = 'catalogo';

    const cabeca = document.createElement('div');
    cabeca.className = 'cabeca';

    const carrinho = document.createElement('button');
    carrinho.className = 'carrinho';

    carrinho.addEventListener("click", () => {
    window.location.href = "carrinho.html";
});

    const iconeCarrinho = document.createElement('img');

    const textoCarrinho = document.createElement('span');
    textoCarrinho.textContent = 'Carrinho';
    textoCarrinho.className = 'texto-carrinho';

    const contadorCarrinho = document.createElement('span');

    contadorCarrinho.className = 'badge rounded-pill text-bg-danger ms-2';

    // Atualiza a quantidade de produtos exibida no carrinho
    function atualizarContadorCarrinho() {

    const carrinhoAtual = listarCarrinho();

    const quantidadeTotal = carrinhoAtual.reduce(
        (total, cafe) => total + Number(cafe.quantity),
        0
    );

    contadorCarrinho.textContent = quantidadeTotal;

    }

    

    iconeCarrinho.src = '../assets/carrinho.svg';
    iconeCarrinho.className = 'icone-carrinho';

    // Percorre cada café recebido da API; cafe representa o item atual em cada repetição.
    cafes.forEach(cafe => {
        
        coluna.className = 'col-12 col-md-6 col-lg-4';
        const card = document.createElement('div');
         card.className = 'card h-100';

        const imagem = document.createElement('img');
        imagem.src = cafe.image;
        imagem.alt = cafe.title;
        imagem.className = 'card-img-top';
        imagem.style.height = '220px';
        imagem.style.objectFit = 'cover';

        const corpo = document.createElement('div');
        // Aplica o espaçamento e a estrutura visual de corpo de card do Bootstrap.
        corpo.className = 'card-body';

        const nome = document.createElement('h5');
        nome.className = 'card-title';
        nome.textContent = cafe.title;

        const descricao = document.createElement('p');
        descricao.className = 'card-text';
        descricao.textContent = cafe.description;

        const ingredientes = document.createElement('p');
        ingredientes.textContent =
            'Ingredientes: ' + cafe.ingredients.join(', ');

        const preco = document.createElement('p');
        preco.className = 'fw-bold';
        preco.textContent = cafe.price.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });

        const botaoAdicionar = document.createElement('button');

        botaoAdicionar.type = 'button';

        botaoAdicionar.className = 'btn btn-dark mt-2';

        botaoAdicionar.textContent = 'Adicionar ao carrinho';

        botaoAdicionar.addEventListener('click', () => {
            
            adicionarAoCarrinho(cafe);

            atualizarContadorCarrinho();

            alert(`${cafe.title} foi adicionado ao carrinho!`);
        });

        corpo.appendChild(nome);
        corpo.appendChild(descricao);
        corpo.appendChild(ingredientes);
        corpo.appendChild(preco);
        corpo.appendChild(botaoAdicionar);
        card.appendChild(imagem);
        card.appendChild(corpo);
        coluna.appendChild(card);
 
        linha.appendChild(coluna);

    });

    carrinho.appendChild(textoCarrinho);
    carrinho.appendChild(contadorCarrinho);
    carrinho.appendChild(iconeCarrinho);
    
    cabeca.appendChild(carrinho);

    atualizarContadorCarrinho();

    cabeca.appendChild(titulo);
    container.appendChild(cabeca);

    catalogo.appendChild(linha);
    container.appendChild(catalogo);    

    // Insere o contêiner com a grade de cards no elemento root.
    root.appendChild(container);

}

iniciarSite();
