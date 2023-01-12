const {Schema, model} = require('mongoose')

const orderSchema = {}

exports.Order = model('Order', orderSchema)