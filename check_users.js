const mongoose = require('mongoose');
const User = require('./models/User');
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
    .then(async () => {
        const count = await User.countDocuments();
        console.log(`Total users in database: ${count}`);
        const users = await User.find({}, 'username email');
        console.log('Users:', users);
        process.exit();
    })
    .catch(err => {
        console.error('Error connecting to MongoDB:', err);
        process.exit(1);
    });
