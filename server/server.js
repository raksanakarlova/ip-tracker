/**
 * server.js
 * Мини-прокси для IP Tracker
 */

import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config()

const app = express();
const PORT = process.env.PORT || 3000;
const GEO_IP_KEY = process.env.GEO_IP_KEY;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/api/ip', async (req, res) => {
  console.log('req.query:', req.query)
  const ip = req.query.ip;

  if(!ip) {
    return res.status(400).json({ error: 'IP is required in query string' } )
  }

  try {
    const response = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=${GEO_IP_KEY}&ipAddress=${ip}`);
    const data = await response.json();
    console.log('GEO API data:', data);
    res.json(data);
  } catch (err) {
    console.error('Ошибка запроса к geo.ipify:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server запущен на http://localhost:${PORT}`);
});