// ========== CLASSE PERSONAGEM ==========
class Personagem {
    constructor(nome, descricao, imagem, corBarra) {
        this.nome = nome;
        this.descricao = descricao;
        this.imagem = imagem;
        this.corBarra = corBarra;
        this.pontuacao = 0;
    }

    adicionarPontos(pontos) {
        this.pontuacao += pontos;
    }

    resetarPontuacao() {
        this.pontuacao = 0;
    }
}

// ========== CLASSE QUIZ ==========
class Quiz {
    constructor(personagens, perguntas) {
        this.personagens = personagens;
        this.perguntas = perguntas;
        this.indicePerguntaAtual = 0;
        this.opcaoSelecionada = null;
    }

    get perguntaAtual() {
        return this.perguntas[this.indicePerguntaAtual];
    }

    get totalPerguntas() {
        return this.perguntas.length;
    }

    get progresso() {
        return ((this.indicePerguntaAtual) / this.totalPerguntas) * 100;
    }

    selecionarOpcao(indiceOpcao) {
        this.opcaoSelecionada = indiceOpcao;
    }

    registrarResposta() {
        if (this.opcaoSelecionada === null) return false;

        let opcao = this.perguntaAtual.opcoes[this.opcaoSelecionada];

        // Percorrer os pontos de cada personagem e somar
        for (let i = 0; i < this.personagens.length; i++) {
            this.personagens[i].adicionarPontos(opcao.pontos[i]);
        }

        this.opcaoSelecionada = null;
        return true;
    }

    avancarPergunta() {
        this.indicePerguntaAtual++;
    }

    get quizFinalizado() {
        return this.indicePerguntaAtual >= this.totalPerguntas;
    }

    get vencedor() {
        let melhor = this.personagens[0];
        for (let i = 1; i < this.personagens.length; i++) {
            if (this.personagens[i].pontuacao > melhor.pontuacao) {
                melhor = this.personagens[i];
            }
        }
        return melhor;
    }

    resetar() {
        this.indicePerguntaAtual = 0;
        this.opcaoSelecionada = null;
        for (let i = 0; i < this.personagens.length; i++) {
            this.personagens[i].resetarPontuacao();
        }
    }
}

// ========== DADOS DOS PERSONAGENS ==========
// pontos[0] = Omni-Man, pontos[1] = Thragg, pontos[2] = Invencível
const personagens = [
    new Personagem(
        "Omni-Man",
        "Você é Nolan Grayson, o Omni-Man! Guerreiro Viltrumita de elite e pai de Mark Grayson. " +
        "Você carrega uma lealdade inquestionável às suas raízes, mas no fundo existe um conflito interno entre o dever imposto e os laços afetivos que criou. " +
        "Sua força é monumental, e sua determinação, inabalável — mas as decisões mais difíceis estão sempre à sua espera.",
        "Omni_Man.png",
        "#e63946"
    ),
    new Personagem(
        "Thragg",
        "Você é Thragg, o Grande Regente de Viltrum! " +
        "Líder supremo e o ser mais poderoso da raça Viltrumita. " +
        "Você não conhece piedade, hesitação nem fraqueza. " +
        "Sua visão é clara: expansão, domínio e perfeição. " +
        "Frio, calculista e absolutamente implacável — você faz o que for necessário para garantir a sobrevivência e a grandeza do seu povo.",
        "Thragg.png",
        "#ffd60a"
    ),
    new Personagem(
        "Invencível",
        "Você é Mark Grayson, o Invencível! " +
        "Metade humano, metade Viltrumita, você é o verdadeiro herói desta história. " +
        "Cresceu acreditando nos valores da Terra, e mesmo diante das maiores adversidades, escolhe defender o que é certo. " +
        "Você luta não pela conquista, mas pela proteção — e é essa diferença que te torna verdadeiramente invencível.",
        "Invencible.png",
        "#4ecdc4"
    )
];

