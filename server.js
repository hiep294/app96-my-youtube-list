require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose');
const db = mongoose.connection;
const path = require('path')

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

//serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // set static folder
  app.use(express.static('client/build'))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server is starting at port ${PORT}`))