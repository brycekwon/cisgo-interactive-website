import { Router } from 'express';

let router = Router();


/* GET home page. */
let indexRouter = router.get("/", function (req, res) {
	// res.sendStatus(200);
	res.redirect(`http://${req.hostname}:3000/`);
});

export default indexRouter;
