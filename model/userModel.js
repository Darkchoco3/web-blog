const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  email: {
    type: String,
    required: [true, 'Email address is required'],
    unique: true,
    validate: [isEmail, 'Please provide a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'The minimum password length is 8']
  }
}, { timestamps: true });

userSchema.pre('save', async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.comparePassword = async function (userPassword) {
  try {
    const isCorrect = await bcrypt.compare(userPassword, this.password);
    return isCorrect;
  } catch (error) {
    throw new Error(error);
  }
};
userSchema.methods.generateToken = function () {
  return jwt.sign({ userId: this._id, 
    name: this.name }, process.env.jwt_secret, { expiresIn: '7d' });
};

module.exports = mongoose.model('User', userSchema);
