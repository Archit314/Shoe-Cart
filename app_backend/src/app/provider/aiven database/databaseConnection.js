import pg from 'pg';
import fs from 'fs';
import { dbConfig } from '../../config/aiven/db.js';

export const connectDb = async () => {
    
    const config = {
        ...dbConfig,
        ssl: {
            rejectUnauthorized: true,
            ca: fs.readFileSync("./ca.pem").toString(),
        },
    };
    try {
        const client = new pg.Client(config);

        client.connect(function (err) {
            if (err) throw err;

            client.query("SELECT VERSION()", [], function (err, result) {
                if (err) throw err;

                console.log(result.rows[0]);
                client.end(function (err) {
                    if (err) throw err;
                });
            });
        });
    } catch (error) {
        console.log("Error connecting to AIVEN Database: ", error)
    }
}