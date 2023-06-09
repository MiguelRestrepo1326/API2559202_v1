const express = require('express');
const routerApi = require('./routes');
const bodyparser  = require('body-parser');
const morgan = require('morgan'); 
const helmet = require('helmet');
const cors = require('cors');

const port = process.env.PORT;
const hostname = 'localhost';

const app = express();


app.use(bodyparser.json()); // para trabajar con el json
app.use(bodyparser.urlencoded({extended:true})) // para poder trabajar con los formularios codificados en url
app.use(express.json()); // para poder tabajar con json
app.use(morgan('tiny')); // sirve para ver cuanto se demoro y que se hizo
app.use(helmet());
app.use(cors()); // para poder peticiones de otras partes fuera del aplicativo 

app.get('/api/v1',(req,res)=>{
    res.send('API sii');
});

app.get('/*',(req,res)=>{
    res.status(404).send('No esta disponible ');
});


app.listen(port, ()=>{
    console.log(`Escuchando si http://localhost:${port}`);
})