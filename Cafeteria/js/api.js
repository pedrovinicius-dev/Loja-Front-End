export async function buscarCafes() {

    // Inicia um bloco para tentar buscar e interpretar os dados
    try {
        const resposta = await fetch('http://localhost:3000/cafes');
        const cafes = await resposta.json();
        return cafes;

    } catch (erro) {
        console.error('Erro ao buscar os cafés:', erro);
    }

}
