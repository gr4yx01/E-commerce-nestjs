export default () => ({
    jwt: {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.EXPIRY_TIME
    }
})