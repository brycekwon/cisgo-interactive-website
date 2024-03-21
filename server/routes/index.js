import { Router } from 'express';

const indexRouter = Router();

// Redirect people to the correct landing page
indexRouter.get('/', function(req, res) {
  res.redirect(`http://${req.hostname}:3000/`);
});

export default indexRouter;
