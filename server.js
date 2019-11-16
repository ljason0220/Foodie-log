const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const entries = require('./routes/api/entries');

const app = express();

//middleware
app.use(bodyParser.json());

//Mongo URI
const db = require('./config/keys').mongoURI;

//Connect to Mongo
mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(err));

app.use('/api/entries', entries);

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

//Setting port for future Heroku deploy
const port = process.env.PORT ||  5000;

app.listen(port, () => console.log(`Server started on port ${port}`));