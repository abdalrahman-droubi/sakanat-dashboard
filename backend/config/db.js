const mongoose = require('mongoose');

const connectDB = async () => {
  try {
  await mongoose.connect(process.env.DBURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
  console.log(`MongoDB is connected`);
} catch (err) {
  console.error(err);
}
};

module.exports = connectDB;



