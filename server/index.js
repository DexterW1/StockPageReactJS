const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 5003;
const routes = require('./routes/index.js');
require('dotenv').config();

app.use(cors()); // Enable CORS for all routes
app.use((req, res, next) => {
   res.setHeader('Access-Control-Allow-Origin', 'https://stock-page-client.vercel.app');
   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
   res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
   next();
 });
app.use(express.json());
app.use(routes);
app.listen(port,()=>{
   console.log(`Server is running on port ${port}`);
});