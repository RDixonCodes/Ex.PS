const express = require('express');
const cors = require('cors')
const app = express();
require('./config/mongoose.config');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require('./routes/pet.routes')(app); 
const port = 8000;
    
app.listen(port, () => console.log(`Got my ear on port: ${port}`) );