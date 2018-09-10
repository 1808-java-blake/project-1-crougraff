// this will be the entry point for our application
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import session from 'express-session';
import { reimbRouter } from './routers/reimb-router';
import { userRouter } from './routers/user-router';
//import { userRouter } from './routers/user-router';

// create the app object from express
const app = express();

// set the port
const port = process.env.PORT || 9001; // will use port from computers environment variables or 3000 if there is none
app.set('port', port);

const sess = {
  secret: 'keyboard cat',
  cookie: {secure: false},
  resave: false,
  saveUninitialized: false
};

if (app.get('env') === 'production') {
  app.set('trust proxy', 1); // trust first proxy
  sess.cookie.secure = true; // serve secure cookies
}

// register session middleware
app.use(session(sess));

// log the request being made
app.use((req, res, next) => {
  console.log(`request made with path: ${req.path} \nand type: ${req.method}`);
  next();
});

// allow static content to be served, navigating to url with nothing after / will serve index.html from public
app.use(
  express.static(path.join(__dirname, 'public'))
);
app.use('/public/login', express.static(__dirname + '/login'));
app.use('/public/home', express.static(__dirname + '/home'));
app.use('/public/create-reimb', express.static(__dirname + '/create-reimb'));
app.use('/public/admin-home', express.static(__dirname + '/admin-home'));
app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, 'public/login/login.html'));
});
app.use(bodyParser.json());// use the body parser to convert request json

/*********************************************************************************************
 * API Routers
 ********************************************************************************************/
app.use('/reimb', reimbRouter);
app.use('/users', userRouter);

const server = app.listen(port, () => {
  console.log(`App is running at http://localhost:${app.get('port')} in ${app.get('env')} mode`);
});
