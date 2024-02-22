const User = require('../models/User');
const bcrypt = require('bcrypt');

// User login
exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        // Find the user by username
        const user = await User.findOne({ username });

        // If user not found
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);

        // If passwords don't match
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // If authentication succeeds, you can set session or JWT token
        req.session.user = user;
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// User signup
// User signup
exports.signup = async (req, res) => {
  const { username, password } = req.body;
  try {
      // Check if user already exists
      const existingUser = await User.findOne({ username });

      // If user already exists
      if (existingUser) {
          return res.status(400).json({ message: 'User already exists' });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create new user
      const newUser = new User({ username, password: hashedPassword });
      await newUser.save();

      // Redirect to login page upon successful signup
      res.redirect('/auth/login');
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
  }
};

// User logout
exports.logout = (req, res) => {
  try {
      // Clear the session or remove the authentication token
      // For example, if using sessions:
      req.session.destroy((err) => {
          if (err) {
              console.error(err);
              return res.status(500).json({ message: 'Failed to logout' });
          }
          res.clearCookie('sessionID'); // Clear session cookie if applicable
          res.redirect("/auth/login");
      });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
  }
};