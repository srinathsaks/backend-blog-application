const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./src/routes/authRoutes');
const postRoutes = require('./src/routes/postRoutes');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());


app.use(
    cors({
      origin: 'http://localhost:4200', 
      methods: ['GET', 'POST', 'PUT', 'DELETE'], 
      allowedHeaders: ['Content-Type', 'Authorization'], 
    })
  );
  
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  

app.get('/', (req, res) => {
    res.send('Welcome to the Blog API');
  });

app.use('/api', authRoutes);
app.use('/api', postRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
