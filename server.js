const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5500;

// Use cors middleware
app.use(cors({ origin: 'http://localhost:5500' }));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/visitorCounter', { useNewUrlParser: true, useUnifiedTopology: true });

// Define a schema and model for the visitor count
const visitorSchema = new mongoose.Schema({
    count: { type: Number, default: 0 }
});

const Visitor = mongoose.model('Visitor', visitorSchema);

// Serve the static files
app.use(express.static(path.join(__dirname, 'public')));

// API endpoint to get and increment the visitor count
app.get('/api/visitorCount', async (req, res) => {
    let visitor = await Visitor.findOne();
    
    if (!visitor) {
        visitor = new Visitor();
    }

    visitor.count += 1;
    await visitor.save();

    res.json({ count: visitor.count });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
