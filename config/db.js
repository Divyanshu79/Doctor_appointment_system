// require('dotenv').config();
// const mongoose = require('mongoose')

// const colors = require('colors')

// const connectDB = async () => {
//     try {
//         await mongoose.connect(process.env.MONGO_URL);


//         console.log(`mongoDB connected ${mongoose.connection.host}.bgGreen.white`);

//     }
//     catch (error) {
//         console.log(`MongoDB server Issue ${error}`.bgRed.white);
//     }
// };
// module.exports = connectDB;





require('dotenv').config();
const mongoose = require('mongoose');

async function connectDB() {
    const username = process.env.DB_USERNAME;
    const password = process.env.DB_PASSWORD;
    const cluster = process.env.DB_CLUSTER;
    const database = process.env.DB_NAME;

    const connectionString = `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${database}?retryWrites=true&w=majority`;

    try {
        await mongoose.connect(connectionString);
        console.log(`mongoDB connected ${mongoose.connection.host}.bgGreen.white`);
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('MongoDB connection error:', err);
    }
}

module.exports = connectDB;
