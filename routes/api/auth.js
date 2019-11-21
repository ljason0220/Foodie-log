const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { JWT_SECRET } = require('../../config/default');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');

const User = require('../../models/user');

//@route POST api/users
//@desc Auth user
//@access Public

router.post('/', (req, res) => {
    const { email, password } = req.body;

    if(!email || !password) {
        return res.status(400).json({ msg: 'Missing field' });
    }

    User.findOne({ email: email })
        .then(user => {
            if(!user) return res.status(400).json({ msg: 'User does not exist' });

            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if(!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

                    jwt.sign(
                        { id: user.id },
                        JWT_SECRET,
                        { expiresIn: 3600 },
                        (err, token) => {
                            if (err) throw err;
                            res.json({
                                token,
                                user: {
                                    _id: user.id,
                                    name: user.name,
                                    email: user.email
                                }
                            });
                        }
                    )
                })
        })
});


//@route GET api/auth/user
//@desc Get user data
//@access Private

router.get('/user', auth, (req, res) => {
    User.findById(req.user.id)
        .select('-password')
        .then(user => res.json(user));
});

module.exports = router;

