const {Schema, model} = require('mongoose')

const userSchema = {}

exports.User = model('User', userSchema)