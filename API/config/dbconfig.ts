import * as dotenv from 'dotenv';
dotenv.config({ path: __dirname + '/.env' });

// const config = {
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     server: process.env.DB_SERVER,
//     database: process.env.DB_NAME
//     // options: {
//     //     // encrypt: true, //for azure
//     //     // trustServerCertificate: true
//     //     trustedConnection: true
//     // }
//     // port: parseInt(process.env.DB_PORT)

// }
const config = "mssql://worldcup:xfifapassword@localhost/Project_World_Cup_Online";

// class config {
//     public user: string | undefined;
//     public password: string | undefined;
//     public server: string;
//     public database:string | undefined;

//     constructor() {
//         this.user = process.env.DB_USER;
//         this.password = process.env.DB_PASSWORD;
//         this.server = process.env.DB_SERVER;
//         this.database = process.env.DB_NAME;
//     }

// port: parseInt(process.env.DB_PORT)
//} 

export default config;