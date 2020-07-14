const multer = require('multer')
const { Router } = require('express'); // importando apenas o modulo específico do express {Router} 

const img = require('./app/controllers/img')
const Auth = require('./app/middleware/auth')
const AuthController = require('./app/controllers/authController')
const CardController = require('./app/controllers/cardController')

const Post = require('./app/models/Post')
const uploadConfig = require('./config/upload')

const router = Router();
const upload = multer(uploadConfig)
//Referente ao usuário
router.post('/auth/forgotpassword', AuthController.forgotpassword);
router.post('/auth/register', AuthController.store);
router.post('/auth/authenticate', AuthController.authenticate);
router.get('/auth/user', Auth, AuthController.user);
router.post('/auth/reset_password', AuthController.reset_password);
router.put('/auth/updateuser', Auth, AuthController.update);

router.get('/portifolio/:id', AuthController.buscar_user)


//referente ao card do usuário
router.get('/cards/card', Auth, CardController.user_cards)
router.get('/cards/todos', CardController.cards_user)
router.post('/cards', Auth, CardController.creat_card_user)
router.put('/cards/:cardId', Auth, CardController.update_card_user)
router.delete('/cards/:cardId', Auth, CardController.delete_card)
router.get('/cards/tipo', CardController.seach_cards)

// router.put('/auth/img',Auth,upload.single('img'),img.update);


//adicionar imagens e midias
router.post('/img/adiconar_img', Auth, upload.single('file'), img.create_img)
router.delete('/img/delete_img/:id', Auth, img.delete_img)
router.get('/img', Auth, img.buscar_img)
router.put('/img/update/:id', Auth, upload.single('file'), img.update_img);

module.exports = router;

