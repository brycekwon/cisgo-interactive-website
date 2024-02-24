import mongoose from 'mongoose';

const experienceSchema = mongoose.Schema(
  {
    meta:
    {
      isPublic: Boolean,
      emailVisible: Boolean,
    },
    name:
    {
      firstName: String,
      lastName: String,
    },
    contact:
    {
      email: String,
    },
    body:
    {
      type: String,
      duration: Number,
      description: String,
    },
  }
)

const experienceModel = mongoose.model('Experiences', experienceSchema);

// TODO: Add image field
// TODO: Add location field

export default experienceModel;
