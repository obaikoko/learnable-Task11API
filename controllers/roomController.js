"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRoomById = exports.deleteRoom = exports.updateRoom = exports.getRooms = exports.createRoom = void 0;
const roomModel_1 = __importDefault(require("../models/roomModel"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const createRoom = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, roomType, price, } = req.body;
    try {
        const room = yield roomModel_1.default.create({ name, roomType, price });
        res.status(201).json(room);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}));
exports.createRoom = createRoom;
const getRooms = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let query = {};
        const queryParams = req.query;
        if (queryParams.search) {
            query = Object.assign(Object.assign({}, query), { name: { $regex: queryParams.search, $options: 'i' } });
        }
        if (queryParams.roomType) {
            query = Object.assign(Object.assign({}, query), { roomType: queryParams.roomType });
        }
        if (queryParams.minPrice && queryParams.maxPrice) {
            query = Object.assign(Object.assign({}, query), { price: {
                    $gte: parseInt(queryParams.minPrice),
                    $lte: parseInt(queryParams.maxPrice),
                } });
        }
        const rooms = yield roomModel_1.default.find(query);
        res.json(rooms);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}));
exports.getRooms = getRooms;
const updateRoom = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, roomType, price, } = req.body;
    try {
        const room = yield roomModel_1.default.findByIdAndUpdate(req.params.id, { name, roomType, price }, { new: true });
        res.json(room);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}));
exports.updateRoom = updateRoom;
const deleteRoom = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield roomModel_1.default.findByIdAndDelete(req.params.id);
        res.status(204).json('room deleted');
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}));
exports.deleteRoom = deleteRoom;
const getRoomById = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const room = yield roomModel_1.default.findById(req.params.id);
        if (!room) {
            res.status(404);
            throw new Error('Room Not Found!!!');
        }
        res.status(200).json(room);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}));
exports.getRoomById = getRoomById;
