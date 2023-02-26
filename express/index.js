
const config = require('config');
const logger = require('./logger');
const courses = require('./routes/courses');
const home = require('./routes/home');
const express = require('express');
const app = express();

app.set('view engine', 'pug');
app.set('views', './view');

console.log(`Current env: ${process.env.NODE_ENV}`);
console.log(`app: ${app.get('env')}`);

// Enables parsing of json objects in the body of a request
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use((req, res, next) => {
  console.log('authenticating...');
  next();
});

// using the courses modules to handle the /api/courses routes
app.use('/courses', courses);

app.use('/', home);

app.use(logger);

// Configuration
// console.log(process.env.app_password);
console.log("Application Name: ", config.get('name'));
console.log("Mail Server: ", config.get('mail.host'));
console.log("Mail Pass: ", config.get('mail.password'));

// Dynamic html



const port = process.env.PORT || 2000;
app.listen(port, () => console.log(`listening on port ${port}...`))


