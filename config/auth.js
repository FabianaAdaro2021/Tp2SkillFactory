module.exports ={
    secret: process.env.AUTH_SECRET || "usuario",
    expires: process.env.AUTH_EXPIRE || "48h",
    round: process.env.AUTH_ROUND || 10

}