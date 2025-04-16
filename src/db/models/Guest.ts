import mongoose, { Schema, Document } from "mongoose";

export type rsvp = "yes" | "no" | "pending";

export interface IGuest extends Document {
  _id: number;
  firstName: string;
  lastName: string;
  email: string;
  inviteId: string;
  rsvp: rsvp;
  dietRestrictions: string;
  plusOneAllowed: boolean;
  plusOneName: string;
}

const guestSchema = new Schema<IGuest>({
  _id: { type: Number, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  inviteId: { type: String, required: true },
  rsvp: {
    type: String,
    enum: ["yes", "no", "pending"],
    default: "pending",
  },
  dietRestrictions: { type: String, required: false },
  plusOneAllowed: { type: Boolean, required: true },
  plusOneName: { type: String, required: false },
});

const Guest = mongoose.models.Guest || mongoose.model("Guest", guestSchema);

export default Guest;
