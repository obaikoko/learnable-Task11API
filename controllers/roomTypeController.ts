import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { RoomType, RoomTypeDocument } from '../models/roomTypeModel';

// @desc Create a new room type
// @route POST api/roomtypes
// @access Private (example access level, please adjust accordingly)
const createRoomType = asyncHandler(async (req: Request, res: Response) => {
  const { name } = req.body;

  const roomExist = await RoomType.findOne({ name });

  if (roomExist) {
    res.status(400);
    throw new Error('Room already exists');
  }

  try {
    const roomType: RoomTypeDocument = await RoomType.create({ name });
    res.status(201).json(roomType);
  } catch (error) {
    res.status(500);
    throw new Error(`Error creating room type: ${(error as Error).message}`);
  }
});

// @desc Get all room types
// @route GET api/roomtypes
// @access Public (example access level, please adjust accordingly)
const getAllRoomTypes = asyncHandler(async (req: Request, res: Response) => {
  const roomTypes: RoomTypeDocument[] = await RoomType.find();

  res.status(200).json(roomTypes);
});

export { createRoomType, getAllRoomTypes };
