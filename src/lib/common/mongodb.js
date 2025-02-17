const mongoose = require('mongoose');

class Mongodb {
    connect = async () => {
        await mongoose.connect(process.env.MONGODB_URL + '/test', {
            useNewUrlParser: true
        });
        mongoose.Promise = global.Promise;
        mongoose.connection.on(`error`, console.error.bind(console, `Erro na Ligação ao MongoDB`));
    }
}