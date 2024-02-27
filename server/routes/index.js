"use strict";

import { Router } from 'express';

let router = Router();


// Redirect people to the correct landing page
let indexRouter = router.get("/", function (req, res) {
	res.redirect(`http://${req.hostname}:3000/`);
});

export default indexRouter;
