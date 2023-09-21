// config/database.js

module.exports = {
    mongoURI: process.env.MONGO_URI,
    options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    }
};
