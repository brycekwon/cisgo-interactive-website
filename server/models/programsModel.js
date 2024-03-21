"use strict";

import {Schema, model} from 'mongoose';

const schema = Schema({
	countries: [String],
	description: String,
	website: String,
});

const programModel = model('Programs', schema);

export default programModel;