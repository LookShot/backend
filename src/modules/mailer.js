const path = require ('path');
const nodemailer = require('nodemailer');
const hbs = require ('nodemailer-express-handlebars');

const {host ,port, user, pass}= require ('../config/mail.json');

var transport = nodemailer.createTransport({
    host,
    port,
    auth: {user, pass}
  });

 transport.use('compile', hbs({
     viewEngine: {
        extName: '.html',
        partialsDir: 'src/resources/mail/auth/',
        layoutsDir: 'src/resources/mail/auth/',
        defaultLayout: 'forgot_password.html',
     },
     viewPath: path.resolve('src/resources/mail/auth/'),
     extName: '.html',
 }));

  module.exports = transport;