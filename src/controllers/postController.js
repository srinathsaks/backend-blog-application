const { body, validationResult } = require('express-validator');
const Post = require('../models/post');

exports.getPosts = async (req, res) => {
  try {
      const [posts] = await Post.getAll();
      res.status(200).json(posts);
  } catch (err) {
      res.status(500).json({ message: 'Error fetching posts', error: err.message });
  }
};

exports.createPost = [
  body('title').notEmpty().withMessage('Title is required'),
  body('content').notEmpty().withMessage('Content is required'),
  async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
      }

      const { title, content } = req.body;

      try {
          await Post.create(title, content);
          res.status(201).json({ message: 'Post created successfully' });
      } catch (err) {
          res.status(500).json({ message: 'Error creating post', error: err.message });
      }
  },
];

exports.updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  try {
      await Post.update(id, title, content);
      res.status(200).json({ message: 'Post updated successfully' });
  } catch (err) {
      res.status(500).json({ message: 'Error updating post', error: err.message });
  }
};

exports.deletePost = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.userId; 

  console.log('Deleting post ID:', id, 'for user ID:', userId); 
  if (!id) {
    return res.status(400).json({ message: 'Post ID is required' });
  }

  try {
      await Post.delete(id, userId);
      res.status(200).json({ message: 'Post deleted successfully' });
  } catch (err) {
      res.status(500).json({ message: 'Error deleting post', error: err.message });
  }
};


