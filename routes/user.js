const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET ;

const router = express.Router();
const users = [];

router.post('/signup', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if the user already exists
        const existingUser = users.find((user) => user.username === username);

        if (existingUser) {
            return res.status(409).json({ success: false, message: 'User with this username already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Add the new user
        users.push({ username, password: hashedPassword });

        res.status(201).json({ success: true, message: 'User created successfully' });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ success: false, message: 'Error creating user.' });
    }
});

// Login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if the user exists
        const user = users.find((user) => user.username === username);

        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid username or password' });
        }

        // Check the password
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ success: false, message: 'Invalid username or password' });
        }

        // Generate a JWT token
        const token = jwt.sign({ password }, secretKey, { expiresIn: '1h' });

        res.status(200).json({ success: true, token });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ success: false, message: 'Error during login.' });
    }
});
// router.post('/signUp',UserController.signUp);
// router.post('/signIn',UserController.signIn);


module.exports = router;

