// Exporta a função para que outros arquivos, como main.js, possam importá-la e utilizá-la.
// async faz a função sempre retornar uma Promise; dentro dela, await pode aguardar operações assíncronas.
export async function buscarCafes() {

    // Inicia um bloco para tentar buscar e interpretar os dados; erros ocorridos nele serão tratados pelo catch.
    try {

        // fetch faz uma requisição HTTP GET para o endereço da API e retorna uma Promise com a resposta HTTP.
        // await pausa esta função até a Promise do fetch ser resolvida, sem bloquear o navegador.
        const resposta = await fetch('http://localhost:3000/cafes');

        // Converte o corpo da resposta, que está em JSON, para valores JavaScript; json() também retorna uma Promise.
        // await espera a conversão terminar antes de guardar os dados em cafes.
        const cafes = await resposta.json();

        // Devolve os dados ao código que chamou a função; a Promise de buscarCafes será resolvida com este valor.
        return cafes;

    // Se fetch ou a leitura do JSON gerar uma exceção, a execução segue para este bloco com o erro recebido.
    } catch (erro) {

        // Mostra no console uma mensagem e os detalhes do erro, ajudando a diagnosticar problemas na requisição.
        // Como não há return neste catch, em caso de erro a Promise da função é resolvida com undefined.
        console.error('Erro ao buscar os cafés:', erro);

    }

}
