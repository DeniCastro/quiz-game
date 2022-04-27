/*VARIAVEIS DE CONTROLE DO JOGO */
let perguntasFeitas = [];

// PERGUNTAS DO JOGO
const perguntas = [
    // PERGUNTA 0
    {pergunta: "O que é, o que é? Feito para andar e não anda?",
    respostas: ["A casa", "Luvas", "Parede", "A rua"],
    correta: "resp3"
    },
    // PERGUNTA 1
    {pergunta: "O que é, o que é? Nunca volta, embora nunca tenha ido?",
    respostas: ["O dia", "O passado.", "O depois", "O amanhã"],
    correta: "resp1"
    },
    // PERGUNTA 2
    {pergunta: "O que é, o que é? Anda com os pés na cabeça.",
    respostas: ["O pente", "O Piolho", "Chapéu", "O Homem aranha"],
    correta: "resp1"
    },
    // PERGUNTA 3
    {pergunta: "O que é, o que é? Quanto mais cresce, mais baixo fica?",
    respostas: ["O Cabelo", "Dentes", "Roupas", "Olhos"],
    correta: "resp0"
    },
]

var qtdPerguntas = perguntas.length - 1;

gerarPergunta(qtdPerguntas);


function gerarPergunta(maxPerguntas) {
    // GERAR UM NUMERO ALEATÓRIO
    let aleatorio = (Math.random() * maxPerguntas).toFixed();
    // CONVERTER PARA NÚMERO
    aleatorio = Number(aleatorio);
    // MOSTRAR NO CONSOLE A PERGUNTA SORTEADA
    console.log('A pergunta sorteada foi a: ' + aleatorio);

    // VERIFICAR SE A PERGUNTA SORTEADA JÁ FOI FEITA
    if (!perguntasFeitas.includes(aleatorio)) {
        // COLOCAR COMO PERGUNTA FEITA
        perguntasFeitas.push(aleatorio);

        // PREENCHER O HTML COM OS DADOS DA QUESTÃO SORTEADA
        var p_selecionada = perguntas[aleatorio].pergunta;
        console.log(p_selecionada);

        // ALIMENTAR A PERGUNTA VINDA DO SORTEIO
        $("#pergunta").html(p_selecionada);
        $("#pergunta").attr('data-indice', aleatorio);

        // COLORAR A RESPOSTAS
        for(var i = 0; i < 4;  i++) {
            $("#resp" + i).html(perguntas[aleatorio].respostas[i]);
        }


        /* 
        var resp0 = perguntas[aleatorio].respostas[0]; 
        var resp1 = perguntas[aleatorio].respostas[1];
        var resp2 = perguntas[aleatorio].respostas[2];
        var resp3 = perguntas[aleatorio].respostas[3];

        $("#resp0").html(resp0);
        $("#resp1").html(resp1);
        $("#resp2").html(resp2);
        $("#resp3").html(resp3); */

        // EMBARALHAR AS RESPOSTAS
        var pai = $("#respostas");
        var botoes = pai.children();

        for(var i = 1; i < botoes.length; i++) {
            pai.append(botoes.eq(Math.floor(Math.random() * botoes.length)));
        }
    } else {
        // SE A PERGUNTA JÁ FOI FEITA
        console.log('A Pergunta já foi feita. SOrteando...');
        if (perguntasFeitas.length < qtdPerguntas +1) {
            return gerarPergunta(maxPerguntas);
        } else {
            console.log('Acabaram as perguntas!');
            
            $('#quiz').addClass('oculto');
            $('#mensagem').html('Parabéns, você venceu!')
            $('#status').removeClass('oculto');
        }
    }
}

$('.resposta').click(function () {
    if($("#quiz").attr('data-status') !== 'travado') {
    // PERCORRER TODAS AS RESPOSTAS E DESMARCAR A CLASSE SELECIONADA
    resetaBotoes();

    // ADICIONAR A CLASSE SELECIONADA
    $(this).addClass('selecionada');
    }
});

$("#confirm").click(function () {
    // PEGAR O ÍNDICE DA RESPOSTA CERTA
    var indice = $("#pergunta").attr('data-indice');
 
    // QUAL É A RESPOSTA CERTA
    var respCerta = perguntas[indice].correta;

    // QUAL FOI A RESPOSTA ESCOLHIDA PELO USUÁRIO
    $('.resposta').each(function () {
        if ($(this).hasClass('selecionada')) {
            var respostaEscolhida = $(this).attr('id');

            if (respCerta == respostaEscolhida) {
                console.log('Acertou!');
                proximaPergunta();
            } else {
                console.log('Errou!');
                $("#quiz").attr('data-status', 'travado');
                $("#confirm").addClass('oculto');
                $('#'+ respCerta).addClass('correta');
                $('#'+ respostaEscolhida).removeClass('selecionada');
                $('#'+ respostaEscolhida).addClass('errada');
                
                // DAR ALGUNS SEGUNDOS PARA MOSTRAR GAME OVER
                setTimeout(function() {
                    gameOver();
                }, 3000);
            }
        }
    })
});

function newGame () {
    $("#confirm").removeClass('oculto');
    $("#quiz").attr('data-status', 'ok');
    perguntasFeitas = [];
    resetaBotoes();
    gerarPergunta(qtdPerguntas);
    $('#quiz').removeClass('oculto');
    $('#status').addClass('oculto');
}

function proximaPergunta() {
    resetaBotoes();
    gerarPergunta(qtdPerguntas);
}

function resetaBotoes() {
    // PERCORRER TODAS AS RESPOSTAS E DESMARCAR A CLASSE SELECIONADA
    $('.resposta').each(function (){
        if($(this).hasClass('selecionada')) {
            $(this).removeClass('selecionada');
        }
        if($(this).hasClass('correta')) {
            $(this).removeClass('correta');
        }
        if($(this).hasClass('errada')) {
            $(this).removeClass('errada');
        }
    });
}

function gameOver() {
    $('#quiz').addClass('oculto');
    $('#mensagem').html('Game Over')
    $('#status').removeClass('oculto');
}

$('#novoJogo').click(function () {
    newGame();
});