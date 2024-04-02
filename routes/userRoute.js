"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_js_1 = require("../middleware/authMiddleware.js");
const userController_js_1 = require("../controllers/userController.js");
const router = express_1.default.Router();
router.post('/auth', userController_js_1.authUser);
router.post('/', userController_js_1.registerUser);
router.post('/logout', userController_js_1.logoutUser);
router
    .route('/profile')
    .get(authMiddleware_js_1.protect, userController_js_1.getUserProfile)
    .patch(authMiddleware_js_1.protect, userController_js_1.updateUserProfile);
exports.default = router;
