const express = require('express');

// modularizar rotas
const router = express.Router();

// realizar conexao com o bd
const db = require('../db');

//criar rotas (rota padrao): /api/users/
//CRUD
//cadastrar usuarios (CREATE) --> cadastrar --> /api/users/ (método POST)
router.post('/', (req, res)=>{
    const {nome, email, telefone} = req.body;

    //executar a instruçao SQL
    db.query('INSERT INTO users (nome, email, telefone) VALUES (?, ?, ?)', [nome, email, telefone], (err, results)=>{
        if (err) return res.status(500).send(err);
        res.status(201).json({id: results.insertId, nome, email, telefone});
    });
});

//listar usuarios (READ)
router.get('/', (req, res)=>{
    db.query('SELECT * FROM users', (err, results)=>{
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

//atualizar usuarios (UPDATE)
router.put('/:id', (req, res)=>{
    const {nome, email, telefone} = req.body;
    const {id} = req.params;
    db.query('UPDATE users SET nome = ?, email = ?, telefone = ? WHERE id = ?', [nome, email, telefone, id], (err, results)=>{
        if(err) return res.status(500).send(err);
        res.json(results);
    });
});

//excluir um usuario (DELETE)

router.delete('/:id', (req, res)=>{
    const {id} = req.params;

    db.query('DELETE FROM users WHERE id = ?', [id], (err)=>{
        if(err) return res.status(500).send(err);
        res.sendStatus(204);
    })
})


//exportar rotas
module.exports = router;