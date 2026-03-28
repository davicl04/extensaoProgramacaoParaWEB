
let = contagem = 0;
const btnIncrementar = document.getElementById('btnIncrementar');
const btnDecrementar = document.getElementById('btnDecrementar');
const valorContador = document.getElementById('valorContador');
const mensagemInput = document.getElementById('mensagemInput');
const contador = document.getElementById('contador');
const tipoLista = document.getElementById('tipoLista');
const btnAdicionarLista = document.getElementById('btnAdicionarLista');
const btnReset = document.getElementById('btnReset');
const areaDinamica = document.getElementById('areaDinamica');

btnIncrementar.addEventListener('click', function() {
    contagem++;
    valorContador.textContent = contagem;
});

btnDecrementar.addEventListener('click', function() {
    if (contagem > 0) {
        contagem--;
        valorContador.textContent = contagem;
    } else {
        alert('O contador já está em zero!');
    }
});

mensagemInput.addEventListener('input', function() {
    const textoSemEspacos = mensagemInput.value.replace(/\s/g, '');
    contador.textContent = textoSemEspacos.length;
});

mensagemInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter' && mensagemInput.value.trim() !== '') {
        const novoParagrafo = document.createElement('p');
        novoParagrafo.textContent = mensagemInput.value;
        areaDinamica.appendChild(novoParagrafo);
        
        mensagemInput.value = '';
        contador.textContent = '0';
    }
});

btnAdicionarLista.addEventListener('click', function() {
    const escolha = tipoLista.value;
    const novaLista = document.createElement(escolha);
    const novoItem = document.createElement('li');
    
    novoItem.textContent = 'Novo item gerado';
    novaLista.appendChild(novoItem);
    areaDinamica.appendChild(novaLista);
});

btnReset.addEventListener('click', function() {
    areaDinamica.innerHTML = '';
    mensagemInput.value = '';
    contador.textContent = '0';
});