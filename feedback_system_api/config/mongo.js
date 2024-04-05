const mongoose = require('mongoose')
mongoose.Promise = require('bluebird')
const DB_URL = 'mongodb+srv://admin:7GMRvoLq4alGjQw3@feebackmanagement.4lrpzu9.mongodb.net/?retryWrites=true&w=majority&appName=FeebackManagement'
const loadModels = require('../app/models/feedback')

module.exports = () => {
  const connect = () => {
    mongoose.Promise = global.Promise

    // Connect to MongoDB using Mongoose
    mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
    //console.log('Connected to MongoDB');
    })
    .catch((error) => {
      console.error('Error connecting to MongoDB:', error);
  });
  }
  connect()

  mongoose.connection.on('error', console.log)
  mongoose.connection.on('disconnected', connect)

  loadModels()
}