// ========== PERGUNTAS DO QUESTIONÁRIO ==========
const perguntas = [
    {
        texto: "Qual é a sua maior motivação para lutar?",
        opcoes: [
            { texto: "Honrar o legado e as ordens do meu povo, mesmo que isso doa.", pontos: [3, 2, 1] },
            { texto: "Garantir a sobrevivência e a supremacia da minha raça acima de tudo.", pontos: [2, 3, 1] },
            { texto: "Proteger as pessoas que amo e os inocentes ao meu redor.", pontos: [1, 1, 3] }
        ]
    },
    {
        texto: "Como você lida com um inimigo que não pode ser derrotado facilmente?",
        opcoes: [
            { texto: "Analiso friamente e elimino sem hesitar, independentemente do custo.", pontos: [2, 3, 1] },
            { texto: "Busco uma estratégia que minimize baixas e preserve o máximo possível.", pontos: [1, 1, 3] },
            { texto: "Avanço com força máxima, confiando no meu treinamento e disciplina.", pontos: [3, 2, 1] }
        ]
    },
    {
        texto: "O que você faria se descobrisse que tudo em que acreditou era uma mentira?",
        opcoes: [
            { texto: "Ficaria abalado, mas lutaria para encontrar minha própria verdade.", pontos: [1, 1, 3] },
            { texto: "Rejeitaria qualquer sentimentalismo e continuaria cumprindo minha missão.", pontos: [2, 3, 1] },
            { texto: "Confrontaria dolorosamente essa realidade, carregando o peso da culpa.", pontos: [3, 1, 2] }
        ]
    },
    {
        texto: "Como você enxerga os seres humanos da Terra?",
        opcoes: [
            { texto: "São fracos, mas têm potencial — recursos que podem ser utilizados.", pontos: [3, 2, 1] },
            { texto: "São inferiores. A Terra é apenas mais um planeta a ser dominado.", pontos: [1, 3, 1] },
            { texto: "São minha família, meus amigos — vale tudo para protegê-los.", pontos: [1, 1, 3] }
        ]
    },
    {
        texto: "Qual é o seu maior ponto fraco?",
        opcoes: [
            { texto: "Os sentimentos que desenvolvi por seres que nunca deveriam importar.", pontos: [3, 1, 2] },
            { texto: "A dificuldade em confiar nos outros e trabalhar em equipe.", pontos: [2, 3, 1] },
            { texto: "A impulsividade e o peso emocional das minhas escolhas.", pontos: [1, 1, 3] }
        ]
    },
    {
        texto: "Você recebe uma ordem direta que vai contra seus princípios. O que faz?",
        opcoes: [
            { texto: "Sigo a ordem — a disciplina existe por um motivo.", pontos: [3, 2, 1] },
            { texto: "Questiono e, se necessário, desafio quem deu a ordem.", pontos: [1, 1, 3] },
            { texto: "Sigo somente se fortalecer o objetivo maior. Nada mais importa.", pontos: [2, 3, 1] }
        ]
    },
    {
        texto: "Como você se relaciona com seu passado?",
        opcoes: [
            { texto: "Carrego com peso e culpa, mas tento aprender com os erros.", pontos: [3, 1, 2] },
            { texto: "O passado é irrelevante. Só importa o que construirei no futuro.", pontos: [1, 3, 1] },
            { texto: "Ele me moldou — aceito quem sou e sigo em frente.", pontos: [1, 1, 3] }
        ]
    },
    {
        texto: "Qual seria sua estratégia para dominar uma situação de crise?",
        opcoes: [
            { texto: "Tomar controle imediatamente com força e autoridade absolutas.", pontos: [2, 3, 1] },
            { texto: "Avaliar cada detalhe e agir com precisão calculada.", pontos: [3, 2, 1] },
            { texto: "Trabalhar junto com aliados e criar soluções colaborativas.", pontos: [1, 1, 3] }
        ]
    },
    {
        texto: "O que define um verdadeiro líder para você?",
        opcoes: [
            { texto: "Alguém que inspire pelo exemplo, com força e sacrifício.", pontos: [3, 2, 1] },
            { texto: "Alguém que proteja seu povo com empatia e determinação.", pontos: [1, 1, 3] },
            { texto: "Alguém que domine com poder absoluto e visão inabalável.", pontos: [1, 3, 1] }
        ]
    },
    {
        texto: "Qual frase resume melhor a sua filosofia de vida?",
        opcoes: [
            { texto: '"O forte domina. Os demais seguem ou sucumbem."', pontos: [2, 3, 1] },
            { texto: '"Eu protejo os que não podem se proteger — esse é o meu propósito."', pontos: [1, 1, 3] },
            { texto: '"Vivo entre dois mundos, carregando a dor de ambos."', pontos: [3, 1, 2] }
        ]
    }
];

