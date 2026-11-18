//acessa o elemento html que o valor vai ser
const elementoTotal = document.getElementById('total-finalizar');

//puxa os dados do localstorage e armazena em valortotal. Se não tiver nada é zero
const valortotal = Number(localStorage.getItem('totalCarrinho')) || 0;

//exibe na tela o valor
elementoTotal.textContent = "R$ "+valortotal;

//armazenando dados em constantes
const formulario = document.getElementById('pagamento');
const recebimento = document.getElementById('recebimento');
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

atualizarCamposEntrega();//roda a função

//evento ao apertar botão de finalizar
formulario.addEventListener('submit', evento => {
    evento.preventDefault();//não recarregar a pagina ao enviar

    statusPedido.className = 'alert alert-info linha-completa mb-0';//classe bootstrap
    statusPedido.textContent = 'Compra finalizada!';

    localStorage.removeItem('carrinho');
    localStorage.removeItem('totalCarrinho');

    elementoTotal.textContent = "R$ 0";

})

