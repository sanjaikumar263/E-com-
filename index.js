import express from 'express';
import mongoose from 'mongoose';
import ProductRoute from './router/ProductRoute.js';
import cors from 'cors';
const app = express();

const MONGO_URI = 'mongodb+srv://sanjaimsk263:GJNZ37GmGGntD934@cluster0.7oi83sg.mongodb.net/mydatabase';

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.error('Error connecting to MongoDB:', err);
    });
app.use(express.json());

app.use(cors({
    origin: '*', // Allow all origins
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
}));
app.use('/api', ProductRoute);
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    try {
        console.log(`Server is running on port ${PORT}`);
    } catch (error) {
        console.error('Error starting the server:', error);
    }
});