// ========== INSTANCIAR O QUIZ ==========
const quiz = new Quiz(personagens, perguntas);

// ========== FUNÇÕES DE CONTROLE ==========

function iniciarQuiz() {
    document.getElementById("telaInicial").classList.add("oculto");
    document.getElementById("telaQuiz").classList.remove("oculto");
    renderizarPergunta();
}

function renderizarPergunta() {
    let pergunta = quiz.perguntaAtual;

    // Atualizar número da pergunta
    document.getElementById("numeroQuestao").textContent =
        `Pergunta ${quiz.indicePerguntaAtual + 1} de ${quiz.totalPerguntas}`;

    // Atualizar barra de progresso
    document.getElementById("barraFill").style.width = quiz.progresso + "%";

    // Atualizar texto da pergunta
    document.getElementById("textoPergunta").textContent = pergunta.texto;

    // Limpar e recriar opções
    let container = document.getElementById("opcoesContainer");
    container.innerHTML = "";

    for (let i = 0; i < pergunta.opcoes.length; i++) {
        let btn = document.createElement("button");
        btn.textContent = pergunta.opcoes[i].texto;
        btn.className = "opcao-btn";
        btn.onclick = function () {
            selecionarOpcao(i, btn);
        };
        container.appendChild(btn);
    }

    // Esconder botão próximo
    document.getElementById("btnProximo").classList.add("oculto");
}

function selecionarOpcao(indice, btnClicado) {
    quiz.selecionarOpcao(indice);

    // Remover seleção anterior
    let botoes = document.getElementsByClassName("opcao-btn");
    for (let i = 0; i < botoes.length; i++) {
        botoes[i].classList.remove("selecionada");
    }

    // Marcar o botão clicado
    btnClicado.classList.add("selecionada");

    // Mostrar botão próximo
    document.getElementById("btnProximo").classList.remove("oculto");
}

function proximaPergunta() {
    quiz.registrarResposta();
    quiz.avancarPergunta();

    if (quiz.quizFinalizado) {
        exibirResultado();
    } else {
        renderizarPergunta();
    }
}

function exibirResultado() {
    document.getElementById("telaQuiz").classList.add("oculto");
    document.getElementById("telaResultado").classList.remove("oculto");

    let vencedor = quiz.vencedor;

    // Exibir imagem do personagem vencedor
    let divImagem = document.getElementById("imagemPersonagem");
    divImagem.innerHTML = "";
    let img = document.createElement("img");
    img.src = vencedor.imagem;
    img.alt = vencedor.nome;
    divImagem.appendChild(img);

    // Exibir nome
    document.getElementById("nomePersonagem").textContent = vencedor.nome;

    // Exibir descrição
    document.getElementById("descricaoPersonagem").textContent = vencedor.descricao;

    // Exibir apenas a pontuação do vencedor
    let container = document.getElementById("pontuacaoContainer");
    container.innerHTML = `
        <h4>🏆 SUA PONTUAÇÃO</h4>
        <div class="linha-pontuacao-unica">
            <span class="pont-label">Compatibilidade com ${vencedor.nome}:</span>
            <span class="pont-numero-destaque" style="color: ${vencedor.corBarra}">${vencedor.pontuacao} pontos</span>
        </div>
    `;
}

function reiniciarQuiz() {
    quiz.resetar();
    document.getElementById("telaResultado").classList.add("oculto");
    document.getElementById("telaInicial").classList.remove("oculto");
}

