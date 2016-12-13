const express = require ('express');
const morgan = require('morgan');

const app = express();

const blogger = require('./blog-poster');


app.use(morgan('common'));

// app.use(express.static('public'));
app.use('/blog-poster', blogger);


// app.get('/', (req, res) => {
//     res.sendfile(__dirname + '/index.html')
// });



const server = app.listen(process.env.PORT || 8080, () => {
  console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});

module.exports = server;