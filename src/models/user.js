const db = require('../config/db');

const User = {
    create: async (username, password) => {
        await db.execute('INSERT INTO login.loginsRecord (username, passwords) VALUES (?, ?)', [username, password]);
    },
    findByUsername: async (username) => {
        const [rows] = await db.execute('SELECT * FROM login.loginsRecord WHERE username = ?', [username]);
        return rows[0];
    },
  };

module.exports = User;
