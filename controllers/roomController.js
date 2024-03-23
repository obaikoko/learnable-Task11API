import Room from '../models/roomModel.js';
import asyncHandler from 'express-async-handler';


const createRoom = asyncHandler(async (req, res) => {
  const { name, roomType, price } = req.body;

  try {
    const room = await Room.create({ name, roomType, price });
    res.status(201);
    res.json(room);
  } catch (error) {
    res.status(400);
    throw new Error(`message: ${error.message}`);
  }
});

const getRooms = asyncHandler(async (req, res) => {
  try {
    let query = {};

    if (req.query.search) {
      query.name = { $regex: req.query.search, $options: 'i' };
    }

    if (req.query.roomType) {
      query.roomType = req.query.roomType;
    }

    if (req.query.minPrice || req.query.maxPrice) {
      query.price = {};

      if (req.query.minPrice) {
        query.price.$gte = parseInt(req.query.minPrice);
      }

      if (req.query.maxPrice) {
        query.price.$lte = parseInt(req.query.maxPrice);
      }
    }

    const rooms = await Room.find(query);
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const updateRoom = asyncHandler(async (req, res) => {
  const { name, roomType, price } = req.body;
  try {
    const room = await Room.findByIdAndUpdate(
      req.params.id,
      { name, roomType, price },
      { new: true }
    );

    res.json(room);
  } catch (error) {
    res.status(400);
    throw new Error(`message: ${error.message}`);
  }
});

const deleteRoom = asyncHandler(async (req, res) => {
  try {
    const room = await Room.findByIdAndDelete(req.params.id);
    res.status(204);
    res.json('room deleted');
  } catch (error) {
    res.status(400);
    throw new Error(`message: ${error.message}`);
  }
});

const getRoomById = asyncHandler(async (req, res) => {
  const room = await Room.findById(req.params.id);
  if (!room) {
    res.status(404);
    throw new Error('Room Not Found!!!');
  }
  res.status(200);
  res.json(room);
});
export { createRoom, getRooms, updateRoom, deleteRoom, getRoomById };
