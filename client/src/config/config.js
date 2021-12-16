const dotenv = require('dotenv');

dotenv.config();

const config = {
    development: {
        SERVER_URI: process.env.REACT_APP_DEV_SERVER_URI,
    },
    production: {
        SERVER_URI: process.env.REACT_APP_PROD_SERVER_URI,
    },
};

module.exports = config[process.env.REACT_APP_REACT_ENV];