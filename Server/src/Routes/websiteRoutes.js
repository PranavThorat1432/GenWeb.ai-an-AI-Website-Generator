import express from 'express';
import isAuth from '../Middleware/isAuth.js';
import { changes, deploy, generateWebsite, getAllWebsites, getBySlug, getWebsiteById } from '../Controllers/websiteController.js';
import { rateLimit } from 'express-rate-limit';

const websiteRouter = express.Router();

// Strict AI Rate Limiter (max 10 generation/update calls per 15 minutes per IP)
const aiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: { message: 'Generation rate limit exceeded. Please try again after 15 minutes.' },
    standardHeaders: true,
    legacyHeaders: false,
});

websiteRouter.post('/generate', isAuth, aiLimiter, generateWebsite);
websiteRouter.get('/get/:id', isAuth, getWebsiteById);
websiteRouter.post('/update/:id', isAuth, aiLimiter, changes);
websiteRouter.get('/get-all', isAuth, getAllWebsites);
websiteRouter.get('/deploy/:id', isAuth, deploy);
websiteRouter.get('/get-slug/:slug', isAuth, getBySlug);

export default websiteRouter;
