import express from 'express';
import { protect, admin } from '../middleware/authMiddleware.js';
import {
  createRoom,
  getRooms,
  updateRoom,
  deleteRoom,
  getRoomById,
} from '../controllers/roomController.js';

const router = express.Router();

router.route('/').post(protect, admin, createRoom).get(getRooms);
router
  .route('/:id')
  .patch(protect, admin, updateRoom)
  .get(getRoomById)
  .delete(protect, admin, deleteRoom);

export default router;
