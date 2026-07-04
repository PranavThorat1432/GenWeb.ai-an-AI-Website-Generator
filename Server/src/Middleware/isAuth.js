import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
import User from '../Models/userModel.js';

const isAuth = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if(!token) {
            return res.status(401).json({
                message: 'Token not Found!'
            });
        }

        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded?.id);
        next();

    } catch (error) {
        res.status(500).json({
            message: `Authentication Error: ${error.message}`
        });
    }
};

export default isAuth;