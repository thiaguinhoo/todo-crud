'use strict';
require('dotenv/config');
const application = require('./application')
const database = require('./database');

const serverPort = process.env.SERVER_PORT || 3333;

process.on('uncaughtException', () => {
    database.close()
    process.exit(1);
});

application.listen(
    serverPort,
    () => console.log(`Server running on *:${serverPort}`)
);
