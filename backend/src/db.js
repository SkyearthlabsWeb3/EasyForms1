const mongoose = require('mongoose');



const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://provider.palmito.duckdns.org:31820/uploadId', options);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit process with a failure code
  }
};

module.exports = connectDB;
