// Import everything from express and assign it to the express variable
//import * as express from 'express';
import * as express from "express";
import * as bodyParser from "body-parser";

// Import WelcomeController from controllers entry point
import {WelcomeController, HomePageController, UserController} from './controllers/index';

// Create a new express application instance
const app: express.Application = express();
// The port the express app will listen on
const port: number = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// Mount the WelcomeController at npm install -g typescript ts-nodethe /welcome route
app.use('/', HomePageController);
app.use('/welcome', WelcomeController);
app.use('/user', UserController);

// Serve the application at the given port
app.listen(port, () => {
  // Success callback
  console.log(`Listening at http://localhost:${port}/`);
});