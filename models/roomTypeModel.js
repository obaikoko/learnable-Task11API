import mongoose from 'mongoose';

const roomTypeSchema = new mongoose.Schema(
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

const RoomType = mongoose.model('RoomType', roomTypeSchema);

export default RoomType;
