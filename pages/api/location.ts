import { initFirebase } from "@/lib/firebase-app";
initFirebase();

import { getFirestore, Timestamp } from "firebase-admin/firestore";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message: string;
  extraInfo?: any;
};

type payload = {
  busId: string;
  lat: number;
  lng: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST") {
    res.status(405).send({ message: "Only POST requests allowed" });
    return;
  }

  try {
    const db = getFirestore();

    const { busId, lat, lng }: payload = req.body || {};

    if (!busId || !lat || !lng) {
      res.status(400).send({ message: "Bad request" });
      return;
    }

    await db.collection("locations").add({
      busId: busId,
      createdAt: Timestamp.now(),
      lat: lat,
      lng: lng,
    });

    res.status(200).json({ message: "Location updated" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "server error", extraInfo: err });
  }
}
