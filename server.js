const express = require('express');

const app = express();
const PORT = 3000;

// Middleware: parse JSON request bodies
app.use(express.json());

// Middleware: log every request
app.use((req, res, next) => {
  console.log(`Request received: ${req.method} ${req.url}`);
  next();
});

// Sample data
const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' }
];

const courses = [
  { id: 1, title: 'Backend Development' },
  { id: 2, title: 'Frontend Development' }
];

// Basic routes
app.get('/', (req, res) => {
  res.send('Welcome to my Express server!');
});

app.get('/about', (req, res) => {
  res.send('About page: this server is built with Node.js and Express.');
});

app.get('/contact', (req, res) => {
  res.send('Contact us at contact@example.com');
});

// Users routes
app.get('/users', (req, res) => {
  res.json(users);
});

app.get('/users/:id', (req, res) => {
  const id = req.params.id;
  res.json({ message: `You requested user with ID ${id}`, id });
});

app.post('/users', (req, res) => {
  const user = req.body;
  res.status(201).json({ message: 'User received successfully', user });
});

// Search route (query parameters)
app.get('/search', (req, res) => {
  const name = req.query.name;
  if (!name) {
    return res.status(400).send('Please provide a name, e.g. /search?name=alice');
  }
  res.send(`You searched for: ${name}`);
});

// Challenge: Courses API
app.get('/courses', (req, res) => {
  res.json(courses);
});

app.get('/courses/:id', (req, res) => {
  const course = courses.find(c => c.id === Number(req.params.id));
  if (!course) {
    return res.status(404).json({ message: 'Course not found' });
  }
  res.json(course);
});

app.post('/courses', (req, res) => {
  const { title } = req.body || {};
  if (!title) {
    return res.status(400).json({ message: 'Course title is required' });
  }
  const newCourse = { id: courses.length + 1, title };
  courses.push(newCourse);
  res.status(201).json({ message: 'Course added', course: newCourse });
});

// 404 for anything else
app.use((req, res) => {
  res.status(404).send('Page not found');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
