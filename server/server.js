const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 5001;
const routes = require('./routes/index.js');
require('dotenv').config();

app.use(cors()); // Enable CORS for all routes
app.use(express.json());
app.use(routes);

app.listen(port,()=>{
   console.log(`Server is running on port ${port}`);
});