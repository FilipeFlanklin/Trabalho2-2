function getLivros() {
    fetch("/livros")  // Faz a requisição para a rota /livros
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const livros = data.data;  // Extrai os dados da resposta JSON
            CriarLivros(livros);
        })
        .catch((error) =>
            console.error("Erro ao buscar dados:", error));
}

function CriarLivros(livros) {
    let cartao = document.getElementById("Cartao");
    let Procurartxt = document.getElementById("Procurartxt");

    function atualizarLivrosFiltrados() {
        cartao.innerHTML = "";
        let textoFiltro = Procurartxt.value.trim().toLowerCase();


        fetch(`/livros/${textoFiltro}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                const livrosFiltrados = data.data;
                livrosFiltrados.forEach(livro => {
                    CriarCartao(livro, cartao);
                });
            })
            .catch(error => {
                console.error("Erro ao buscar dados filtrados:", error);
            });
    }

    Procurartxt.addEventListener("input", atualizarLivrosFiltrados);

    atualizarLivrosFiltrados();
}

function CriarCartao(livro, cartao) {
    let LivroCartao = document.createElement("div");
    LivroCartao.classList.add("Cartao");

    let Imagem = document.createElement("img");
    Imagem.src = livro.imagem;

    let Detalhes = document.createElement("div");
    Detalhes.classList.add("Detalhes");

    let Titulo = document.createElement("h2");
    Titulo.textContent = livro.titulo;


    let Autor = document.createElement("p");
    Autor.textContent = `Autor: ${livro.autor}`;

    let Genero = document.createElement("p");
    Genero.textContent = `Gênero: ${livro.genero}`;

    let IconEditar = document.createElement("img");
    IconEditar.id = "IconEdit";
    IconEditar.src = "./Editar.png";

    IconEditar.addEventListener("click", function () {
        window.location.href = `Editar.html?id=${encodeURIComponent(livro.id)}`;
    });

    let IconDelete = document.createElement("img");
    IconDelete.id = "IconDelete";
    IconDelete.src = "./Lixeira.png";

    IconDelete.addEventListener("click", () => {
        fetch(`/livros/deletar/${livro.id}`, {
            method: 'DELETE'
        }).then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            };
            getLivros()
        })
    });

    let Exemplares = document.createElement("p");
    Exemplares.textContent = `Exemplares disponíveis: ${livro.exemplares}`;


    // Botão de compra
    if (livro.exemplares > 0) {
        let botaoCompra = document.createElement("button");
        botaoCompra.id = `BotaoCompra`;
        botaoCompra.textContent = "Comprar";
        botaoCompra.addEventListener("click", () => {
            fetch(`/livros/comprar/${livro.id}`, {
                method: 'PUT'
            }).then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                };
                getLivros()
            })
        });
        Detalhes.appendChild(botaoCompra);
    } else {
        let aviso = document.createElement("p");
        aviso.textContent = "esgotado";
        aviso.id = `Aviso`;
        aviso.style.color = "Red";

        let botaoAddExemplar = document.createElement("button");
        botaoAddExemplar.id = `BotaoExemplar`;
        botaoAddExemplar.textContent = "+";

        botaoAddExemplar.addEventListener("click", () => {
            fetch(`/livros/addExemplar/${livro.id}`, {
                method: 'PUT'
            }).then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                };
                getLivros()
            })
        });
        
        Detalhes.appendChild(aviso);
        aviso.appendChild(botaoAddExemplar);
    }

    Detalhes.append(Titulo, Autor, Genero, Exemplares);
    LivroCartao.append(Imagem, IconEditar, IconDelete, Detalhes);

    cartao.appendChild(LivroCartao);
}

function addLivro() {

    let titulo = document.getElementById('titulo').value;
    let autor = document.getElementById('autor').value;
    let genero = document.getElementById('genero').value;
    let exemplares = document.getElementById('exemplares').value;
    let imagem = document.getElementById('imagem').value;

    // Faz a requisição para buscar livros filtrados no servidor via Express
    fetch('/livros/add', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ titulo, autor, genero, exemplares, imagem }),
    })
        .then(response => {
            response.json()
            document.getElementById('formNovoLivro').reset();
            alert('Livro cadastrado com sucesso!');
        })
        .catch(error => {
            console.error('Erro ao adicionar livro:', error);
        });

}

function getLivroEditar() {


    const id = new URLSearchParams(window.location.search).get('id')
    fetch(`/livros/PegarEdit/${id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const livro = data.data;
            console.log(livro);
            document.getElementById('Edittitulo').value = livro[0].titulo;
            document.getElementById('Editautor').value = livro[0].autor;
            document.getElementById('Editgenero').value = livro[0].genero;
            document.getElementById('Editexemplares').value = livro[0].exemplares;
            document.getElementById('Editimagem').value = livro[0].imagem;
        })
        .catch(error => {
            console.error("Erro ao buscar livro pelo ID:", error);
        });

}

function EditLivro() {

    let titulo = document.getElementById('Edittitulo').value;
    let autor = document.getElementById('Editautor').value;
    let genero = document.getElementById('Editgenero').value;
    let exemplares = document.getElementById('Editexemplares').value;
    let imagem = document.getElementById('Editimagem').value;

    const id = new URLSearchParams(window.location.search).get('id')

    fetch(`/livros/editar/${id}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ titulo, autor, genero, exemplares, imagem }),
    })
        .then(response => {
            response.json();
            alert('Livro Editado com sucesso!');
            window.location.href = `Inicio.html`;
        })
        .catch(error => {
            console.error('Erro ao adicionar livro:', error);
        });

}

