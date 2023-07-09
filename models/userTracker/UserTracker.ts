import mongoose, { Document, Model, Schema } from "mongoose";

export interface UserTrackerI extends Document {
  email: string;
  works: {
    id: number;
    rate: number;
    money: number;
    time: number;
    date: string;
  }[];
  user?: any;
}

const UserTrackerSchema: Schema<UserTrackerI> = new Schema<UserTrackerI>({
  email: {
    type: String,
    required: true,
  },
  works: [
    {
      id: {
        type: Number,
      },
      rate: {
        type: Number,
      },
      money: {
        type: Number,
      },
      time: {
        type: Number,
      },
      date: String,
    },
  ],
});

const UserTrackerModel: Model<UserTrackerI> =
  mongoose.models.UserTracker ||
  mongoose.model<UserTrackerI>("UserTracker", UserTrackerSchema);

export default UserTrackerModel;
