import { Request, Response } from 'express';
import Room from '../models/roomModel';
import asyncHandler from 'express-async-handler';

interface QueryParams {
  search?: string;
  roomType?: string;
  minPrice?: string;
  maxPrice?: string;
}

const createRoom = asyncHandler(async (req: Request, res: Response) => {
  const {
    name,
    roomType,
    price,
  }: { name: string; roomType: string; price: number } = req.body;

  try {
    const room = await Room.create({ name, roomType, price });
    res.status(201).json(room);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

const getRooms = asyncHandler(async (req: Request, res: Response) => {
  try {
    let query: {} = {};

    const queryParams: QueryParams = req.query;

    if (queryParams.search) {
      query = { ...query, name: { $regex: queryParams.search, $options: 'i' } };
    }

    if (queryParams.roomType) {
      query = { ...query, roomType: queryParams.roomType };
    }

    if (queryParams.minPrice && queryParams.maxPrice) {
      query = {
        ...query,
        price: {
          $gte: parseInt(queryParams.minPrice),
          $lte: parseInt(queryParams.maxPrice),
        },
      };
    }

    const rooms = await Room.find(query);
    res.json(rooms);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

const updateRoom = asyncHandler(async (req: Request, res: Response) => {
  const {
    name,
    roomType,
    price,
  }: { name: string; roomType: string; price: number } = req.body;
  try {
    const room = await Room.findByIdAndUpdate(
      req.params.id,
      { name, roomType, price },
      { new: true }
    );

    res.json(room);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

const deleteRoom = asyncHandler(async (req: Request, res: Response) => {
  try {
    await Room.findByIdAndDelete(req.params.id);
    res.status(204).json('room deleted');
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

const getRoomById = asyncHandler(async (req: Request, res: Response) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) {
      res.status(404);
      throw new Error('Room Not Found!!!');
    }
    res.status(200).json(room);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

export { createRoom, getRooms, updateRoom, deleteRoom, getRoomById };
