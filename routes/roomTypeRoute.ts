import express from 'express';
import { protect, admin } from '../middleware/authMiddleware.js';
import {
  createRoomType,
  getAllRoomTypes,
} from '../controllers/roomTypeController.js';

const router = express.Router();
router.route('/').post(createRoomType).get(getAllRoomTypes);

export default router;
