// Import only what we need from express
import { Router, Request, Response } from 'express';
import * as jwt from "jsonwebtoken";

const router: Router = Router();

router.get('/', (req: Request, res: Response) => {
  res.status(200).send({
    message: 'GET  API'
  })
});

router.get('/userinfo', verifyToken, (req, res) => {

  jwt.verify(req['token'], 'secretkey', (err, authData)=> {

    if(err){
      res.sendStatus(403);
    } else {
      res.json({
        message: 'userInfo...',
        authData
      });
    }

  });
});

router.post('/authenticate', (req, res) => {

  const user = {
    id:1,
    uname:'tester',
    password:'123'
  };

  jwt.sign({user:user},'secretkey',(err, token) => {
    res.json({
      token: token
    });
  });

  console.log('req',req.body);
  // res.status(200).send({
  //   message: 'POST  API'
  // });
});

function verifyToken(req, res, next) {
  //get auth header value
  const bearerHeader = req.headers['authorization'];
  if(typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
};

// Export the express.Router() instance to be used by server.ts
export const ApiController: Router = router;