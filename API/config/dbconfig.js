const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_NAME,
    options: {
        trustedConnection: true,
        enableArithAbort: true,
        instanceName: process.env.DB_INSTANCE
    },
    port: parseInt(process.env.DB_PORT)

}

module.exports = config;