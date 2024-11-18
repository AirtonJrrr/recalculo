function mostrarSecao(secao) {
    document.getElementById('legado').style.display = 'none';
    document.getElementById('e2a2').style.display = 'none';
    document.getElementById(secao).style.display = 'block';
}

function calcularLegado() {
    var credito = parseFloat(document.getElementById("legadoCredito").value); // R$100,00 por crédito
    var bolsa = parseFloat(document.getElementById("legadoBolsa").value); // 50%
    var creditosTotais = parseFloat(document.getElementById("legadoCreditosTotais").value); // 21 créditos

    // Cálculo da parcela fixa para os primeiros 20 créditos
    var valorParcelaFixa = credito * 20; // 20 créditos x R$100 = R$2000,00
    var valorParcelaComDesconto = valorParcelaFixa * (1 - bolsa / 100); // Aplicando desconto de 50%

    // Cálculo do valor adicional para o crédito extra (21 créditos - 20 créditos)
    var valorAdicional = (creditosTotais - 20) * credito; // 1 crédito extra x R$100 = R$100
    var valorAdicionalComDesconto = valorAdicional * (1 - bolsa / 100); // Desconto de 50% aplicado no crédito adicional

    // Total faltante nas parcelas 2 e 3
    var totalFaltante = valorAdicionalComDesconto * 2; // R$50 * 2 = R$100

    // Retroativo será a diferença do valor adicional com desconto dividido por 3
    var retroativo = totalFaltante / 3; // R$100 / 3 = R$33,33

    // Montando os valores das parcelas
    var bruto = [
        valorParcelaFixa, // Primeira Parcela: R$2000,00
        valorParcelaComDesconto, // Segunda Parcela: R$1000,00
        valorParcelaComDesconto, // Terceira Parcela: R$1000,00
        valorParcelaComDesconto + valorAdicionalComDesconto + retroativo, // Quarta Parcela: R$1050,00 + R$33,33 = R$1083,33
        valorParcelaComDesconto + valorAdicionalComDesconto + retroativo, // Quinta Parcela: R$1050,00 + R$33,33 = R$1083,33
        valorParcelaComDesconto + valorAdicionalComDesconto + retroativo  // Sexta Parcela: R$1050,00 + R$33,33 = R$1083,33
    ];

    var comBolsa = [
        valorParcelaFixa, // Primeira Parcela: R$2000,00
        valorParcelaComDesconto, // Segunda Parcela: R$1000,00
        valorParcelaComDesconto, // Terceira Parcela: R$1000,00
        valorParcelaComDesconto + valorAdicionalComDesconto + retroativo, // Quarta Parcela: R$1083,33
        valorParcelaComDesconto + valorAdicionalComDesconto + retroativo, // Quinta Parcela: R$1083,33
        valorParcelaComDesconto + valorAdicionalComDesconto + retroativo  // Sexta Parcela: R$1083,33
    ];

    // Gerando a tabela para exibição
    var tabela = "<table><tr><th>Parcela</th><th>Valor Bruto (R$)</th><th>Valor com Desconto (R$)</th></tr>";
    var parcelas = ["Primeira Parcela", "Segunda Parcela", "Terceira Parcela", "Quarta Parcela", "Quinta Parcela", "Sexta Parcela"];
    for (var i = 0; i < 6; i++) {
        tabela += "<tr><td>" + parcelas[i] + "</td><td>R$" + bruto[i].toFixed(2) + "</td><td>R$" + comBolsa[i].toFixed(2) + "</td></tr>";
    }
    tabela += "</table>";

    document.getElementById("legadoResultado").innerHTML = tabela;
}

function calcularE2A2() {
    var mensalidade = parseFloat(document.getElementById("e2a2Mensalidade").value);
    var bolsa = parseFloat(document.getElementById("e2a2Bolsa").value);
    var tipo = document.getElementById("e2a2Tipo").value;
    var porcentagem = parseFloat(document.getElementById("e2a2Porcentagem").value);

    var valorComBolsa = mensalidade * (1 - bolsa / 100);
    var valorAdicional = valorComBolsa * (porcentagem / 100);
    var valorPendente = valorAdicional * 2;
    var retroativo = valorPendente / 3;

    // Mantém o código original com os cálculos corretos
    var bruto = [mensalidade, mensalidade, mensalidade];
    var comBolsa = [mensalidade, valorComBolsa, valorComBolsa];

    if (tipo === "mais") {
        for (var i = 3; i < 6; i++) {
            bruto.push(mensalidade + mensalidade * (porcentagem / 100)); // Valor bruto com reajuste
            comBolsa.push(valorComBolsa + valorAdicional + retroativo); // Valor com desconto e retroativo
        }
    } else if (tipo === "menos") {
        for (var i = 3; i < 6; i++) {
            bruto.push(mensalidade - mensalidade * (porcentagem / 100)); // Valor bruto com reajuste
            comBolsa.push(valorComBolsa - valorAdicional - retroativo); // Valor com desconto e retroativo
        }
    }

    var tabela = "<table><tr><th>Parcela</th><th>Valor Bruto (R$)</th><th>Valor com Desconto (R$)</th></tr>";
    var parcelas = ["Primeira Parcela", "Segunda Parcela", "Terceira Parcela", "Quarta Parcela", "Quinta Parcela", "Sexta Parcela"];
    for (var i = 0; i < 6; i++) {
        tabela += "<tr><td>" + parcelas[i] + "</td><td>R$" + bruto[i].toFixed(2) + "</td><td>R$" + comBolsa[i].toFixed(2) + "</td></tr>";
    }
    tabela += "</table>";

    document.getElementById("e2a2Resultado").innerHTML = tabela;
}