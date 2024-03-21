const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') }); // Load environment variables from .env file
const mongoose = require('mongoose');
const sampleUsers = require('./sampleData'); // Import the sample data

const User = require('../models/user-model'); // Assuming your User model is defined in a separate file

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', async () => {
  console.log('Connected to MongoDB database');

  try {
    await User.insertMany(sampleUsers);
    console.log('Sample data inserted successfully');
  } catch (error) {
    console.error('Error inserting sample data:', error);
  } finally {
    db.close();
  }
});
