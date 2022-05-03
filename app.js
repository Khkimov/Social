const express = require('express');
const path = require('path');

const app = express();

const PORT = 3000;

const photosRouter = require('./routes/photos');

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.redirect('/photos');
});

app.use('/photos', photosRouter);

app.use((req, res) => {
  res.status(404).send('ooops');
});

app.listen(PORT, () => console.log('started on', PORT));
