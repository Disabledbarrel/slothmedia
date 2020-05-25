const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    // Hämta token från header
    const token = req.header('x-auth-token');

    // Kontrollera om token finns
    if(!token){
        return res.status(401).json({
            msg: 'Authorization denied'
        });
    }

    // Validera token
    try {
        const decoded = jwt.verify(token, process.env.SLOTH_TOKEN);
        req.user = decoded.user;
        next();
    } catch(err) {
        res.status(401).json({ msg: 'Token not valid'});
    }
}