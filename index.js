const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const port = 9000 // 3000-9500
require('dotenv').config()
const atlasPass = process.env.ATLAS_DB_PASSWORD
const atlasDBName = process.env.ATLAS_DB_NAME
const uri = `mongodb+srv://JesseHouser:${atlasPass}@cluster-grottogear0.kdmlt.mongodb.net/${atlasDBName}?retryWrites=true&w=majority`
const { Schema } = mongoose

const gearSchema = new Schema({
  type: String,
  brand: String,
  model: String,
  quantity: Number
})

const Gear = mongoose.model('Gear', gearSchema)

app.use(cors())
app.use(express.json())

mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.log('MONGODB CONNECTED'))
  .catch(error => console.error(error))

app.get('/gear', (request, response) => {
  Gear.find({})
    .then(gears => response.send(gears))
 })

 app.post('/gear', (request, response) => {
  const { gear } = request.body
  Gear.create(gear)
    .then(gear => response.send(gear))
})

app.listen(port, () => console.log(`listening on port ${port}`))