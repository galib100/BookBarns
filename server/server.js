const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const UserRoutes = require('./routes/users')
app.use(cors());
app.use(express.json());


app.use('/api',UserRoutes);
app.get('/', (req, res) => {
    res.send("hey boy glaib vai");
})
 
///

///


mongoose.connect("mongodb://localhost:27017/bookbarns")
const db = mongoose.connection
db.on('err', err => {
    console.log(err);
})
db.once('open', () => {
    console.log("database is connected successfully")
})


const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server is running on Port :: ${PORT}`)
});