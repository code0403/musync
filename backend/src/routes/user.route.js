import express, { Router } from 'express';
import { getAllUsers, getAllMessages } from '../controller/user.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';

const router = Router();

router.get("/", protectRoute, getAllUsers);
router.get("/messages/:userId", protectRoute, getAllMessages);


export default router;