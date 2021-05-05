const mongoose = require('mongoose');

const initializeDbConnection = async () => {
    await mongoose.connect(process.env.LOCAL_DATABASE_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Connected to 🗃  mongodb successfully");
};

module.exports = initializeDbConnection;
