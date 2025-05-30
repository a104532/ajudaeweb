# Teste Engenharia Web 2025

## Transformação do dataset

Foi necessário fazer algum tratamento de dados do `dataset.json` usando o programa `fix_dataset.py` resultando no `dataset_books.json`.

`py fix_dataset.py`

Foram tratados os seguintes aspetos:

- Listas que eram strings passam a ser listas (Genres, Characters, Awards, RatingsByStars, Setting);

- Passar strings para números onde isso possa vir a ser mais útil (pages, numRatings, likedPercent, bbeScore, bbeVotes, price, rating);

- Autor passa de uma string para uma lista de autores, para possibilitar a existência de mais de um autor no mesmo livro;

- Renomear campo `bookId` para `_id`, preparando o dataset para o mongoDB onde `_id` será o id.

Copiar o ficheiro do dataset para o container Docker:

> Inicializar o container `docker start mongoEW`

`docker cp dataset_books.json mongoEW:/tmp`

Executar o container:

`docker exec -it mongoEW sh`

Importar o dataset para o mongoDB:

`mongoimport -d livros -c livros /tmp/dataset_books.json --jsonArray`

Verificar que o dataset foi importado:

```sh
mongosh
show dbs
use livros
db.livros.countDocuments()
```

## Queries

**1. Quantos livros têm a palavra Love no título;**

`db.find({title:{ $regex: /love/i }}).count()`

Res: 366

**2. Quais os títulos dos livros, em ordem alfabética, em que um dos autores tem apelido Austen?**

`db.livros.find({ author: { $regex: /Austen/i } }, { title: 1, _id: 0 }).sort({ title: 1 })`

Res:

```

```

**3. Qual a lista de autores (ordenada alfabeticamente e sem repetições)?**

`db.livros.distinct("author").sort()`

Res:

```

```

**4. Qual a distribuição de livros por género (genre) (quantos livros tem cada género)?**

```
db.livros.aggregate([
  { $unwind: "$genres" },
  { $group: { _id: "$genres", count: { $sum: 1 } } },
  { $sort: { _id: 1 } }
])
```

Res:

```

```

**5. Quais os títulos dos livros e respetivos isbn, em ordem alfabética de título, em que um dos personagens (characters) é Sirius Black?**

```
db.livros.find(
  { characters: "Sirius Black" },
  { title: 1, isbn: 1, _id: 0 }
).sort({ title: 1 })
```

Res:

```

```
## Criação da API de Dados

### Gerar Estrutura

```bash
npx express-generator --view=pug apiDados
cd apiDados
npm install
npm install mongoose
```

> Nota: Apesar de ser gerado com suporte para `pug`, a API de dados não necessita de views.

### Estrutura e Lógica

1. Criadas as pastas `models/` e `controllers/`
2. No ficheiro dentro do `models` foi definido o modelo de dados com `mongoose`
3. No ficheiro do `controllers` foram implementadas as funções correspondentes às operações CRUD
4. Em `routes`, foram definidas as rotas conforme o enunciado
  
5. No `app.js` foi adicionada a ligação ao MongoDB:

6. A porta da API foi alterada no ficheiro `bin/www` para a pedida no enunciado.

### Testes

A API foi testada com o Postman para validar todas as rotas e operações.

---

## Criação da Interface do Utilizador

### Gerar Estrutura

```bash
npx express-generator --view=pug UI
cd UI
npm install
npm install axios
```

### Alterações Realizadas

- A porta foi alterada no `bin/www` para a pedida no enunciado.
- A comunicação com a API foi feita com `axios` para consumir os dados do backend.
- As views `.pug` foram editadas conforme os dados recebidos nas routes.

### 3.3 Estilização

Foi adicionada a biblioteca `w3.css` na pasta `public/stylesheets` para melhorar o aspeto visual da interface.

---

