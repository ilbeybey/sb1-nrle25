const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost/country_info_db', { useNewUrlParser: true, useUnifiedTopology: true });

// Ülke modeli
const Country = mongoose.model('Country', {
  id: String,
  name: String,
  image: String,
  description: String
});

// Kullanıcı modeli
const User = mongoose.model('User', {
  username: String,
  password: String
});

// Kimlik doğrulama middleware'i
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Giriş endpoint'i
app.post('/api/login', async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (user && await bcrypt.compare(req.body.password, user.password)) {
    const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET);
    res.json({ token });
  } else {
    res.status(400).send('Invalid credentials');
  }
});

// Ülke CRUD işlemleri
app.get('/api/countries', async (req, res) => {
  const countries = await Country.find();
  res.json(countries);
});

app.get('/api/countries/:id', async (req, res) => {
  const country = await Country.findOne({ id: req.params.id });
  res.json(country);
});

app.post('/api/countries', authenticateToken, async (req, res) => {
  const country = new Country(req.body);
  await country.save();
  res.json(country);
});

app.put('/api/countries/:id', authenticateToken, async (req, res) => {
  const country = await Country.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
  res.json(country);
});

app.delete('/api/countries/:id', authenticateToken, async (req, res) => {
  await Country.findOneAndDelete({ id: req.params.id });
  res.sendStatus(204);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));