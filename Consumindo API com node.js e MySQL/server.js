const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3000;

app.use(express.json());

const connection = mysql.createConnection
({
    host: 'localhost',
    user: 'root',
    password: 'senac',
    database: 'minha_api'
});

connection.connect(err => {
    if(err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conectado ao banco de dados MySQL');
})

app.get('/usuarios', (req, res) => {
    connection.query('SELECT * FROM usuarios', (err, results) => {
        if (err) {
            res.status(500).send('Erro ao buscar usuários');
            return;
        }
        res.json(results);
    });
})

app.post('/usuarios', (req, res) => {
    const { nome } = req.body;
    connection.query('INSERT INTO usuarios (nome) VALUES (?)', [nome], (err, results) => {
        if (err) {
            res.status(500).send('Erro ao criar usuário');
            return;
        }
        res.send(`Usuário ${nome} criado com sucesso!`);
    });
});

app.put('/usuarios/:id', (req, res) => {
    const { id } = req.params;
    const { nome } = req.body;
    connection.query('UPDATE usuarios SET nome = ? WHERE id = ?', [nome, id], (err, results) => {
        if(err) {
            res.status(500).send('Erro ao atualizar usuário');
            return;
        }
        res.send(`Usuário ${id} atualizado com sucesso!`);
    });
});

app.delete('/usuarios/:id', (req, res) => {
    const { id } = req.params;
    connection.query('DELETE FROM usuarios WHERE id = ?', [id], (err, results) => {
        if(err) {
            res.status(500).send('Erro ao deletar usuário');
            return;
        }
        res.send(`Usuário ${id} deletado com sucesso!`);
0    });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
})