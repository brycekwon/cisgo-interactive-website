"use strict";

import {Schema, model} from 'mongoose';

const schema = Schema({
	email: String,
	password: String, // base-16 hash
});

const authModel = model('Auth', schema);

export default authModel;