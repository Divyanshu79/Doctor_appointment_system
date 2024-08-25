const express = require('express');
const colors = require('colors')
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors')






// dot env config 
dotenv.config();

// mongo DB connecion
connectDB();
//connectToMongoDB()


// rest object 
const app = express()

//middlewares
app.use(express.json());
app.use(morgan("dev"));
// cors conf
app.use(cors());


// Routes

app.use("/api/", require('./routes/userRoutes'));



// listen server 

const port = process.env.PORT || 8080

app.listen(port, () => {
    console.log(`server is running in ${process.env.NODE_MODE} mode on Port ${process.env.PORT}`.bgCyan.white)

})
