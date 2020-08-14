const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add your Pokemon Go trainer name'],
    unique: true,
  },
  // email: {
  //   type: String,
  //   required: [true, 'Please add an email'],
  //   unique: true,
  //   match: [
  //     /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  //     'Please add a valid email'
  //   ]
  // },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: 6
  },
  password2: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: 6
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model('User', UserSchema);