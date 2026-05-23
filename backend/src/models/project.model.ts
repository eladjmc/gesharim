import mongoose, { Schema, Document, Types } from 'mongoose';
import { ProjectStatus, NeedType } from '../types/enums';

export interface IStatusHistoryEntry {
  status: ProjectStatus;
  changedAt: Date;
  changedBy: Types.ObjectId;
}

export interface IAdminNote {
  text: string;
  createdAt: Date;
  createdBy: Types.ObjectId;
}

export interface IProject extends Document {
  fullName: string;
  phone: string;
  email: string;
  businessName: string;
  municipality: Types.ObjectId;
  needType: NeedType;
  description: string;
  status: ProjectStatus;
  assignedManhad: Types.ObjectId | null;
  rejectionReason: string | null;
  statusHistory: IStatusHistoryEntry[];
  adminNotes: IAdminNote[];
  createdAt: Date;
  updatedAt: Date;
}

const statusHistorySchema = new Schema<IStatusHistoryEntry>(
  {
    status: { type: String, enum: Object.values(ProjectStatus), required: true },
    changedAt: { type: Date, default: Date.now },
    changedBy: { type: Schema.Types.Mixed, required: true },
  },
  { _id: false }
);

const adminNoteSchema = new Schema<IAdminNote>(
  {
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { _id: true }
);

const projectSchema = new Schema<IProject>(
  {
    fullName: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    businessName: { type: String, required: true, trim: true },
    municipality: {
      type: Schema.Types.ObjectId,
      ref: 'Municipality',
      required: true,
    },
    needType: {
      type: String,
      enum: Object.values(NeedType),
      required: true,
    },
    description: { type: String, required: true, trim: true, maxlength: 500 },
    status: {
      type: String,
      enum: Object.values(ProjectStatus),
      default: ProjectStatus.PENDING,
    },
    assignedManhad: {
      type: Schema.Types.ObjectId,
      ref: 'Manhad',
      default: null,
    },
    rejectionReason: { type: String, default: null },
    statusHistory: [statusHistorySchema],
    adminNotes: [adminNoteSchema],
  },
  { timestamps: true }
);

projectSchema.index({ status: 1 });
projectSchema.index({ municipality: 1 });
projectSchema.index({ assignedManhad: 1 });
projectSchema.index({ createdAt: -1 });

export const Project = mongoose.model<IProject>('Project', projectSchema);
