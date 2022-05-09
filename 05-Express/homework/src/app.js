const e = require("express");
const { server, posts } = require("./server.js");

let id = 0;

server.post("/posts", (req, res) => {
  const { author, title, contents } = req.body;
  if (author && title && contents) {
    id++;
    const obj = {
      id: id,
      author: author,
      title: title,
      contents: contents,
    };
    posts.push(obj);
    res.json(posts);
  } else {
    const obj = {
      error: "No se recibieron los parámetros necesarios para crear el Post",
    };
    res.json(obj);
  }
});

server.post("/posts/author/:author", (req, res) => {
  const { title, contents } = req.body;
  const { author } = req.params;
  if (author && title && contents) {
    id++;
    const obj = {
      id: id,
      author: author,
      title: title,
      contents: contents,
    };
    posts.push(obj);
    res.json(posts);
  } else {
    const obj = {
      error: "No se recibieron los parámetros necesarios para crear el Post",
    };
    res.json(obj);
  }
});

server.get("/posts", (req, res) => {
  const { term } = req.query;
  if (term) {
    let result = posts.filter((element) => {
      if (element.title.includes(term)) return element;
      if (element.contents.includes(term)) return element;
    });
    if (result) {
      res.json(result);
    } else {
      res.json(posts);
    }
  } else {
    res.json(posts);
  }
});

server.get("/posts/:author", (req, res) => {
  const { author } = req.params;
  if (author) {
    let results = posts.filter((element) => {
      if (element.author === author) return element;
    });
    res.json(results);
  } else {
    res.json({ error: "No existe ningun post del autor indicado" });
  }
});

server.get("/posts/:author/:title", (req, res) => {
  const { author, title } = req.params;
  if ((author, title)) {
    let results = posts.filter((element) => {
      if (element.author === author) return element;
      if (element.title === title) return element;
    });
    res.json(results);
  } else {
    res.json({
      error: "No existe ningun post con dicho titulo y autor indicado",
    });
  }
});

server.put("/posts", (req, res) => {
  const { id, title, author, contents } = req.body;
  if ((id, title, author, contents)) {
    for (let i in posts) {
      if (posts[i].id === id) {
        posts[i].title = title;
        posts[i].contents = contents;
        posts[i].author = author;
      }
    }
    res.json(posts[id]);
  } else {
    res.json({
      error:
        "No se recibieron los parámetros necesarios para modificar el Post",
    });
  }
});

server.delete("/posts", (req, res) => {
  const { id } = req.body;
  if (id) {
    const result = posts.filter((element) => {
      if (element.id !== id) return element;
    });
    posts = result;
    res.json({ success: true });
  } else {
    res.json({ error: "Mensaje de error" });
  }
});

server.delete("/author", (req, res) => {
  const { author } = req.body;
  if (author) {
    const result = posts.filter((element) => {
      if (element.author !== author) return element;
    });
    posts = result;
    res.json({ success: true });
  } else {
    res.json({ error: "Mensaje de error" });
  }
});
server.listen(3000);
