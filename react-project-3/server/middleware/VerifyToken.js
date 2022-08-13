import 'dotenv/config'
import jwt from 'jsonwebtoken'

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.status(401).json('No valid authorization header')
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) return res.status(403).json('Token is not valid')
        if (req.params.id === decoded.id || req.body.userId === decoded.id) {
            req.user = decoded.user;
            next()
        }

    })
}