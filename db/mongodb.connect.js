const mongoose = require('mongoose');

const initializeDbConnection = async () => {
    try {
        const connection = await mongoose.connect(
            process.env.LOCAL_DATABASE_URI,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            },
        );
        if (connection) {
            console.log('Connected to 🗃  mongodb successfully');
        }
    } catch (error) {
        console.log('Mongoose connection failed', error);
    }
};

module.exports = initializeDbConnection;
