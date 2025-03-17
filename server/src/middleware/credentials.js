import allowedOrigins from '../config/security/allowedOrigins.js';

const credentials = (req, res, next) => {
    const origin = req.headers.origin;
    console.log(origin)
    if (allowedOrigins.includes(origin)) {
        // Set CORS headers for allowed origins
        res.header('Access-Control-Allow-Credentials', 'true');
        res.header('Access-Control-Allow-Origin', origin);
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    }``
    
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    
    next();
};

export default credentials;