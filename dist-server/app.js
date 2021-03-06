import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import sassMiddleware from 'node-sass-middleware';

var postcssMiddleware = require('postcss-middleware'); // const autoprefixer = require('autoprefixer');


import indexRouter from './routes/index';
var app = express();
app.set('views', path.join(__dirname, '../templates/views'));
app.set('view engine', 'pug');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(sassMiddleware({
  /* Options */
  src: process.cwd(),
  dest: path.join(__dirname, '../public'),
  debug: true,
  outputStyle: 'compressed'
})); // app.use(postcssMiddleware({
//   plugins: [
//     /* Plugins */
//     autoprefixer({
//       /* Options */
//     })
//   ],
//   src: function(req) {
//     return path.join('public/stylesheets', req.url);
//   }
// }));

app.use(express["static"](path.join(__dirname, '../public')));
app.use('/', indexRouter); // catch 404 and forward to error handler

app.use(function (req, res, next) {
  next(createError(404));
}); // error handler

app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {}; // render the error page

  res.status(err.status || 500);
  res.render('error');
});
export default app;