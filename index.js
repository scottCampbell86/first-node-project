require('dotenv').config();
const { app } = require('./app.js');
const port = process.env.PORT || 3001;

app.listen(port, () => (`Example app listening on port, PORT!`));

//Client ID G6AUSRHt6VlIbvD58dOqXw