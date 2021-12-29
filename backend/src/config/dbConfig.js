const mongoose = require('mongoose')

//'mongodb+srv://admin:mara100276@cluster0.8zv9j.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

const dbConfig =
    'mongodb+srv://admin:mara100276@cluster0.8zv9j.mongodb.net/annotations?retryWrites=true&w=majority'

const connection = mongoose.connect(dbConfig, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

module.export = connection
