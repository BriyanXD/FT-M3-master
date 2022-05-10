// const bodyParser = require("body-parser");
const express = require("express");

const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
let posts = [];
let id = 0;
const server = express();
// to enable parsing of json bodies for post requests
server.use(express.json());

// TODO: your code to handle requests
server.post("/posts", (req, res) => {
  let { author, title, contents } = req.body;
  if (!author || !title || !contents) {
    res
      .status(STATUS_USER_ERROR)
      .send({
        error: "No se recibieron los parámetros necesarios para crear el Post",
      });
  } else {
    let post = {
      author,
      title,
      contents,
      id: id++,
    };
    posts.push(post);
    res.send(post);
  }
});

server.post("/posts/author/:author", (req, res) => {
  const { title, contents } = req.body;
  const { author } = req.params;
  if (!author || !title || !contents) {
    res
      .status(STATUS_USER_ERROR)
      .send({
        error: "No se recibieron los parámetros necesarios para crear el Post",
      });
  } else {
    let post = {
      author,
      title,
      contents,
      id: id++,
    };
    posts.push(post);
    res.send(post);
  }
});
// /posts?term="king"
server.get("/posts", (req, res) => {
  const { term } = req.query;
  if (term) {
    let postsFound = posts.filter(
      (e) => e.title.includes(term) || e.contents.includes(term)
    );
    res.send(postsFound);
  } else {
    res.send(posts);
  }
});
//"localhost:3000/posts/king"
server.get("/posts/:author", (req, res) => {
  const { author } = req.params;
  let foundAuthor = posts.filter((e) => e.author === author);

  if (foundAuthor.length > 0) {
    res.send(foundAuthor);
  } else
    res
      .status(STATUS_USER_ERROR)
      .send({ error: "No existe ningun post del autor indicado" });
});

server.get("/posts/:author/:title", (req, res) => {
  const { author, title } = req.params;
  let foundAuthor = posts.filter(
    (e) => e.author === author && e.title === title
  );
  if (foundAuthor.length > 0) {
    res.send(foundAuthor);
  } else
    res
      .status(STATUS_USER_ERROR)
      .send({
        error: "No existe ningun post con dicho titulo y autor indicado",
      });
});

server.put("/posts", (req, res) => {
  const { id, title, contents } = req.body;
  if (!id || !title || !contents) {
    res
      .status(STATUS_USER_ERROR)
      .send({
        error:
          "No se recibieron los parámetros necesarios para modificar el Post",
      });
  } else {
    let postFound = posts.find((e) => e.id === parseInt(id));
    if (postFound) {
      postFound.title = title;
      postFound.contents = contents;
      res.send(postFound);
    } else
      res
        .status(STATUS_USER_ERROR)
        .send({ error: "No hay posts con el ID indicado" });
  }
});

server.delete("/posts", (req, res) => {
  const { id } = req.body;
  let foundPost = posts.find((e) => e.id === parseInt(id));
  if (foundPost) {
    posts = posts.filter((e) => e !== foundPost); //foundPost=0x0001 e=0x0001
    res.send({ success: true });
  } else res.status(STATUS_USER_ERROR).send({ error: "ID no encontrado" });
});

server.delete("/author", (req, res) => {
  const { author } = req.body;
  let foundPost = posts.filter((e) => e.author === author);
  if (foundPost.length > 0) {
    posts = posts.filter((e) => e.author !== author);
    // let deletedAuthor=[]
    //posts.filter(e=>{
    //     if(e.author!==author) return true
    //     else deletedAuthor.push(e)
    // })
    res.send(foundPost);
  } else
    res
      .status(STATUS_USER_ERROR)
      .send({ error: "No existe el autor indicado" });
});

module.exports = { posts, server };
