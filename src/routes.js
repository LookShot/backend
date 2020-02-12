const{ Router }= require ('express'); // importando apenas o modulo específico do express {Routes} 
const AuthController = require('./app/controllers/authController');
//const CardController = require('./app/controllers/cardController');
const Auth= require('./app/middleware/auth'           );

const routes =Router();

routes.post('/auth/forgotpassword', AuthController.forgotpassword);
routes.post('/auth/register',AuthController.store         );
routes.post('/auth/authenticate', AuthController.authenticate  );
routes.post('/auth/reset_password', AuthController.reset_password);
routes.put ('/auth/updateuser',Auth, AuthController.update);

module.exports = routes;

