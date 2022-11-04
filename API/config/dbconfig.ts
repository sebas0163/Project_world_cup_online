import dotenv from 'dotenv';
dotenv.config();

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: "localhost",
    database: process.env.DB_NAME,
    options: {
        encrypt: true, //for azure
        trustServerCertificate: true
    }

}

export default config;