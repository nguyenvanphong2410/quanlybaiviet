require('dotenv').config();

const mongoose = require('mongoose');
const {logger} = require("../logger");
async function connect() {
    try {
        await mongoose.connect(
            'mongodb://127.0.0.1/post_management',
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                // useCreateIndex: true
            }
        );
        console.log('Database - Connect successfully to!!!');
    } catch (error) {
        console.log('Database - Connect failure!!!');
        // logger.error(error)
    }
}

module.exports = {connect};
