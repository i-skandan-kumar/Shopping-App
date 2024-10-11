const express = require('express');
const pool = require('./db')
const app = express();
const port = 2000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to the API!');
  });

// get all products
app.get('/products', async(req,res) =>{
    try{
        const result = await pool.query('SELECT * FROM products');
        res.json(result.rows);
    }catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// add a new product
app.post('/products', async(req, res) =>{
    try{
        const {name, price, description } = req.body;
        const newProduct = await pool.query(
            'INSERT INTO products(name, price, description) VALUES ($1, $2, $3) RETURNING *', [name, price, description]
        );
        res.json(newProduct.rows[0]);
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Send');
    }

});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });