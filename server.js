const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const session = require('express-session');
const cookieParser = require('cookie-parser');
dotenv.config();
const app = express();

app.use((req, res, next) => {
    console.log(`[DEBUG] ${req.method} ${req.url}`);
    next();
});


app.use(express.json());
app.use(cookieParser());
app.use(session({
    secret: 'fallback_secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        maxAge: 24 * 60 * 60 * 1000
    }
}));

app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);

        if (origin.startsWith('http://localhost')) {
            return callback(null, true);
        }

        return callback(new Error('Not allowed by CORS'));
    },
    credentials: true
}));




app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;


mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => console.log(`Server running on port ${PORT} - VERSION FIXED`));
    })
    .catch(err => console.error('MongoDB connection error:', err));
