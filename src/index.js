const express    = require('express')
const bodyParser = require('body-parser')
const mongoose = require ('mongoose');
//const cors = require ( 'cors');
const routes = require ('./routes');


const app = express();

mongoose.connect("mongodb+srv://daniel:1997daniel@cluster0-0g2rl.mongodb.net/services?retryWrites=true&w=majority",{   
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
});
//app.use (cors({origin: 'http://localhost:3000'}));
//app.use (cors());
app.use(bodyParser.json()); //entender quando enviar uma req. em json para minha api
app.use(express.json()); // falando p/ o express que eu estou utilizando JSON
//express.json precisa vim antes 
app.use(routes);
app.use(bodyParser.urlencoded({extended: false})); //entender quando enviar uma parametros via url


app.listen(3000)