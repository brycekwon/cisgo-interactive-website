import { Schema, model } from 'mongoose';

const schema = Schema({
  username: String,   // plaintext username
  password: String,   // bcrypt hexadecimal hash
});

const authModel = model('credentials', schema);

export default authModel;
