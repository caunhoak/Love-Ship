// // Cấu hình kết nối đến cơ sở dữ liệu MongoDB
// const mongoose = require('mongoose');

// mongoose.connect('mongodb+srv://miracle:3HuVOyNlh6fcPokQ@loveship.xdv8apo.mongodb.net/?retryWrites=true&w=majority&appName=LoveShip', 
// { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log('MongoDB connected'))
//     .catch(err => console.error('MongoDB connection error:', err));

// module.exports = mongoose.connection;

// dbConfig.js
const mongoose = require('mongoose');

// Hàm tạo tên cơ sở dữ liệu
function generateDatabaseName() {
    // Tên cơ sở dữ liệu bạn muốn sử dụng
    return 'LoveShip';
}

// Kết nối đến MongoDB và tạo cơ sở dữ liệu "LoveShip" nếu chưa tồn tại
mongoose.connect('mongodb+srv://miracle:3HuVOyNlh6fcPokQ@loveship.xdv8apo.mongodb.net/?retryWrites=true&w=majority&appName=LoveShip', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: generateDatabaseName() // Sử dụng hàm để tạo tên cơ sở dữ liệu
})
.then(() => console.log('MongoDB connected to database:', generateDatabaseName()))
.catch(err => console.error('MongoDB connection error:', err));

module.exports = mongoose.connection;