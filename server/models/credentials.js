import { Schema, model } from 'mongoose';

const schema = Schema({
  username: String,
  password: String, // base-16 hash
});

const authModel = model('credentials', schema);

export default authModel;
