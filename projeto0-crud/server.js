const express = require('express');
const app = express();
const port = 3000;
//realizar conexao com o banco
const db = require('./db');
//puxar rotas da api
const apiRoutes = require('./routes/api');
//tratar requisição json

app.use(express.json());
app.use('/api/users', apiRoutes);

const path = require('path');
app.use(express.static(path.join(__dirname, '/public')));

//realizar conexao
app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, '/public', 'index.html'));
});


app.use('/api/users ', apiRoutes);

app.listen(port, ()=>{
    console.log("Server up");
});