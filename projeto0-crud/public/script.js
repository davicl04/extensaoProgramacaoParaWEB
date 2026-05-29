//trazer o formulário e a lista de usuários
const form = document.getElementById('user-form');
const userList = document.getElementById('user-list');

//chamar a função de carregar usuários
carregarUsuarios();

//evento para capturar os dados do formulário
form.addEventListener('submit', e=>{
    e.preventDefault(); //evitar que o formulário recarregue a página
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    console.log(nome);
    console.log(email);
    //chamar uma função para cadastrar usuários
    cadastrarUsuario(nome, email);
});

//carregar usuários
function carregarUsuarios(){
    fetch('/api/users', {
        method: 'GET'
    }) //requisição ao servidor
    //resposta do servidor
    .then(res => res.json()) //retornando as informações no formato JSON
    .then(data => {
        //criar os itens no HTML
        userList.innerHTML = ''; //limpar o conteúdo
        data.forEach( user =>{
            const li = document.createElement('li');
            li.innerHTML = `${user.nome} - ${user.email}
            <button onclick="editarUsuario(${user.id})">Editar</button>
            <button onclick="excluirUsuario(${user.id})">Excluir</button>`
            userList.appendChild(li);
        })  
    })
}
//cadastrar usuários
function cadastrarUsuario(nome, email){
    fetch('/api/users', { //rota disponível no servidor - requisição ao servidor
        method: 'POST', //método HTTP
        headers: {'Content-Type': 'application/json'}, //o corpo da mensagem é no formato json
        body: JSON.stringify({nome, email}) //convertendo o objeto em uma string JSON
    })
    .then(() => { //usado para tratar a resposta da requisição
        form.reset(); //limpar o formulário
        carregarUsuarios();
    })
}

//função excluir usuário
function excluirUsuario(id){
    const confirmacao = confirm("Tem certeza?");
    if (!confirmacao) {
        return
    }
    fetch(`/api/users/${id}`, { //definindo a rota para excluir
        method: 'DELETE'
    }) //requisição para o servidor
    .then(()=>{
        carregarUsuarios();
    })
}