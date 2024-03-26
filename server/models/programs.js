import { Schema, model } from 'mongoose';

const schema = Schema({
  countries: [String],
  description: String,
  website: String,
});

const programModel = model('programs', schema);

export default programModel;
