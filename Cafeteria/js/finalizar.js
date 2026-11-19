import { listarCarrinho } from './carrinho.js';

//acessa o elemento html que o valor vai ser
const elementoTotal = document.getElementById('total-finalizar');

//puxa os dados do localstorage e armazena em valortotal. Se não tiver nada é zero
const valortotal = Number(localStorage.getItem('totalCarrinho')) || 0;

elementoTotal.textContent = "R$ "+valortotal;

//armazenando dados em constantes
const formulario = document.getElementById('pagamento');//campo do formulario de pagamento
const recebimento = document.getElementById('recebimento');//campo de entrega/retirada
const dadosEntrega = document.getElementById('dados-entrega');
const endereco = document.getElementById('endereco');
const numero = document.getElementById('numero');
const statusPedido = document.getElementById('status-pedido');

//função pra alterar o que aparece conforme o tipo de recebimento
function atualizarCamposEntrega() {
   
    if(recebimento.value === 'entrega'){

        dadosEntrega.hidden = false;

        endereco.required = true;

        numero.required = true;

    }else{
        
        dadosEntrega.hidden = true;

        endereco.required = false;

        numero.required = false;

        }
}

recebimento.addEventListener('change', atualizarCamposEntrega);//toda vez que a forma de recebimento mudar vai rodar a função

atualizarCamposEntrega();

//evento ao apertar botão de finalizar
formulario.addEventListener('submit', evento => {
    evento.preventDefault();//não recarregar a pagina ao enviar

    statusPedido.className = 'alert alert-info linha-completa mb-0';
    statusPedido.textContent = 'Compra finalizada!';

    localStorage.removeItem('carrinho');
    localStorage.removeItem('totalCarrinho');

    elementoTotal.textContent = "R$ 0";

})

//função de listar itens baseada no carrinho
function CarregarItens() {

    const Itens = listarCarrinho();//itens selecionados
    const avisocarrinhovazio = document.getElementById('avisocarrinhovazio');//aviso do carrinho vazio ao finalizar compra
    const pagamento = document.getElementById('pagamento');//area do formulario de pagamento
    const voltar = document.getElementById('voltarbotao');//botao de voltar
    const areacarrinhovazio = document.getElementById('areacarrinhovazio');//entra em ação se o carrinho tiver vazio
    const nomefinalizar = document.getElementById('nomefinalizar');//nome finalizar compra
    const valortotaltexto = document.getElementById('valortotaltexto');//texto do valor total
    const totalcarrinhof = document.getElementById('total-carrinho');
    
    if (Itens.length === 0) {// Verifica se a lista de itens está vazia

        areacarrinhovazio.appendChild(voltar);
        
        avisocarrinhovazio.className = 'carrinhovazio';

        avisocarrinhovazio.textContent = 'Não há itens para comprar.';

        localStorage.setItem('totalCarrinho', '0');

        elementoTotal.hidden = true;
        pagamento.hidden = true;
        valortotaltexto.hidden = true;
        nomefinalizar.hidden = true;
        totalcarrinhof.hidden = true;

        return;
    }

    Itens.forEach(cafe => {// Percorre os produtos 

        // Cria o card do produto
        const card = document.createElement('div');
        card.className = 'card carrinho-card mb-3';

        const corpo = document.createElement('div');
        corpo.className = 'card-body carrinho-item';

        // Exibe o nome do café
        const nome = document.createElement('h5');
        nome.className = 'item-nome';
        nome.textContent = cafe.title;

        const controles = document.createElement('div');
        controles.className = 'item-controles';

        // Exibe a quantidade
        const quantidade = document.createElement('span');
        quantidade.className = 'item-quantidade';
        quantidade.textContent = ` ${cafe.quantity}x`;

        controles.appendChild(quantidade);
        corpo.appendChild(controles);
        corpo.appendChild(nome);
        card.appendChild(corpo);

        avisocarrinhovazio.appendChild(card);
    });
}
CarregarItens();