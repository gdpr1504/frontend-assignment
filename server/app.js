// DO NOT MODIFY ANYTHING HERE, THE PLACE WHERE YOU NEED TO WRITE CODE IS MARKED CLEARLY BELOW

require('dotenv').config();
const express = require('express');
const bodyParser = require("body-parser");
const axios = require("axios");
const cors = require('cors');

const app = express();

app.use(function (req, res, next) {
    const allowedOrigins = ['http://localhost:3000'];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-credentials", true);
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, UPDATE");
    next();
});

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use(cors())

app.enable('trust proxy');

app.post('/api/fetchStockData',async (req, res) => {
    // YOUR CODE GOES HERE, PLEASE DO NOT EDIT ANYTHING OUTSIDE THIS FUNCTION
    try {
        
        const { stockSymbol, date } = req.body;
        // You need to replace 'YOUR_POLYGON_API_KEY' with your actual Polygon API key
        const apiKey = process.env.POLYGON_API_KEY;
        const apiUrl = `https://api.polygon.io/v2/aggs/ticker/${stockSymbol}/range/1/day/${date}/${date}?apiKey=${apiKey}`;
    
        const response = await axios.get(apiUrl);
        // Extract the required fields (Open, High, Low, Close, Volume) from the API response
        const { results } = response.data;
        const { o, h, l, c, v } = results[0];
    
        const stockData = {
          open: o,
          high: h,
          low: l,
          close: c,
          volume: v,
        };
    
        res.json(stockData);
      } catch (error) {
        res.status(500).json({ error: 'Error fetching stock data' });
      }
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));