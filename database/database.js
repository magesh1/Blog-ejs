const mongoose = require('mongoose');

const uri = "mongodb+srv://username:userpassword@cluster0.we8kq.mongodb.net/dbname?retryWrites=true&w=majority"

const rules = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
}

mongoose.connect(uri, rules, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('database connected..')
    }
})
