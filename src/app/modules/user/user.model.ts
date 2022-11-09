import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 30,
  },
  lastName: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 30,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please fill a valid email address',
    ],
  },
  avatarUrl: {
    type: String,
    required: true,
    minlength: 1,
  },
});
const User = mongoose.model('User', userSchema);

export default User;
