import mongoose, { Schema, Document } from "mongoose";

export type RSVPStatus = "condirmed" | "declined" | "pending" | "partial";

export interface IInvite extends Document {
  _id: number;
  groupName: string;
  guests: [string];
  inviteLinkToken: string;
  sent: boolean;
  rsvpStatus: RSVPStatus;
  notes: string;
  createdAt: string;
}

const inviteSchema = new Schema<IInvite>({
  _id: { type: Number, required: true },
  groupName: { type: String, required: true },
  guests: { type: [String], required: true },
  inviteLinkToken: { type: String, required: true },
  sent: { type: Boolean, required: true },
  rsvpStatus: {
    type: String,
    enum: ["condirmed", "declined", "pending", "partial"],
    default: "pending",
  },
  notes: { type: String, required: true },
  createdAt: { type: String, required: true },
});

const Invite = mongoose.models.Invite || mongoose.model("Invite", inviteSchema);

export default Invite;
