const express = require ('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();

const blogger = require('./blog-poster');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const {PORT, DATABASE_URL} = require('./config');

app.use(bodyParser.json());

app.use(morgan('common'));

// app.use(express.static('public'));
app.use('/blog-poster', blogger);


// app.get('/', (req, res) => {
//     res.sendfile(__dirname + '/index.html')
// });



function runServer() {
  return new Promise((resolve, reject) => {
    mongoose.connect(DATABASE_URL, err => {
      if (err) {
        return reject(err);
      }

      app.listen(PORT, () => {
        console.log(`Your app is listening on port ${PORT}`);
        resolve();
      })
      .on('error', err => {
        mongoose.disconnect();
        reject(err);
      });
    });
  });
}

if (require.main === module) {
  runServer().catch(err => console.error(err));
};

