import express from 'express';

let router = express.Router();


/* GET home page. */
let authRouter = router.get("/", function (req, res) {
  res.sendStatus(200);
});

export default authRouter;
