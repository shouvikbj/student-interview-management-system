const mongoose = require('mongoose');

// MongoDB connection URL
const mongoURI = 'mongodb+srv://gangpayee:MaaThakur60@cluster0.4raiqsk.mongodb.net/career_camp_db';

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
