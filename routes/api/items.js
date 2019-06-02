const express = require('express')
const Item = require('../../models/Item')

const route = express.Router()
//localhost:5000/api/items
route.post('/', (req, res) => {
  const item = new Item(req.body)
  item.save().then(resItem => res.send(resItem))
    .catch(errs => console.log(errs))
  req.body
})

route.get('/', (req, res) => {
  Item.find().sort({ date: -1 }).then(items => res.send(items))
})

route.put('/:id', (req, res) => {
  const { title, link } = req.body
  let item = Item.findById(req.params.id)
  item.then(foundItem => item.updateOne({ title, link }).then(() => res.send({ success: true })))
    .catch(errs => res.status(404).send({ success: false }))
})

route.delete('/:id', (req, res) => {
  Item.findOneAndRemove({ _id: req.params.id }).then(item => res.send({ success: true, item }))
    .catch(errs => res.status(404).send({ success: false }))
})

module.exports = route