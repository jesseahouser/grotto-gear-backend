const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const port = process.env.PORT || 9000
require('dotenv').config()
const atlasPass = process.env.ATLAS_DB_PASSWORD
const atlasDBName = process.env.ATLAS_DB_NAME
const uri = `mongodb+srv://JesseHouser:${atlasPass}@cluster-grottogear0.kdmlt.mongodb.net/${atlasDBName}?retryWrites=true&w=majority`
const Gear = require("./models/gear")

app.use(cors())
app.use(express.json())

mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.log('MONGODB CONNECTED'))
  .catch(error => console.error(error))

app.get('/gear', (request, response) => {
  Gear.find({})
    .then(gears => response.send(gears))
 })

app.get('/gear/:id', (request, response) => {
  Gear.find({_id: request.params.id})
  .then(gear => response.send(gear))
})

app.post('/gear', (request, response) => {
  const { gear } = request.body
  Gear.create(gear)
    .then(gear => response.send(gear))
})

app.patch('/gear/:id', (request, response) => {
  const { gear } = request.body
  Gear.updateOne({_id: request.params.id}, gear)
  .then(gear => response.send(gear))
})

app.delete('/gear/:id', (request, response) => {
  Gear.deleteOne({_id: request.params.id})
  .then(gear => response.send(gear))
})

app.listen(port, () => console.log(`listening on port ${port}`))