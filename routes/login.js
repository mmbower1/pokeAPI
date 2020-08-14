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

// @route    GET /login
// @desc     Load user when logged in
// @access   Public
router.get('/', auth, async (req, res) => {
	try {
		// user is accessed from auth middleware
    const user = await User.findById(req.user.id).select('-password');
		res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error login')
  }
});

// @route    POST /login
// @desc     Authenticate user and get token
// @access   Public
router.post(
  '/',
	[
		check('name', 'Please enter your Pokemon Go trainer name').not().isEmpty(),
		check('password', 'Password is required').exists({ min: 6 })
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
    }
		const { name, password } = req.body;
		console.log('name', req.body.name, 'pw', req.body.password)
		try {
			// see if user exists
      let user = await User.findOne({ name });
      console.log('LOGIN: ', user);
			if (!user) {
				return res.status(400).json({ errors: [ { msg: 'Invalid credentials!' } ] });
      }
      // compare password with bcrypt password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ errors: [ { msg: 'Invalid credentials!' } ] });
      }

			// return json webtoken
			const payload = {
				user: {
					id: user.id
				}
			};
			// set to 3600 (1 hr) in production
			jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 360 }, (err, token) => {
				if (err) throw err;
				res.json({ token });
			});

		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server Error login');
		}
	});

module.exports = router;