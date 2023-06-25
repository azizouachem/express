const express = require('express');
const app = express();
const PORT = 3011;

// Middleware to verify the time of the request
const checkWorkingHours = (req, res, next) => {
  const date = new Date();
  const dayOfWeek = date.getDay();
  const hour = date.getHours();

  if (dayOfWeek >= 1 && dayOfWeek <= 5 && hour >= 9 && hour < 17) {
    // It's within working hours, continue to the next middleware/route
    next();
  } else {
    res.send('Sorry, the web application is only available during working hours (Monday to Friday, from 9 to 17).');
  }
};

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Middleware to serve static files from the 'public' directory
app.use(express.static('public'));

// Apply the 'checkWorkingHours' middleware to all routes
app.use(checkWorkingHours);

// Define the routes
app.get('/', (req, res) => {
  res.render('home');
});

app.get('/services', (req, res) => {
  res.render('services');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
