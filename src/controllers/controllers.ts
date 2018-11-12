// Import only what we need from express
import { Router, Request, Response } from 'express';


const router: Router = Router();
router.get('/', (req: Request, res: Response) => {
  // Reply with a hello world when no name param is provided
  //res.send('Hello, World!');
  res.status(200).send({
    message: 'GET request successfulll!!!!'
  })
});

router.get('/:name', (req: Request, res: Response) => {
  // Extract the name from the request parameters
  let { name } = req.params;

  // Greet the given name
  res.send(`Hello, ${name}`);
});


const userRouter: Router = Router();

userRouter.get('/', (req: Request, res: Response) => {
  // Reply with a hello world when no name param is provided
  //res.send('Hello, World!');
  res.status(200).send({
    message: 'GET  User request successfulll!!!!'
  })
});


// Export the express.Router() instance to be used by server.ts
export const UserController: Router = userRouter;
// Export the express.Router() instance to be used by server.ts
export const WelcomeController: Router = router;