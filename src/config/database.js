const mongoose =  require('mongoose');

const connectDB = async () => {
  await mongoose.connect('mongodb+srv://mongodb:M0NQNucZLLO9QutO@learnmongodb.tcmbchr.mongodb.net/divTinder');
}


module.exports = connectDB;