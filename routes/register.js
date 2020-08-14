// express
const express = require('express');
const router = express.Router();
// middleware
const auth = require('../middleware/auth');
// mongo
const User = require('../models/User');
// npm's
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

// @route    POST /homepage
// @desc     Landing page
// @access   Public
router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
    check('password2', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
  ], 
  async (req, res) => {
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    const { name, password, password2 } = req.body;
    try {
      // see if name already exists
      let user = await User.findOne({ name }, { unqiue: true });
      if (user) {
        return res.status(400).json({ errors: [{ msg: 'Trainer name already taken!' }] });
      }

      user = new User({
        name,
        password,
        password2
      });

      // // bcrypt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      // save to mongo
      await user.save();

      // return json webtoken
      const payload = {
        user: {
          id: user.id
        }
      }
      // set to 3600 (1 hr) in production
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: 360 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        });
        console.log('REGISTER: ', req.body); // object of data sent to the route
    } catch(err) {
      console.error(err.message);
      res.status(500).send('Server Error register')
    }
});

module.exports = router;