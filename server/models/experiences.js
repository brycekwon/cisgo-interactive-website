import mongoose from 'mongoose';

const schema = mongoose.Schema({
  meta: {
    isApproved: Boolean,      // entry has been approved by admin
    isVisible: Boolean,       // entry is visible to the public
    contactVisible: Boolean,  // entry contact information is visible to the public
  },
  name: String,           // name of entry individual
  email: String,        // email of entry individual
  affiliation: String,    // affiliation to the university [ School, Admin, Library, CSC ]
  program: String,        // purpose of global experience [ Study Abroad, Teaching Abroad, Research ]
  location: {
    country: String,      // experience country
    city: String,         // experience city
  },
  duration: {
    ongoing: Boolean,     // entry is still ongoing - NO START OR END DATE REQUIRED
    startDate: String,      // entry start date MONTH AND YEAR (YYYY-MM)
    endDate: String,        // entry end date MONTH AND YEAR (YYYY-MM)
  },
  external: {
    institutions: String,   // external institutions worked with
    partnerships: String,   // external partnersships worked with
  },
  description: String,      // description of individual's experience (instructions coming from client)
}, {
    versionKey: false,
  }
);

const model = mongoose.model('experiences', schema);

export default model;
