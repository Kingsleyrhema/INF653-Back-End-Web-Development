const mongoose = require('mongoose');

const connectDB = async () => {
  try {
<<<<<<< HEAD
    await mongoose.connect(process.env.MONGO_URI); // cleaner version
=======
    await mongoose.connect(process.env.MONGO_URI, {  // Add options here
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
>>>>>>> 4be19f1b3fbc4f210b4fc9ae9156b7ff41439025
    console.log('MongoDB connected!');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectDB;
