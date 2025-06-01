const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const Donation = require('./models/Donation');

require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT;
const mong = process.env.MONGO_URI;
const incharges = ['Rachael', 'Mike', 'Nivaan', 'Aaryan', 'Nivie'];
// Connect to MongoDB Atlas
mongoose.connect(mong, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB Connected"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

// Routes
app.post('/donate', async (req, res) => {
  const { name, amount } = req.body;
  try {
    const count = await Donation.countDocuments();
    const distribution = incharges[count % incharges.length];
    const newdonation = new Donation({ name, amount, distribution });
    await newdonation.save();
    res.status(201).json({ message: 'Donation successful', newdonation });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save donation' });
  }
});

app.get('/total', async (req, res) => {
  try {
    const donations = await Donation.find();
    const total = donations.reduce((acc, curr) => acc + curr.amount, 0);
    res.json({ total });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch total donations' });
  }
});

app.get('/donations', async (req, res) => {
  try {
    const donations = await Donation.find().sort({ donatedAt: -1 }); // latest first
    res.json({ donations });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch donations' });
  }
});


app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
