import sql, { ConnectionPool } from 'mssql';
import config from '../config/dbconfig';

// const poolPromise: Promise<ConnectionPool> = sql.connect(config)
//     .then((pool: ConnectionPool) => {
//         console.log('Connected to MSSQL');
//         return pool;
//     })

const poolPromise: Promise<ConnectionPool> = sql.connect(config);

export { sql, poolPromise }