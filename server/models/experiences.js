import mongoose from 'mongoose';

const schema = mongoose.Schema({
  meta: {
    isPublic: Boolean,
    emailVisible: Boolean,
  },
  name: {
    first: String,
    last: String,
  },
  affiliation: {
    position: String,
    department: String,
  },
  contact: {
    email: String,
    website: String,
  },
  location: {
    country: String,
    region: String,
  },
  duration: {
    startTime: Date,
    endTime: Date,
  },
  program: String,
  description: String,
});

const model = mongoose.model('experiences', schema);

export default model;
