const express = require('express');
const router = express.Router();

const User = require('../../models/user');

//@route GET api/users
//@desc Get all users

router.get('/', (req, res) => {
    User.find()
        .sort({ id: 1})
        .then(users => res.json(users));
});

//@route POST api/users
//@desc Create new user
//@access Public for now

router.post('/', (req, res) => {
    const newUser = new User({
        name: req.body.name
    });

    newUser.save()
        .then(item => res.json(item));
});

//@route DELETE api/users/:id
//@desc Delete a user
//@access Public for now

router.delete('/:id', (req, res) => {
    User.findById(req.params.id)
        .then(user => user.remove()
            .then(() =>  res.json({success: true})))
        .catch(err => res.status(404).json({success: false}));
});


module.exports = router;

