import mongoose, { Document, Model, Schema } from 'mongoose';


export interface RoomTypeDocument extends Document {
  name: string;
  createdAt: Date;
  updatedAt: Date;
}


const roomTypeSchema: Schema<RoomTypeDocument> = new Schema<RoomTypeDocument>(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);


const RoomType: Model<RoomTypeDocument> = mongoose.model<RoomTypeDocument>(
  'RoomType',
  roomTypeSchema
);


export { RoomType };
