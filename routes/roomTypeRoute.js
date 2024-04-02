"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const roomTypeController_js_1 = require("../controllers/roomTypeController.js");
const router = express_1.default.Router();
router.route('/').post(roomTypeController_js_1.createRoomType).get(roomTypeController_js_1.getAllRoomTypes);
exports.default = router;
