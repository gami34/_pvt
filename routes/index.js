var express = require('express');
var router = express.Router();
var Candidate = require('../models/candidate')
//import the pvt class
var Pvt = require('../pvt_class');
const { update } = require('../models/candidate');
//converting the data into a dictionary data structure
const candidates = {
    alice : ['x', 10, 92, 23, 17,  2, 44, 33, 41, 19, 54],
    bob   : ['x', 21, 91, 10,  9, 12, 21, 52, 18, 34, 78],
    carol : ['x', 10, 81,  8, 28, 53, 53, 10, 11, 40, 36],
    dave  : ['x', 48, 12, 40, 30, 33, 37, 81, 29, 28, 32],
    eli   : ['x', 12,  9, 21, 44, 13, 17, 21, 34, 33, 62]
    }


/* GET home page. */
router.get('/', function(req, res, next) {
  Candidate.find({},(err, candidates)=>{
    if (err) {
      console.log(err)
    } else {
      const poll_candidates = {}
      candidates.forEach(poll_candidate =>{
        let ai = ['x']
        ai.push(poll_candidate.poll1)
        ai.push(poll_candidate.poll2)
        ai.push(poll_candidate.poll3)
        ai.push(poll_candidate.poll4)
        ai.push(poll_candidate.poll5)
        ai.push(poll_candidate.poll6)
        ai.push(poll_candidate.poll7)
        ai.push(poll_candidate.poll8)
        ai.push(poll_candidate.poll9)
        ai.push(poll_candidate.poll10)
        poll_candidates[poll_candidate.name] = ai
      })
      const poll = new Pvt(poll_candidates)
      
      let solutions = []
      
      for (const key in poll_candidates) {
        if (poll_candidates.hasOwnProperty(key)) {
          let solution = {}
          let vs = poll.vote_share(key)
          let me = poll.margin_error(key)
          
          console.log('weorkint1')
          solution.name = key
          solution.vote_share = vs
          solution.margin_error = me
          solutions.push(solution)
          
        }
      }
      res.render('index', { candidates: candidates , solutions});
    }
  })
});

router.get('/createcandidate', (req, res)=>{
  res.render('createcandidate',{candidates})
})

router.post('/createcandidate', (req, res)=>{
  var candidate = new Candidate()
  candidate.name = req.body.name;
  candidate.poll1 = req.body.poll1;
  candidate.poll2 = req.body.poll2;
  candidate.poll3 = req.body.poll3;
  candidate.poll4 = req.body.poll4;
  candidate.poll5 = req.body.poll5;
  candidate.poll6 = req.body.poll6;
  candidate.poll7 = req.body.poll7;
  candidate.poll8 = req.body.poll8;
  candidate.poll9 = req.body.poll9;
  candidate.poll10 = req.body.poll10;

  candidate.save((err)=>{
    if (err) {
      console.log(err)
    } else {
      res.redirect('/')
      
    }
  })
})

router.get('/readcandidate/:id',(req, res)=>{
  console.log(req.params.id)
  let id = req.params.id;

  Candidate.findById(id, (err, candidate)=>{
    if (err) {
      console.log(err)
      res.redirect('/')
    } else {
      res.render('readcandidate',{candidate})
    }
  })
})

router.get('/updatecandidate/:id', (req, res)=>{
  let id = req.params.id;
  Candidate.findById(id,(err, candidate)=>{
    if (err) {
      console.log(err)
      res.redirect('/')
    } else {
      res.render('updatecandidate',{candidate})
    }
  })
  
})

router.post('/updatecandidate/:id', (req, res)=>{
  let query = {_id:req.params.id}
  let candidate = {}
  candidate.name = req.body.name;
  candidate.poll1 = req.body.poll1;
  candidate.poll2 = req.body.poll2;
  candidate.poll3 = req.body.poll3;
  candidate.poll4 = req.body.poll4;
  candidate.poll5 = req.body.poll5;
  candidate.poll6 = req.body.poll6;
  candidate.poll7 = req.body.poll7;
  candidate.poll8 = req.body.poll8;
  candidate.poll9 = req.body.poll9;
  candidate.poll10 = req.body.poll10; 

  Candidate.update( query, candidate, (err)=>{
    if (err) {
      console.log(err)
      res.redirect('/')
    } else {
      res.redirect('/')
    }
  })
})

router.delete('/deletecandidate/:id',(req, res)=>{
  let id = req.params.id;

  Candidate.remove({_id:id},(err)=>{
    if (err) {
      console.log(err)
      res.redirect('/')
    } else {
      res.send('success')
    }
  })
})



module.exports = router;
