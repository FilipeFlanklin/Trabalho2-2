const sqlite3 = require('sqlite3').verbose();

// Criar um novo banco de dados SQLite
const db = new sqlite3.Database('livros.db');

// Criar uma tabela para livros
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS livros (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        titulo TEXT,
        autor TEXT,
        genero TEXT,
        exemplares INTEGER,
        imagem TEXT
    )`)
    
});

function initializeDatabase() {
    const livros = [
        {
            "titulo": "Meditações",
            "autor": "Marco Aurélio",
            "genero": "Filosofia",
            "exemplares": 0,
            "imagem": "https://m.media-amazon.com/images/I/41bQU67zLnL._SY445_SX342_.jpg"
        },
        {
            "titulo": "Orgulho e Preconceito",
            "autor": "Jane Austen",
            "genero": "Romance",
            "exemplares": 1,
            "imagem": "https://m.media-amazon.com/images/I/51adYP1B4xL._SY445_SX342_.jpg"
        },
        {
            "titulo": "Nada Pode Me Ferir",
            "autor": "David Goggins",
            "genero": "Autoajuda",
            "exemplares": 1,
            "imagem": "https://m.media-amazon.com/images/I/71wdbq8NbFL._SY385_.jpg"
        },
        {
            "titulo": "O Homem Invisível",
            "autor": "H.G. Wells",
            "genero": "Ficção Científica",
            "exemplares": 1,
            "imagem": "https://m.media-amazon.com/images/I/513KteOV-vL._SY445_SX342_.jpg"
        },
        {
            "titulo": "Utopia",
            "autor": "Thomas More",
            "genero": "Filosofia",
            "exemplares": 1,
            "imagem": "https://m.media-amazon.com/images/I/51Knq6OIwtL._SY445_SX342_.jpg"
        },
        {
            "titulo": "A Revolução dos Bichos",
            "autor": "George Orwell",
            "genero": "Fábula Política",
            "exemplares": 1,
            "imagem": "https://m.media-amazon.com/images/I/61owA5ey3iL._SY445_SX342_.jpg"
        },
        {
            "titulo": "As Crônicas de Nárnia",
            "autor": "C.S. Lewis",
            "genero": "Fantasia",
            "exemplares": 1,
            "imagem": "https://m.media-amazon.com/images/I/71yJLhQekBL._SY385_.jpg"
        },
        {
            "titulo": "Cartas Chilenas",
            "autor": "Tomás Antônio Gonzaga",
            "genero": "Sátira",
            "exemplares": 1,
            "imagem": "https://m.media-amazon.com/images/I/81iehazLn7S._SY385_.jpg"
        },
        {
            "titulo": "O Príncipe",
            "autor": "Nicolau Maquiavel",
            "genero": "Filosofia Política",
            "exemplares": 1,
            "imagem": "https://m.media-amazon.com/images/I/81E9scx1JBL._SY385_.jpg"
        },
        {
            "titulo": "O Guia do Mochileiro das Galáxias",
            "autor": "Douglas Adams",
            "genero": "Ficção Científica",
            "exemplares": 1,
            "imagem": "https://m.media-amazon.com/images/I/41D2p1NDFkL._SY445_SX342_.jpg"
        },
        {
            "titulo": "Livro Exemplo",
            "autor": "eu",
            "genero": "Ação",
            "imagem": "https://c.media-amazon.com/images/I/4143HhfEU4L._SY445_SX342_.jpg",
            "exemplares": 1
        }
    ]
  
    const stmt = db.prepare('INSERT INTO livros (titulo, autor, genero, exemplares, imagem) VALUES (?, ?, ?, ?, ?)');
    livros.forEach((livro) => {
        stmt.run(livro.titulo, livro.autor, livro.genero, livro.exemplares, livro.imagem);
    });
    stmt.finalize();
    
  }
  
  //initializeDatabase();

  /*db.each('SELECT * FROM livros', (err, row) => {
    console.log(`${row.id}: ${row.titulo} - ${row.autor} - ${row.genero} - ${row.exemplares} - ${row.imagem}`);
})*/


module.exports = db;