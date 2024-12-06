const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const SECRET_KEY = '03da03f23af1fbcb14acef913631234877c9f0b773a3386ed59949e2b1145360';

dotenv.config();

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;
  
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized: Token missing' });
    }
  
    const token = authHeader.split(' ')[1];
  
    try {
      const decoded = jwt.verify(token, SECRET_KEY);
      req.user = decoded; 
      next();
    } catch (err) {
      console.error('Error verifying token:', err.message);
      res.status(401).json({ message: 'Unauthorized: Invalid token', error: err.message });
    }
  };
