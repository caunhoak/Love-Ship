// dbConfig.js

const mongoose = require("mongoose");

function generateDatabaseName() {
  return "LoveShip";
}

mongoose
  .connect(
    "mongodb+srv://miracle:3HuVOyNlh6fcPokQ@loveship.xdv8apo.mongodb.net/?retryWrites=true&w=majority&appName=LoveShip",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: generateDatabaseName(),
    }
  )
  .then(() =>
    console.log("MongoDB connected to database:", generateDatabaseName())
  )
  .catch((err) => console.error("MongoDB connection error:", err));

module.exports = mongoose.connection;
