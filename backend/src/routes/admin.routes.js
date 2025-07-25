import express, { Router } from 'express';
import { checkAdmin, createAlbum, createSong, deleteAlbum, deleteSong } from '../controller/admin.controller.js';
import { protectRoute, requireAdmin } from '../middleware/auth.middleware.js';

const router = Router();

// this will make that - it will used for all the endpoints in the file
router.use(protectRoute, requireAdmin)

router.get("check-admin", checkAdmin) //check is the user is admin or not

router.post("/songs", createSong)
router.delete("/songs/:id", deleteSong)

router.post("/albums", createAlbum);
router.delete("/albums/:id", deleteAlbum);


export default router;