const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://daniel:1997daniel@cluster0-0g2rl.mongodb.net/services?retryWrites=true&w=majority",
{   
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
});
 
mongoose.Promise = global.Promise;

module.exports = mongoose;
