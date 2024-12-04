const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

let posts = []; // To store blog posts in memory

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // Serve static files (CSS)

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Routes

// Home page - Show all posts
app.get('/', (req, res) => {
  res.render('index', { posts: posts });
});

// Create a new post
app.get('/new', (req, res) => {
  res.render('post', { post: null });
});

app.post('/new', (req, res) => {
  const newPost = { title: req.body.title, content: req.body.content };
  posts.push(newPost); // Save the new post in memory
  res.redirect('/');
});

// Edit a post
app.get('/edit/:index', (req, res) => {
  const index = req.params.index;
  const post = posts[index];
  res.render('post', { post: post, index: index });
});

app.post('/edit/:index', (req, res) => {
  const index = req.params.index;
  posts[index] = { title: req.body.title, content: req.body.content }; // Update post
  res.redirect('/');
});

// Delete a post
app.get('/delete/:index', (req, res) => {
  const index = req.params.index;
  posts.splice(index, 1); // Delete the post
  res.redirect('/');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
