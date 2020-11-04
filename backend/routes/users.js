const router = require('express').Router();
let User2 = require('../models/user.model');

router.route('/').get((req, res) => {
  User2.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/add').post((req, res) => {
  const username = req.body.username;

  const newUser = new User2({username});

  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;