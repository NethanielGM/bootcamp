export const verifyRole = (req, res, next) => {
    if (req.user.role !== 'admin') return res.status(403).json('Not Authorized')
    next();
}