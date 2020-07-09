module.exports = {
    db_name: process.env.DB_NAME || 'temp',
    db_host: process.env.DB_HOST || 'localhost',
    db_port: process.env.DB_PORT || 5432,
    db_user: process.env.DB_USER || "admin",
    db_pwd: process.env.DB_PASSWORD || "admin"
}