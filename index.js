
  const express = require("express");
  const bodyParser = require("body-parser");
  var path = require('path');
  const { Router } = require("express");
  const app = express();
  
  const router = require("express").Router();
  
  app.use(bodyParser.json());
  
  app.use(bodyParser.urlencoded({ extended : true }));

// app.use(express.static('public'))

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,OPTIONS")
  next();
})
require("./routers/routes")(app);
app.use('/api',router);
//app.use('api',router);

app.listen(3000, function (err) {
    if (err) throw err
    console.log('connected to port 3000')
  })


