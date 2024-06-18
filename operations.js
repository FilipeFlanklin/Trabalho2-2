const db = require('./db');

const listalivro = (handleSuccess, handleError) => {
    db.all('SELECT * FROM livros', [], (err, rows) => {
        if (err) {
            handleError({ "status": "error", "data": err.message });
        } else {
            handleSuccess({ "status": "success", "data": rows });
        }
    });
}

const listalivrosexp = (titulo, handleSuccess, handleError) => {
    db.all(`SELECT * FROM livros WHERE titulo LIKE '%${titulo}%'`, [], (err, rows) => {
        if (err) {
            handleError({ "status": "error", "data": err.message });
        } else {
            handleSuccess({ "status": "success", "data": rows });
        }
    });
}

const listaExato = (id, handleSuccess, handleError) => {
    db.all(`SELECT * FROM livros WHERE id = ${id}`, [], (err, rows) => {
        if (err) {
            handleError({ "status": "error", "data": err.message });
        } else {
            handleSuccess({ "status": "success", "data": rows });
        }
    });
}

const addLivro = (titulo, autor, genero,  exemplares, imagem, handleSuccess, handleError) => {
    db.run('INSERT INTO livros (titulo, autor, genero, exemplares, imagem) VALUES (?, ?, ?, ?, ?)', [titulo, autor, genero, exemplares, imagem], function (err, rows) {
        if (err, rows) {
            handleError({ "status": "error", "data": err.message });
        } else {
            handleSuccess({ "status": "success", "data": rows });
        }
    });
}

const editarLivro = (IdLivro, { titulo, autor, genero, imagem, exemplares }, handleSuccess, handleError) => {
    db.run(
        'UPDATE livros SET titulo = ?, autor = ?, genero = ?, imagem = ?, exemplares = ? WHERE id = ?',
        [titulo, autor, genero, imagem, exemplares, IdLivro],
        function (err, rows) {
            if (err, rows) {
                handleError({ "status": "error", "data": err.message });
            } else {
                handleSuccess({ "status": "success", "data": rows });
            }
        }
    );
};

const deleteLivro = (IdLivro, handleSuccess, handleError) => {
    db.all('DELETE FROM livros WHERE id = ?', [IdLivro], (err, rows) => {
        if (err) {
            handleError({ "status": "error", "data": err.message });
        } else {
            handleSuccess({ "status": "success", "data": rows });
        }
    });
}

const compraLivro = (IdLivro, handleSuccess, handleError) => {
    db.all('UPDATE livros SET exemplares = exemplares - 1 WHERE id = ?', [IdLivro], (err, rows) => {
        if (err) {
            handleError({ "status": "error", "data": err.message });
        } else {
            handleSuccess({ "status": "success", "data": rows });
        }
    });
}

const addexemplar = (IdLivro, handleSuccess, handleError) => {
    db.all('UPDATE livros SET exemplares = exemplares + 1 WHERE id = ?', [IdLivro], (err, rows) => {
        if (err) {
            handleError({ "status": "error", "data": err.message });
        } else {
            handleSuccess({ "status": "success", "data": rows });
        }
    });
}

module.exports = {
    addexemplar: addexemplar,
    compraLivro: compraLivro,
    addLivro: addLivro,
    listalivro: listalivro,
    deleteLivro: deleteLivro,
    editarLivro: editarLivro,
    listalivrosexp: listalivrosexp,
    listaExato: listaExato
};