import express from 'express';
// import { isAuthenticated, isAdmin } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/dashboard', (req, res) => {
  res.status(200).json({ success: true, message: "Welcome to the admin dashboard" });
});

export default router;
