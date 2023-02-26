const express = require('express');
const router = express.Router();



router.get('/', (req, res) => {
    res.render('index.pug', { 
      title: 'Dynamic HTML',
      h1: 'Dynamic HEADER',
      p1: 'This is my very first dynamically generated html using node.js express with PUG view engine.'
     })
  });

  module.exports = router;