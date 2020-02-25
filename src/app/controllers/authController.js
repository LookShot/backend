const bccrypt = require ('bcryptjs');
const jwt = require ('jsonwebtoken');
const crypto = require ('crypto');

const mailer = require ('../../modules/mailer')
const authConfig = require ('../../config/auth')

const User = require('../models/User');
const Post = require('../models/Post');
const Card = require('../models/Card');



function generatorToken (params = {}){

   return jwt.sign(params, authConfig.secret, {
        expiresIn:86400,
    });
}

module.exports = {

async store (req, res){
    const { email } = req.body;

    try {
        if (await User.findOne({email})){
            return res.status(400).send ({error: 'User already exists'});
 }
        const user = await User.create(req.body);

        user.password = undefined;

        return res.send ({
            user,
            token: generatorToken({id: user.id}),
        });
    } catch (err){
        return res.status(400).send({error: 'Registration failed'});
    }
},

async update (req, res){

    const user = await req.userId;

    try {
        await User.findByIdAndUpdate(user, req.body)

        const searcheUser = await User.findById(user)
        
        return res.send(searcheUser);
        
    } catch (error) {
        console.log(error);
        res.status(400).send ({error: 'Não pode atualizar os dados'});
    }

},

async authenticate(req, res){
    const {email, password}= req.body;

    const user = await User.findOne({ email }).select('+password');

    if (!user){
        return res.status(400).send ({error: 'User not found'});
    }
    if ( !await bccrypt.compare (password, user.password) ){
        return res.status(400).send({ error: 'Invalid password'});
    }
    
    user.password = undefined;
    
    
    res.send({
        user,
        token: generatorToken({id: user.id}),
    });

},

async logout(req, res){
    const {logout}= req.body;

    const authHeader = req.headers.authorization;

    const parts = authHeader.split(' ');
    const [scheme, token ]= parts;
    
   jwt.decode(token, {
       expiresIn: Date.now
   })

     return res.send({token})

     



},

async forgotpassword(req, res) {

    const {email} = req.body;

    try {
        const user = await User.findOne({email});

        if (!user)
          return res.status(400).send ({error: 'User not found'});
        
        const token = crypto.randomBytes(20).toString('hex');

        const now = new Date();
        now.setHours(now.getHours() + 1);

        await User.findByIdAndUpdate(user.id, {
            '$set': {
                passwordResetToken: token,
                passwordResetExprires: now,
            }
        });

        mailer.sendMail({
            to: email,
            from: 'danieltitodacosta',
            template: 'forgot_password',
            context: {token},
        }, (err) => {    
            console.log(err);
            return res.status(400).send ({error: 'error ao enviar a senha ao email'});
            
        });
        
       res.send(`Okay, user ${user.name}, vá até seu email`);
       console.log(token);

    } catch (err) {
        console.log(err);
        res.status(400).send ({error: 'Erro em tentar recuperar a senha, try again'});
    }
},

async reset_password(req, res){
    const {email, token, password}= req.body;

    try {
        const user = await User.findOne({email})
        .select('+passwordResetToken passwordResetExprires');

        
        if (!user)
          return res.status(400).send ({error: 'User not found'});

        if (token !== user.passwordResetToken)
        return res.status(400).send ({error: 'token invalido'});

        const now= new Date();

        if (now > user.passwordResetExprires)
        return res.status(400).send ({error: 'Token expirou, gere um novo'});

        user.password= password;
        
        await user.save();        
        res.send();

    } catch (error) {
        console.log(error);
        res.status(400).send ({error: 'Não pode resetar a senha'});
    }
},

async buscar_user(req,res){
     const {user_id} = req.params.id
     const id = req.params.id
    try {
        const post  = await Post.find({user_id})
        const user  = await User.findById(id)
        const card  = await Card.find({user_id})
        
        return res.send({user,card, post})
    
    } catch (error) {
        console.log(error)
        return res.status(400).send ({error: 'Erro Loading dos dados do Usuário'});      
    }
},

}