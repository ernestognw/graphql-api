import { Schema, model } from 'mongoose';
import mongooseDelete from 'mongoose-delete';

const UserSchema = new Schema(
  {
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    profileImg: { type: String },
  },
  {
    timestamps: true,
  }
);

UserSchema.plugin(mongooseDelete);

export default model('User', UserSchema);
