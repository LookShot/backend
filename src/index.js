const express    = require('express')
const bodyParser = require('body-parser')

const app = express();

app.use(bodyParser.json()); //entender quando enviar uma req. em json para minha api
app.use(bodyParser.urlencoded({extended: false})); //entender quando enviar uma parametros via url

require('./app/controllers/index')(app);

app.listen(3000);