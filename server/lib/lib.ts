import dotenv from 'dotenv';

dotenv.config();

export const corsOptions = {
    origin : process.env.CORS_ORIGIN,
    credentials : true, // credentials are cookies, authorization headers or TLS client certificates
    optionsSuccessStatus: 200
}

export const config = {
    port: process.env.PORT || 3000,
    uri: process.env.MONGODB_URI,
    key : process.env.JWT_SECRET,
    node_env : process.env.NODE_ENV
};