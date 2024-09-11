const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());


import {config} from 'dotenv'
import pg from 'pg'

config()


const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL
})

app.get('/', (req, res) => {
  res.send('Hola!')
})

app.get('/ping',async (req, res) => {
  const result = await pool.query('SELECT NOW()')
  return res.json(result.rows[0])
})

app.use(express.json());