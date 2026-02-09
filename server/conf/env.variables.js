import { configDotenv } from "dotenv";
configDotenv();
const p = process.env;
const ENVs = {
    app_name: p.APP_NAME,
    app_env: p.APP_ENV,
    app_port: p.APP_PORT,
    db_host: p.DB_HOST,
    db_port: p.DB_PORT,
    db_name: p.DB_NAME,
    jwt_secret: p.JWT_SECRET,
    jwt_expires: p.JWT_EXPIRES_IN,
    admin_username: p.ADMIN_USERNAME,
    admin_password: p.ADMIN_PASSWORD
};


export default ENVs;