"use strict";

import { Router } from 'express';
import bcrypt from 'bcryptjs';

import credentialsModel from '../models/credentials.js';

const authRouter = Router();

authRouter.post("/login", async (req, res) => {
  const credentials = await credentialsModel.find( {"email": req.body.email} ).lean();
  
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
});

// authRouter.post("/logout", try_logout);

export default authRouter;

