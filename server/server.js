import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
// import corsOptions from "./src/config/security/corsOptions.js";
import credentials from "./src/middleware/credentials.js";

import homeRouter from "./src/routes/home.js";
import loginRoute from "./src/routes/login.js";
import logoutRouter from "./src/routes/logout.js";
import registerRoute from "./src/routes/register.js";
import refreshTokenRouter from "./src/routes/refreshToken.js";
import accountRoute from "./src/routes/account.js";

import dotenv from "dotenv";
dotenv.config();

// Import the database initialization (db.js) to set up the SQLite database.
import './db.js';

const app = express();
const PORT = process.env.PORT || 3001;

const corsOptions = {
    origin: 'https://cozy-cove-git-yvpages-austins-projects-977ccb2e.vercel.app',  // Vercel frontend
    credentials: true,  // Required for cookies to work
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
};

app.use(cors(corsOptions)); 

app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ limit: "10mb", extended: false }));

// Public routes
app.use('/api/home', homeRouter);
app.use('/api/login', loginRoute);
app.use('/api/register', registerRoute);
app.use('/api/refreshToken', refreshTokenRouter);

// Protected routes (if needed, enable JWT verification)
// app.use(verifyJWT);
app.use('/api/logout', logoutRouter);
app.use('/api/account', accountRoute);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default app;
