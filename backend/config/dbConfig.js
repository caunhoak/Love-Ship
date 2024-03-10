// Cấu hình kết nối đến cơ sở dữ liệu MongoDB
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://miracle:3HuVOyNlh6fcPokQ@loveship.xdv8apo.mongodb.net/?retryWrites=true&w=majority&appName=LoveShip', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

module.exports = mongoose.connection;