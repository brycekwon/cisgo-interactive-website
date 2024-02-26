import express from 'express';

let router = express.Router();


/* GET home page. */
let indexRouter = router.get("/", function (req, res) {
  res.sendStatus(200);
});

export default indexRouter;
