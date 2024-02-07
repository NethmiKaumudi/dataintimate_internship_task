
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET;
const dbConnection = require('../db/dbConnection');

const router = express.Router();


router.post('/signup', async (req, res) => {
    const { username, password, role } = req.body;

    try {
        // Check if the user already exists in the database
        const connection = await dbConnection;
        const [existingUser] = await connection.promise().query('SELECT * FROM users WHERE username = ?', [username]);

        if (existingUser.length > 0) {
            return res.status(409).json({ success: false, message: 'User with this username already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert the new user into the database with the specified role or default to 'user'
        await connection.query('INSERT INTO users (username, password, role) VALUES (?, ?, ?)', [username, hashedPassword, role || 'user']);

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
        // Check if the user exists in the database
        const connection = await dbConnection;
        const [user] = await connection.promise().query('SELECT * FROM users WHERE username = ?', [username]);

        if (user.length === 0) {
            return res.status(401).json({ success: false, message: 'Invalid username or password' });
        }


        const passwordMatch = await bcrypt.compare(password, user[0].password);

        if (!passwordMatch) {
            return res.status(401).json({ success: false, message: 'Invalid username or password' });
        }

        // Generate a JWT token with user information, including the role
        const token = jwt.sign({ username, role: user[0].role }, secretKey, { expiresIn: '1h' });
        res.status(200).json({ success: true, token });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ success: false, message: 'Error during login.' });
    }
});

module.exports = router;
