const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');

const {BlogPosts} = require("./models.js");



router.get('/', (req, res) => {
    BlogPosts
        .find()
        .limit(10)
        .exec()
        .then(blogs => {
            res.json({
                blogs: blogs.map(
                    (blog) => blog.apiRepr())
            });
        })
        .catch(
            err => {
                console.error(err);
                res.status(500).json({
                    message: "Internal Server Error"
                })
            });
    console.log('did something');
});

router.get('./:id', (req, res) => {
    BlogPosts
        .findById(req.params.id)
        .exec()
        .then(blog => 
            res.json(blog.apiRepr())
        )
        .catch(
            err => {
            console.error(err)
            res.status(500).json({
                message: 'Internal Server Error'});
            });
});

router.delete('/:id', (req, res) => {
    BlogPosts
        .findByIdAndRemove(req.params.id)
        .then(blog => res.status(204).end())
        .catch(err => {
            console.error(err)
            res.status(500).json({
                message: 'Internal Server Error'
        })}
        );   
});

router.post('/', (req, res) => {
    const requiredFields = ['title', 'content', 'author']
    for (var i = 0; i < requiredFields.length; i++) {
        if (!(requiredFields[i] in req.body)) {
            const message = `Request incomplete, require ${requiredFields[i]}`
            console.log(message);
            return res.status(400).send(message);
        }
    }
    const post = BlogPosts.create
    ({
        title: req.body.title, 
        content: req.body.content, 
        author: {
            firstName: req.body.author.firstName, 
            lastName: req.body.author.lastName
    }
    });
    res.status(201).json(post);
    console.log('Blog Post Created');
});

router.put('/:id', (req, res) => {
    const requiredFields = ["id", "title", "content", "author"];
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
        author: {
            firstName: req.body.author.firstName,
            lastName: req.body.author.lastName
        }
    }
    console.log(updatedPost);
    console.log('Updating Blog Post');
    BlogPosts
        .findByIdAndUpdate(req.params.id, {$set: updatedPost})
        .then(restaurant => res.status(204).end())
        .catch(err => res.status(500).json({message: 'Internal server error'}));
});

module.exports = router;