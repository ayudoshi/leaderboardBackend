const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL)
.then(() => { 
    console.log("connected to DB!")
    console.log("Listening on 3000")
})
.catch(err => { 
    console.error('App starting error:', err.stack);
    process.exit(1);
});

// Routes
app.use('/api', userRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
