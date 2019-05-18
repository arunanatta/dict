var express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config/database');
//const router = express.Router();

//const words = require('./routes/dict');

const letter = require('./model/dict');


mongoose.connect(config.database);

mongoose.connection.on('connected', () => {
    console.log('connected to db');
});

mongoose.connection.on('error', (err) => {
    console.log('db error');
});


const app = express();


const port = 3000;

app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());


//app.use('/words', words);

app.use(express.static(__dirname + '/views/'));
app.use(bodyParser.urlencoded({extend:true}));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.get('/', (req, res) => {
    res.render('index.html');
});

app.get('/Add', (req, res) => {
    res.render('add.html');
});

app.get('/Search', (req, res) => {
    res.render('search.html');
});

app.post('/AddWord', (req, res) => {
        let newWord = new letter({
            word: req.body.word,
            meaning: req.body.meaning
        });
    
        newWord.save()
        .then(item => {
        res.send("Successfully Added");
        })
        .catch(err => {
        res.status(400).send("unable to add to database");
        });
});

app.post('/SearchWord', (req, res) => {

    letter.find({"word" : req.body.word}, function(err, result){
        if(err){
            res.send("error");
        } else {
            res.send(result);
        }
        
    });
})

app.listen(port, () => {
    console.log("Server starts on port"+port);
});