const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const problemRoutes = require('./routes/problemRoutes');
const solutionRoutes = require('./routes/solutionRoutes');
const { router: authRoutes } = require('./routes/authRoutes');

const app = express();
app.use(cors());
app.use(express.json());



const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

app.use('/api/auth', authRoutes);
app.use('/api/problems', problemRoutes);
app.use( solutionRoutes);

app.get('/', (req, res) => {
  res.send('Crowdsourced Problem-Solving Platform API');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
