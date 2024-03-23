import asyncHandler from 'express-async-handler';
import RoomType from '../models/roomTypeModel.js';

const createRoomType = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const roomExist = await RoomType.findOne({ name });
  // checkes if room already exist
  if (roomExist) {
    res.status(400);
    throw new Error('Room already Exist');
  }
  // create new roomType
  try {
    const roomType = await RoomType.create({ name });
    res.status(201);
    res.json(roomType);
  } catch (error) {
    res.status(500);
    throw new Error(`message: ${error.message}`);
  }
});

const getAllRoomTypes = asyncHandler(async (req, res) => {
  const roomTypes = await RoomType.find();

  if (roomTypes) {
    res.status(200);
    res.json(roomTypes);
  } else {
    res.status(500);
    throw new Error('Something went wrong');
  }
});

export { createRoomType, getAllRoomTypes };
