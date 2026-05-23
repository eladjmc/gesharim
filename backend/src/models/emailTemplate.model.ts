import mongoose, { Schema, Document } from 'mongoose';
import { EmailTemplateKey } from '../types/enums';

export interface IEmailTemplate extends Document {
  key: EmailTemplateKey;
  name: string;
  subject: string;
  body: string;
  availablePlaceholders: string[];
  createdAt: Date;
  updatedAt: Date;
}

const emailTemplateSchema = new Schema<IEmailTemplate>(
  {
    key: {
      type: String,
      enum: Object.values(EmailTemplateKey),
      required: true,
      unique: true,
    },
    name: { type: String, required: true },
    subject: { type: String, required: true },
    body: { type: String, required: true },
    availablePlaceholders: [{ type: String }],
  },
  { timestamps: true }
);

export const EmailTemplate = mongoose.model<IEmailTemplate>(
  'EmailTemplate',
  emailTemplateSchema
);
