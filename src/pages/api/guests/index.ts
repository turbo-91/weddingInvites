import Guest from "@/db/models/Guest";
import dbConnect from "@/db/mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function guestHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  switch (req.method) {
    case "GET":
      if (req.query._id !== undefined) {
        return getGuestById(req, res);
      }
      return req.query.id ? getGuestById(req, res) : getAllGuests(res);
    //   case "POST":
    //     return Array.isArray(req.body)
    //       ? postGuests(req, res)
    //       : postGuest(req, res);
    default:
      return res.status(405).json({ status: "Method Not Allowed" });
  }
}

const getGuestById = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (!req.query._id) {
      return res.status(400).json({ error: "Id is required" });
    }

    const guest = await Guest.find({ _id: req.query._id });

    return guest.length
      ? res.status(200).json(guest)
      : res.status(404).json({ status: "Guest not Found" });
  } catch (error: unknown) {
    console.error("Error retrieving guest:", error);
    return res
      .status(500)
      .json({ error: "Something went wrong. Please try again later." });
  }
};

const getAllGuests = async (res: NextApiResponse) => {
  try {
    const guests = await Guest.find();

    if (!guests || guests.length === 0) {
      return res.status(200).json({ results: [], message: "No guests found" });
    }

    return res.status(200).json(guests);
  } catch (error: unknown) {
    console.error("Error retrieving guests:", error);

    return res.status(500).json({
      error: "Something went wrong. Please try again later.",
    });
  }
};
