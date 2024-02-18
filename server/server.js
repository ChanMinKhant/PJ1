require('dotenv').config();
const express = require('express');
const cors = require('cors');
// 1) UNCAUGHT EXCEPTIONS
// process.on('uncaughtException', (err) => {
//   console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
//   console.log(err.name, err.message);
//   process.exit(1);
// });
const app = express();
const CustomError = require('./utils/CustomError.js');
//const { exec,fork } = require('child_process');
const { dbConnect } = require('./config/dbConnect.js');
const cookieParser = require('cookie-parser');

dbConnect();

const corsOptions = {
  origin: function (origin, callback) {
    const whitelist = [
      'http://localhost:3000',
      'http://localhost:5173',
      process.env.FRONTEND_URL, // This should be the base domain without any subdomain
    ];

    if (!origin || whitelist.some((domain) => origin.includes(domain))) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
//cors option with localhost 5173
// const corsOptions = {
//   origin: 'http://localhost:5173',
//   credentials: true,

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static('uploads'));

app.use(require('./routes/index.js'));
// app.use('/', require('./routes/authRouter.js'));
// app.use(require('./middlewares/verifyJWT.js'));
// app.use('/file', require('./routes/fileRouter.js'));
// app.use('/url', require('./routes/urlRouter.js'));
app.all('*', (req, res, next) => {
  const err = new CustomError(
    `Can't find ${req.originalUrl} on this server!`,
    404
  );
  next(err);
});

app.use(require('./controllers/errorController.js'));

const port = process.env.PORT || '3001';
const server = app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

//i am not sure i should use it or not. i will research it later
//if you want to use fork
// const child = fork('./child.js');
// child.on('message', (data) => {
//   console.log(data);
// });

// 2) UNHANDLED REJECTIONS

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
