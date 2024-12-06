const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const dotenv = require('dotenv');

dotenv.config();

exports.register = async (req, res) => {
    const { username, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create(username, hashedPassword); 
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error('Error during registration:', err);
        res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
};


exports.login = async (req, res) => {
    const { username, password } = req.body;

    console.log('Request Body:', req.body);

    try {
        const user = await User.findByUsername(username);
        if (!user) {
            console.error('User not found:', username);
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        console.log('User retrieved from DB:', user);

        
        console.log('Input password:', password);
        console.log('Stored password from DB:', user.password);

        const isMatch = await bcrypt.compare(password, user.passwords);
        if (!isMatch) {
            console.error('Password mismatch for user:', username);
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
};
  
