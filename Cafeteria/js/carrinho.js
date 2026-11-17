
const CHAVE_CARRINHO = 'carrinho';

// Recupera os produtos armazenados
export function listarCarrinho() {

    const dados = localStorage.getItem(CHAVE_CARRINHO);

    return dados ? JSON.parse(dados) : [];

}

// Salva os produtos no localStorage
function salvarCarrinho(carrinho) {

    localStorage.setItem(
        CHAVE_CARRINHO,
        JSON.stringify(carrinho)
    );

}

// Adiciona um café ao carrinho
export function adicionarAoCarrinho(cafe) {

    const carrinho = listarCarrinho();

    // Verifica se o café já existe no carrinho
    const cafeExistente = carrinho.find(
        item => String(item.id) === String(cafe.id)
    );

    if (cafeExistente) {

        // Aumenta a quantidade
        cafeExistente.quantity++;

    } else {

        // Adiciona um novo café
        carrinho.push({
            id: cafe.id,
            title: cafe.title,
            price: cafe.price,
            quantity: 1
        });

    }

    // Atualiza o armazenamento
    salvarCarrinho(carrinho);

}

// Remove uma unidade do café
export function removerDoCarrinho(id) {

    let carrinho = listarCarrinho();

    const cafeExistente = carrinho.find(
        item => String(item.id) === String(id)
    );

    if (cafeExistente) {

        cafeExistente.quantity--;

        // Se a quantidade chegar a zero, remove o produto
        if (cafeExistente.quantity <= 0) {

            carrinho = carrinho.filter(
                item => String(item.id) !== String(id)
            );

        }

    }

    

    salvarCarrinho(carrinho);

}
