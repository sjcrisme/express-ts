// Import only what we need from express
import { Router, Request, Response } from 'express';
import * as jwt from "jsonwebtoken";

const router: Router = Router();
const users = [{
    id:1,
    username: 'tester',
    password: '12345',
    email:'teste@test.ua',
    avatar:'1.png'
},
{
    id:2,
    username: 'admin',
    password: 'admin',
    email:'admin@not-test.ua',
    avatar:'admin.png'
}];

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

    let user = users.find((u) => u.username == req.body.username && u.password == req.body.password);
    if (user !== undefined) {
        console.log(user);
        jwt.sign({user},'secretkey',(err, token) => {
            res.json({
                token: token
            });
        });
    } else {
        res.status(400).send({message: 'Password or login don\'t match'});
    }
    // console.log('--', req.body.username);
    // console.log('==', req.body.password);
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