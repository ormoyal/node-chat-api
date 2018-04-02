const path = require('path');
const publicPath = path.join(__dirname + '/../public');

const express = require('express');
const app = express();

process.env.PORT = process.env.PORT || 3000;

app.use(express.static(publicPath));



app.listen(process.env.PORT, () => {
    console.log('run on port',process.env.PORT);
})


