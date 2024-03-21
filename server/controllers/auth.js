import authModel from "../models/credentials.js";
import bcrypt from 'bcryptjs';

/**
 * 
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 */
export async function try_login(req, res) {
	const credentials = await authModel.find( {"email": req.body.email} ).lean();

	bcrypt.compare(req.body.password, credentials[0].password, function(err, result) {
		if (err) {
			res.send(err);
			return;
		}

		if (result) {
			res.status(200).json({ "valid": true })
		}
		else {
			res.status(401).json({ "valid": false })
		}
	});
}

/**
 * 
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 */
export async function try_logout(req, res) {

}