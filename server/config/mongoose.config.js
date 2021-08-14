const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/pets", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
})
    .then(() => console.log("Whoo let the DOGS out?!"))
    .catch(err => console.log("Something went wrong when connecting to the database", err));