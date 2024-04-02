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
exports.admin = exports.protect = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const userModel_1 = __importDefault(require("../models/userModel"));
const protect = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let token;
    token = req.cookies.jwt;
    if (token) {
        try {
            const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            const user = yield userModel_1.default.findById(decoded.userId)
                .select('-password')
                .lean()
                .exec();
            if (user) {
                req.user = user;
                next();
            }
            else {
                res.status(401);
                throw new Error('Not Authorized! User not found');
            }
        }
        catch (error) {
            res.status(401);
            throw new Error('Not Authorized! Invalid Token');
        }
    }
    else {
        res.status(401);
        throw new Error('Not Authorized! No Token');
    }
}));
exports.protect = protect;
const admin = (req, res, next) => {
    const user = req.user;
    if (user && user.role === 'admin') {
        next();
    }
    else {
        res.status(401);
        throw new Error('Not authorized!!! Contact the admin');
    }
};
exports.admin = admin;
