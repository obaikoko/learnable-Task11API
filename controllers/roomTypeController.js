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
exports.getAllRoomTypes = exports.createRoomType = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const roomTypeModel_1 = require("../models/roomTypeModel");
// @desc Create a new room type
// @route POST api/roomtypes
// @access Private (example access level, please adjust accordingly)
const createRoomType = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    const roomExist = yield roomTypeModel_1.RoomType.findOne({ name });
    if (roomExist) {
        res.status(400);
        throw new Error('Room already exists');
    }
    try {
        const roomType = yield roomTypeModel_1.RoomType.create({ name });
        res.status(201).json(roomType);
    }
    catch (error) {
        res.status(500);
        throw new Error(`Error creating room type: ${error.message}`);
    }
}));
exports.createRoomType = createRoomType;
// @desc Get all room types
// @route GET api/roomtypes
// @access Public (example access level, please adjust accordingly)
const getAllRoomTypes = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const roomTypes = yield roomTypeModel_1.RoomType.find();
    res.status(200).json(roomTypes);
}));
exports.getAllRoomTypes = getAllRoomTypes;
