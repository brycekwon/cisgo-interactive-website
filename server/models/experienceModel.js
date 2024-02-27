import mongoose from 'mongoose';

const experienceSchema = mongoose.Schema({
    meta: {
		isPublic: Boolean,
		emailVisible: Boolean,
    },
    name: {
		firstName: String,
		lastName: String,
    },
    contact: {
		email: String,
	},
    body: {
		program: String,
		location: {
			country: String,
			region: String,
		},
		duration: {
			startTime: Date,
			endTime: Date,
		},
		description: String,
	},
	images: {
		img1: {
			data: Buffer,
			contentType: String,
		},
		img2: {
			data: Buffer,
			contentType: String,
		},
		img3: {
			data: Buffer,
			contentType: String,
		},
	},
})

// TODO: Fix image field
// TODO: Transition to using a user ID

const experienceModel = mongoose.model('Experiences', experienceSchema);

export default experienceModel;
