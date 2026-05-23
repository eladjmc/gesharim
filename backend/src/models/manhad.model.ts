import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IManhad extends Document {
  name: string;
  email: string;
  phone: string;
  municipalities: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const manhadSchema = new Schema<IManhad>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    municipalities: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Municipality',
      },
    ],
  },
  { timestamps: true }
);

export const Manhad = mongoose.model<IManhad>('Manhad', manhadSchema);
