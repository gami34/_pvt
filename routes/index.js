var express = require('express');
var router = express.Router();
//import the pvt class
var Pvt = require('../pvt_class')
//converting the data into a dictionary data structure
const candidates = {
    alice : ['x', 10, 92, 23, 17,  2, 44, 33, 41, 19, 54],
    bob   : ['x', 21, 91, 10,  9, 12, 21, 52, 18, 34, 78],
    carol : ['x', 10, 81,  8, 28, 53, 53, 10, 11, 40, 36],
    dave  : ['x', 48, 12, 40, 30, 33, 37, 81, 29, 28, 32],
    eli   : ['x', 12,  9, 21, 44, 13, 17, 21, 34, 33, 62]
    }
const poll = new Pvt(candidates)
console.log(`Object property = ${poll.val}`);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
