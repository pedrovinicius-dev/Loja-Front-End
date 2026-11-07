
// Importa a função responsável por buscar os cafés na API; o caminho indica que api.js está na mesma pasta.
import { buscarCafes } from './api.js';

// Declara uma função assíncrona para que seja possível aguardar a resposta da API sem bloquear o restante do navegador.
async function iniciarSite() {

    // Chama buscarCafes e aguarda sua Promise; cafes receberá os dados quando a busca terminar.
    const cafes = await buscarCafes();

    // Procura no HTML o elemento que tem id="root", onde o conteúdo da página será inserido.
    const root = document.getElementById('root');

    // Cria um elemento de título <h1> em memória; ele ainda não foi adicionado à página.
    const titulo = document.createElement('h1');
    // Define o texto que será exibido dentro do título.
    titulo.textContent = 'Cafeteria Autoria Web';
    // Adiciona classes do Bootstrap para centralizar o texto e aplicar margens verticais.
    titulo.className = 'text-center my-4';

    // Cria uma <div> que servirá como contêiner externo dos cards.
    const container = document.createElement('div');
    // Aplica a classe container do Bootstrap, que organiza o conteúdo e limita sua largura.
    container.className = 'container';

    // Cria uma <div> que agrupará as colunas dos cafés.
    const linha = document.createElement('div');
    // Aplica classes do Bootstrap para criar uma linha e espaçar seus itens.
    linha.className = 'row g-4';

    // Percorre cada café recebido da API; cafe representa o item atual em cada repetição.
    cafes.forEach(cafe => {

        // Cria uma coluna para posicionar o card deste café na grade da página.
        const coluna = document.createElement('div');
        // Faz a coluna ocupar a largura inteira em telas pequenas, metade em telas médias e um terço em telas grandes.
        coluna.className = 'col-12 col-md-6 col-lg-4';

        // Cria o elemento visual do card do Bootstrap.
        const card = document.createElement('div');
        // Aplica as classes de card e altura completa para manter os cards alinhados.
        card.className = 'card h-100';

        // Cria uma imagem para ilustrar o café.
        const imagem = document.createElement('img');
        // Usa o endereço da imagem informado nos dados deste café.
        imagem.src = cafe.image;
        // Define um texto alternativo com o título do café, útil para acessibilidade e quando a imagem não carrega.
        imagem.alt = cafe.title;
        // Aplica a aparência de imagem no topo de um card do Bootstrap.
        imagem.className = 'card-img-top';
        // Define a altura da imagem em 220 pixels.
        imagem.style.height = '220px';
        // Faz a imagem preencher a área definida sem distorcer, cortando o excesso quando necessário.
        imagem.style.objectFit = 'cover';

        // Cria a área interna do card, onde ficarão título, descrição, ingredientes e preço.
        const corpo = document.createElement('div');
        // Aplica o espaçamento e a estrutura visual de corpo de card do Bootstrap.
        corpo.className = 'card-body';

        // Cria um subtítulo HTML para exibir o nome do café.
        const nome = document.createElement('h5');
        // Aplica a aparência de título de card do Bootstrap.
        nome.className = 'card-title';
        // Preenche o subtítulo com o título recebido da API.
        nome.textContent = cafe.title;

        // Cria um parágrafo para a descrição do café.
        const descricao = document.createElement('p');
        // Aplica a aparência de texto de card do Bootstrap.
        descricao.className = 'card-text';
        // Insere no parágrafo a descrição recebida da API.
        descricao.textContent = cafe.description;


        // Cria um parágrafo para apresentar a lista de ingredientes.
        const ingredientes = document.createElement('p');
        // Junta os ingredientes em uma única string separados por vírgula e adiciona o rótulo "Ingredientes:".
        ingredientes.textContent =
            'Ingredientes: ' + cafe.ingredients.join(', ');

        // Cria um parágrafo que exibirá o preço do café.
        const preco = document.createElement('p');
        // Aplica negrito ao preço usando uma classe utilitária do Bootstrap.
        preco.className = 'fw-bold';
        // Formata o valor numérico como moeda brasileira (R$) e usa a formatação local pt-BR.
        preco.textContent = cafe.price.toLocaleString('pt-BR', {
            // Informa ao formatador que o valor deve aparecer como moeda.
            style: 'currency',
            // Define o código internacional da moeda como Real brasileiro.
            currency: 'BRL'
        });

        // Adiciona o título ao corpo do card; appendChild move o elemento para dentro do pai.
        corpo.appendChild(nome);
        // Adiciona a descrição depois do título.
        corpo.appendChild(descricao);
        // Adiciona os ingredientes depois da descrição.
        corpo.appendChild(ingredientes);
        // Adiciona o preço depois dos ingredientes.
        corpo.appendChild(preco);

        // Coloca a imagem no card, antes do corpo.
        card.appendChild(imagem);
        // Coloca o corpo (com os textos) no card.
        card.appendChild(corpo);

        coluna.appendChild(card);
        // Adiciona a coluna à linha que agrupa todos os cafés.
        linha.appendChild(coluna);

    });

    // Depois que todos os cafés foram percorridos, adiciona a linha ao contêiner externo.
    container.appendChild(linha);

    // Insere o título no elemento root da página.
    root.appendChild(titulo);
    // Insere o contêiner com a grade de cards no elemento root.
    root.appendChild(container);

}

// Executa a função que busca os cafés e monta o conteúdo da página.
iniciarSite();
