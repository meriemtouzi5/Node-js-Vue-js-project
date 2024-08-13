const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Backend server running at http://localhost:${port}`);
});

app.get('/api/data', (req, res) => {
    res.json({ message: 'Hello from Node.js!' });
});