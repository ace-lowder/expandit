import express from 'express';

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json()); // Middleware for parsing JSON

app.get('/', (req, res) => {
  res.send('Backend server is running!');
});

app.listen(port, () => {
  console.log(`Backend server running on port ${port}`);
});
