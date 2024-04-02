"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_js_1 = require("../middleware/authMiddleware.js");
const roomController_js_1 = require("../controllers/roomController.js");
const router = express_1.default.Router();
router.route('/').post(authMiddleware_js_1.protect, authMiddleware_js_1.admin, roomController_js_1.createRoom).get(roomController_js_1.getRooms);
router
    .route('/:id')
    .patch(authMiddleware_js_1.protect, authMiddleware_js_1.admin, roomController_js_1.updateRoom)
    .get(roomController_js_1.getRoomById)
    .delete(authMiddleware_js_1.protect, authMiddleware_js_1.admin, roomController_js_1.deleteRoom);
exports.default = router;
