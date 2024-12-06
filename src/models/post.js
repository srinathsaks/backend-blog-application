const db = require('../config/db');

class Post {
    static async getAll() {
        const query = 'SELECT * FROM login.postsRecord';
        return db.execute(query);
    }

    static async create(title, content) {
        const query = 'INSERT INTO login.postsRecord (title, content) VALUES (?, ?)';
        return db.execute(query, [title, content]);
    }

    static async update(id, title, content) {
        const query = 'UPDATE login.postsRecord SET title = ?, content = ? WHERE postId = ?';
        return db.execute(query, [title, content, id]);
    }

    static async delete(id) {
        const query = 'DELETE FROM login.postsRecord WHERE postId = ?';
        return db.execute(query, [id]);
    }
}

module.exports = Post;

