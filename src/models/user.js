const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    require: true,
    minLength: 4,
    maxLength: 50,
    trim: true,
  },
  lastName: { type: String, trim: true },
  email: { type: String, unique: true, trim: true, lowercase: true },
  password: { type: String },
  age: { type: Number, min: 18 },
  gender: {
    type: String,
    validate(value) {
      if (!["male", "female", "other"].includes(value)) {
        throw new Error("Gender data is not valid!");
      }
    },
  },
});

module.exports = mongoose.model("User", userSchema);
