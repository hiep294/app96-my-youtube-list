const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  title: String,
  link: String,
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Item', itemSchema)