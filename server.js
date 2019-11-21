const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const { MONGO_URI } = require('./config/default');

const app = express();

//middleware
app.use(express.json());

//Mongo URI
const db = MONGO_URI;

//Connect to Mongo
mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true , useCreateIndex: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(err));

app.use('/api/entries', require('./routes/api/entries'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/video', require('./routes/api/video'));

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

//Setting port for future Heroku deploy
const port = process.env.PORT ||  5000;

app.listen(port, () => console.log(`Server started on port ${port}`));