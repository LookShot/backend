const express = require ('express');
const Card = require ('../models/Card')
const parseStringAsArray = require ('../../utils/parseStringAsArray')

const router = express.Router();


/*listar os cards por categoria, ao clicar em alguma categoria ele
pega as infomações no query e vai até o banco e puxa todos com aquela categoria*/

router.get ('/tipo', async (req, res) =>{
    // const categoria= req.query.categoria
    // const techsArray = parseStringAsArray(categoria);
    // return res.send (techsArray);

   try {
    const categoria= req.query.categoria

    const techsArray = parseStringAsArray(categoria);

       const cards = await Card.find({
        categoria :{
            $in: techsArray
        },
    }).populate('user');

       return res.send ({cards});

   } catch (error) {
    console.log(error)
    return res.status(400).send ({error: 'Erro Loading cardss'});       
   }

});


module.exports= app => app.use('/busca', router);