require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser');
const sequelize = require('./util/dbConnection');
const cors = require('cors')
const passport = require('passport');
const session = require('express-session');
const port = process.env.PORT || 5000;

// require('./util/passport-setup')

const app = express()

const authRoutes = require('./routes/auth/authRoutes');
const homeRoutes = require('./routes/home/homeRoutes')

const { errorHandler } = require('./util/errorHandler');

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
)

app.use(session({
  secret: 'your-secret-key', // Change this to a secure secret key
  resave: false,
  saveUninitialized: false,
}));
//app.use(express.json({ limit: '1kb' }))
app.use(bodyParser.json())

app.use(passport.initialize())

app.use(passport.session())

app.use(homeRoutes)
app.use(authRoutes)

app.use(errorHandler)

// app.use((req, res, next) => { //CORS error setting
//   res.setHeader('Access-Control-Allow-Origin', '*'); // It will not send  response, but only set the Header
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   next();
// });




sequelize
.sync()  
// .sync({force: true})  //Setting 'force: true' because we already made some data so to overwrite with this updated information (relations that we add)
        //It syncs your all models by creating appropriate tables for them
.then(() => {
  app.listen(port, (err) => { //process.env.PORT:- it will fetch the variables stored in '.env' file (for this line the PORT variable)

    if (!err) {
      console.log(`Server listening at Port: ${port}`);
    } else console.log(err)
  
  });
})
.catch(err => console.log(err));     


