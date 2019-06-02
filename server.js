require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose');
const db = mongoose.connection;

// DB connect
mongoose.connect(process.env.MONGOURI, { useNewUrlParser: true, useFindAndModify: false });
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('DB is connected')
});

// app config
app.use(express.json()) // body parser
// routes
app.use('/api/items', require('./routes/api/items'))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server is starting at port ${PORT}`))