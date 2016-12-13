const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const {BlogPosts} = require("./models.js");

BlogPosts.create('Yes', 'Author', 'Content', 'Alright');


router.get ('/', jsonParser, (req, res) => {
    res.json(BlogPosts.get()); 
});

router.delete('/:id', jsonParser, (req, res) => {
    BlogPosts.delete(req.params.id);
    console.log(`deleted shopping list item ${id}`);
    return res.status(401).end();
});

router.post('/', jsonParser, (req, res) => {
    const requiredFields = ['title', 'content', 'author', 'publishDate']
    for (var i = 0; i < requiredFields.length; i++) {
        if (!(requiredFields[i] in req.body)) {
        const message = `Request incomplete, require ${requiredFields[i]}`
        console.log(message);
        return res.status(400).send(message);
        }
    }
    console.log('Blog Post Created');
    const post = BlogPosts.create(req.body.title, req.body.content, req.body.author, req.body.publishDate);
    res.status(201).json(post);
});

router.put('/:id', jsonParser, (req, res) => {
    const requiredFields = ["id", "title", "content", "author", "publishDate"];
    for (let i = 0; i < requiredFields[i]; i++) {
        if (!(requiredFields[i] in req.body)) {
            const message = `You forgot to input ${requiredFields[i]}`
            return res.status(400).send(message);
        }   
    }
    if (req.params.id !== req.body.id) {
        const message = (
      `Request path id (${req.params.id}) and request body id `
      `(${req.body.id}) must match`);
    console.error(message);
    return res.status(400).send(message);
    }
    const updatedPost = {
      id: req.body.id,
      title: req.body.title,
      content: req.body.content,
      author: req.body.author,
      publishDate: req.body.publishDate
    }
    console.log(updatedPost);
    console.log('Updating Blog Post');
    let post = BlogPosts.update(updatedPost);
    res.status(204).json(post);
});

module.exports = router;