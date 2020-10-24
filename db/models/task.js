import { Schema, model } from 'mongoose';
import mongooseDelete from 'mongoose-delete';

const TaskSchema = new Schema(
  {
    name: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

TaskSchema.plugin(mongooseDelete);

export default model('Task', TaskSchema);
