const express = require ('express');
const autMiddleware = require ('../middleware/auth')
const Card = require ('../models/Card')
const parseStringAsArray = require ('../../utils/parseStringAsArray')

const router = express.Router();

router.use(autMiddleware);


//Puxar todos o card de um usuário*** terminar//
router.get('/card', async (req, res)=>{
    
    const user = req.userId;

    try {
        const cards = await Card.find({user})
        return res.send(cards)
        
    } catch (error) {
    console.log(error)
     return res.status(400).send ({error: 'Erro Loading cards'});       
    }
});

//**********Criação dos Cards Relacionado ao User**************/
router.post('/', async (req, res)=>{ 
    try {
        const {name, description, categoria, location } = req.body;

        const cards = await Card.create(
            {
            name,
            description,
            categoria,
            location,
            user: req.userId
            });

        await cards.save();    

        return res.send ({cards});
        
    } catch (error) {
        console.log(error)
       return res.status(400).send ({error: 'erro na criação do Card'});
    }
});

//------Atualizando um Card----------/
router.put('/:cardId', async (req, res)=>{
    try {
        const {name, description, categoria, location } = req.body;

        const cards = await Card.findByIdAndUpdate(req.params.cardId,{
            name,
            description,
            categoria,
            location,
        }, {new: true });


        return res.send ({cards});

    } catch (error) {
        console.log(error)
       return res.status(400).send ({error: 'erro ao atualizar um Card'});
    }
});


router.delete('/:cadId', async (req, res)=>{

    try {
       
       const cards= await Card.findByIdAndRemove(req.params.cadId);

        return res.send (`Card ${cards.name} deletado`);

    } catch (error) {
        console.log(error)
       return res.status(400).send ({error: 'erro em deltar um projeto'});
    }
    
});

module.exports= app => app.use('/cards', router);