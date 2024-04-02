import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import User, { UserDocument } from '../models/userModel';

interface DecodedToken {
  userId: string;
}


declare global {
  namespace Express {
    interface Request {
      user?: UserDocument;
    }
  }
}

const protect = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    let token: string | undefined;

    token = req.cookies.jwt;

    if (token) {
      try {
       const decoded = jwt.verify(
         token,
         process.env.JWT_SECRET!
       ) as DecodedToken;
const user: UserDocument | null = await User.findById(decoded.userId)
  .select('-password')
  .lean<UserDocument>()
  .exec();

if (user) {
  req.user = user;
  next();
} else {
  res.status(401);
  throw new Error('Not Authorized! User not found');
}

      } catch (error) {
        res.status(401);
        throw new Error('Not Authorized! Invalid Token');
      }
    } else {
      res.status(401);
      throw new Error('Not Authorized! No Token');
    }
  }
);

const admin = (req: Request, res: Response, next: NextFunction): void => {
  const user = req.user;
  if (user && user.role === 'admin') {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized!!! Contact the admin');
  }
};

export { protect, admin };
