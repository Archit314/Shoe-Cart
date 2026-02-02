export const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT), // ensure this is a number
    database: process.env.DB_NAME,
    // ssl: {
    //     rejectUnauthorized: true,
    //     ca: fs.readFileSync("./ca.pem").toString(),
    // }
}