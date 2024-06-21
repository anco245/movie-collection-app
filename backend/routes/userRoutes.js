import express from 'express';
import { get1080UsbMovies } from '../controllers/userController.js';

const router = express.Router();

router.get('/1080usbMovies', get1080UsbMovies);

export default router;