const Post = require ('../models/Post')


module.exports = {

async create_img (req, res) {
    const tipo = req.query.tipo;
    const user = await req.userId;
    const fp = `${tipo}`
    try {
        const{ size, key, location: url=""} = req.file
        const post = await Post.create({
            name: fp,
            size,
            key,
            url,
            user,
        })

        return res.json(post)
        

    } catch (error) {
        console.log(error);
        res.status(400).send ({error: 'Não foi possivel adicionar a imagem'});  
    }

},

async buscar_img (req,res){
    try {
        const user = req.userId
        const posts = await Post.find({user});
        return res.send(posts)
    } catch (error) {
        console.log(error);
        res.status(400).send ({error: 'Não foi possivel buscar a imagem'});  
    }
          
},

async delete_img (req,res){

    try {      

    const posts = await Post.findById(req.params.id)
    await posts.remove()
  
        return res.send('okay')
        
    } catch (error) {
        console.log(error);
        res.status(400).send ({error: 'Erro ao deletar a imagem'});
        
    }

},
    
async update_img (req, res){
   
    try {      
        const posts = await Post.findById(req.params.id)
        await posts.remove()
            
        } catch (error) {
            console.log(error);
            res.status(400).send ({error: 'Erro ao deletar a imagem'});
            
        }
    
    const user = await req.userId;
    const fp = `fotoperfil${user}`
    try {
        const{ size, key, location: url=""} = req.file
        const post = await Post.create({
            name: fp,
            size,
            key,
            url,
            user,
        })

        return res.json(post)
        

    } catch (error) {
        console.log(error);
        res.status(400).send ({error: 'Não foi possivel adicionar a imagem'});  
    }


},

// async update_img (req, res){
//     const user = await req.userId;
//     const {filename} = req.file
//     const verificar = await User.findById(user)

//     try {
        
//     if(await (verificar.img != null) &&(verificar.img != filename) ){
//         promisify(fs.unlink)(path.resolve(__dirname,'..','..','..','uploads',`${verificar.img}`))
//     }
        
//         const teste = await User.findByIdAndUpdate(user,{img: filename}, {new: true })

//         return res.send(teste)

//     } catch (error) {
//         console.log(error);
//         res.status(400).send ({error: 'Não foi possivel adicionar a imagem'});
//     }
// },

}