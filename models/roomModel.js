"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const roomSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    roomType: {
        type: mongoose_1.default.Schema.ObjectId,
        ref: 'RoomType',
    },
    price: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true,
});
const Room = mongoose_1.default.model('Room', roomSchema);
exports.default = Room;
