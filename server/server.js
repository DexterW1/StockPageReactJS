const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

app.listen(port,()=>{
   console.log(`Server is running on port ${port}`);
});