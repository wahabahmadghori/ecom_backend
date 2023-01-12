const {Schema, model} = require('mongoose')

const categorySchema = Schema({
    name: {
        type: String,
        required: true
    },
    icon: {
        type: String
    },
    color: {
        type: String
    }

})

exports.Category = model('Category', categorySchema)