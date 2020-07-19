const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

// Create Express Server 
const app = express();

// Connect to db
connectDB();

// Activate cors
app.use(cors());

// Activate express.json
app.use( express.json({ extended: true }));

// App port
const port = process.env.PORT || 4000;

// Start app
app.listen(port, '0.0.0.0', () => {
    console.log(`Server working at port ${port}`);
});