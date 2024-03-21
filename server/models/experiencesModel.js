"use strict";

import mongoose from 'mongoose';

const schema = mongoose.Schema({
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
	images: { // maybe do this later
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

// TODO: Transition to using a user ID

const model = mongoose.model('Experiences', schema);

export default model;
