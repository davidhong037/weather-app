const express = require('express');
const cors = require('cors');

const app = express();

require('dotenv').config();


app.use(express.json);
app.use(cors);


app.listen(4545, () => console.log('Entering Flashpoint 4545'));