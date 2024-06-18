const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const operations = require('./operations');


const app = express();
app.use(bodyParser.json());

// Middleware para servir arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Rota principal para servir o arquivo HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'Inicio.html'));
});



// Listagem de livros
app.get('/livros', (req, res) => {
  const handleSuccess = (result) => res.send(result)
  const handleError = (result) => res.status(500).send(result)
  operations.listalivro(handleSuccess, handleError);
});

// Listagem de livros por nome
app.get('/livros/:titulo', (req, res) => {
  const handleSuccess = (result) => res.send(result)
  const handleError = (result) => res.status(500).send(result)
  operations.listalivrosexp(req.params.titulo, handleSuccess, handleError);
});

// Livro para editar
app.get('/livros/PegarEdit/:id', (req, res) => {
  const handleSuccess = (result) => res.send(result)
  const handleError = (result) => res.status(500).send(result)
  operations.listaExato(req.params.id, handleSuccess, handleError);
});

//addLivro
app.post('/livros/add', (req, res) => {
  const handleSuccess = (result) => res.send(result)
  const handleError = (result) => res.status(500).send(result)
  const { titulo, autor, genero, imagem, exemplares } = req.body;
  operations.addLivro(titulo, autor, genero, exemplares, imagem, handleSuccess, handleError);
});

//Editar info
app.put('/livros/editar/:id', (req, res) => {
  const handleSuccess = (result) => res.send(result)
  const handleError = (result) => res.status(500).send(result)
  const { titulo, autor, genero, imagem, exemplares } = req.body;
  operations.editarLivro(req.params.id, { titulo, autor, genero, exemplares, imagem }, handleSuccess, handleError);
});

// compra Livros
app.put('/livros/comprar/:id', (req, res) => {
  const handleSuccess = (result) => res.send(result)
  const handleError = (result) => res.status(500).send(result)
  operations.compraLivro(req.params.id, handleSuccess, handleError);
});

// add exemplar Livros
app.put('/livros/addExemplar/:id', (req, res) => {
  const handleSuccess = (result) => res.send(result)
  const handleError = (result) => res.status(500).send(result)
  operations.addexemplar(req.params.id, handleSuccess, handleError);
});

// Deletar Livros
app.delete('/livros/deletar/:id', (req, res) => {
  const handleSuccess = (result) => res.send(result)
  const handleError = (result) => res.status(500).send(result)
  operations.deleteLivro(req.params.id, handleSuccess, handleError);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
