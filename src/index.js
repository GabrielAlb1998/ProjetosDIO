function identificarBandeira(numeroCartao) {
    const prefixos = {
        "Visa": ["4"],
        "Mastercard": ["51", "52", "53", "54", "55"],
        "Dinners Club": ["36", "38"],
        "Discover": ["6011", "65"],
        "JCB": ["35"],
        "American Express": ["34", "37"]
    };

    for (const [bandeira, listaPrefixos] of Object.entries(prefixos)) {
        for (const prefixo of listaPrefixos) {
            if (numeroCartao.startsWith(prefixo)) {
                return bandeira;
            }
        }
    }
    return "Desconhecido";
}

function validarCartao(numeroCartao) {
    numeroCartao = numeroCartao.replace(/\s+/g, '');
    if (!/^\d+$/.test(numeroCartao)) {
        return false;
    }

    let soma = 0;
    let reverso = numeroCartao.split('').reverse().join('');
    for (let i = 0; i < reverso.length; i++) {
        let n = parseInt(reverso[i], 10);
        if (i % 2 === 1) {
            n *= 2;
            if (n > 9) n -= 9;
        }
        soma += n;
    }
    return soma % 10 === 0;
}

// Exemplo de uso:
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

readline.question("Digite o número do cartão: ", (numero) => {
    const bandeira = identificarBandeira(numero);
    const valido = validarCartao(numero);
    console.log(`Bandeira: ${bandeira}`);
    console.log(valido ? "Cartão válido!" : "Cartão inválido!");
    readline.close();
});