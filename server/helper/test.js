const express = require('express');
const subdomain = require('express-subdomain');
const app = express();

const router = express.Router();

// Define routes for the main domain
router.get('/', (req, res) => {
  res.send('Main Domain Content');
});

// Use the subdomain middleware for 'sub.example.com'
app.use(
  subdomain('sub', (req, res, next) => {
    res.send('Subdomain Content');
  })
);

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
