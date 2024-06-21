// 06.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Item = require('./models/Item');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/express-mongoose-crud')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes

// Create an item
app.post('/items', async (req, res) => {
  try {
    const item = new Item(req.body);
    await item.save();
    res.status(201).send(item);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Read all items
app.get('/items', async (req, res) => {
  try {
    const items = await Item.find();
    res.send(items);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Read a single item by id
app.get('/items/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).send();
    }
    res.send(item);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update an item by id
app.put('/items/:id', async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!item) {
      return res.status(404).send();
    }
    res.send(item);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete an item by id
app.delete('/items/:id', async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).send();
    }
    res.send(item);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
