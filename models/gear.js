const mongoose = require('mongoose')
const { Schema } = mongoose

const GearSchema = new Schema({
  type: String,
  brand: String,
  model: String,
  quantity: Number,
  image: String
})

module.exports = mongoose.model('Gear', GearSchema)