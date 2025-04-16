import Invite from "@/db/models/Invite";
import dbConnect, { clientPromise } from "@/db/mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function inviteHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();
  console.log(clientPromise);

  switch (req.method) {
    case "GET":
      if (req.query._id !== undefined) {
        return getInviteById(req, res);
      }
      return req.query.id ? getInviteById(req, res) : getAllInvites(res);
    //   case "POST":
    //     return Array.isArray(req.body)
    //       ? postInvites(req, res)
    //       : postInvite(req, res);
    default:
      return res.status(405).json({ status: "Method Not Allowed" });
  }
}

const getInviteById = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (!req.query._id) {
      return res.status(400).json({ error: "Id is required" });
    }

    const invite = await Invite.find({ _id: req.query._id });

    return invite.length
      ? res.status(200).json(invite)
      : res.status(404).json({ status: "Invite not Found" });
  } catch (error: unknown) {
    console.error("Error retrieving invite:", error);
    return res
      .status(500)
      .json({ error: "Something went wrong. Please try again later." });
  }
};

const getAllInvites = async (res: NextApiResponse) => {
  try {
    const invites = await Invite.find();

    if (!invites || invites.length === 0) {
      return res.status(200).json({ results: [], message: "No invites found" });
    }

    return res.status(200).json(invites);
  } catch (error: unknown) {
    console.error("Error retrieving invites:", error);

    return res.status(500).json({
      error: "Something went wrong. Please try again later.",
    });
  }
};
