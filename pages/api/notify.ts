import { initFirebase } from "@/lib/firebase-app";
import { Bus, Student, StudentLog } from "@/types";
initFirebase();

import { messaging } from "firebase-admin";
import { getFirestore, Timestamp } from "firebase-admin/firestore";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message: string;
  extraInfo?: any;
};

type payload = {
  studentId: string;
  lat: number;
  lng: number;
};

const nextStatusMap: Record<StudentLog["status"], StudentLog["status"]> = {
  IN: "OUT",
  OUT: "IN",
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
    const { studentId, lat, lng }: payload = req.body || {};

    if (!studentId || !lat || !lng) {
      res.status(400).send({ message: "Bad request" });
      return;
    }
    //    await messaging().send({
    //   token:
    //     "eDrlSjaTQrCYeYHGEipd9K:APA91bE0_O4Fwm-OPN_lyu1ABedgJNFB2ZW4YpIF6sjD3aU9fuGGntepVTKMJinM_m6LwEyi53z8TScJO_9N56SQ8HnQJJeOnrvbGGpOowRcqosvRwQuPk4gLjB-2v73xfg8qzx5qjpR",
    //   notification: {
    //     title: "My Title",
    //     body: "TEST",
    //   },
    // });
    // await db.collection("").add({
    //   busId: busId,
    //   createdAt: Timestamp.now(),
    //   lat: lat,
    //   lng: lng,
    // });

    const studentSnapshot = await db
      .collection("students")
      .doc(studentId)
      .get();

    if (!studentSnapshot) {
      res.status(400).send({ message: "Invalid student id" });
      return;
    }

    const student = studentSnapshot.data() as Student;
    const { id, name, parent, admissionNumber, busId } = student;

    const busSnapshot = await db.collection("buses").doc(busId).get();

    if (!busSnapshot) {
      res.status(400).send({ message: "Invalid student id" });
      return;
    }

    const { busNo } = busSnapshot.data() as Bus;

    const prevLogSnapshot = await db
      .collection("student-logs")
      .where("id", "==", id)
      .orderBy("createdAt", "desc")
      .limit(1)
      .get();

    const status: StudentLog["status"] =
      prevLogSnapshot && prevLogSnapshot.docs[0]
        ? nextStatusMap[(prevLogSnapshot.docs[0].data() as StudentLog).status]
        : "IN";

    const data: StudentLog = {
      id,
      name,
      parent,
      admissionNumber,
      class: student.class,
      busNo,
      lat,
      lng,
      busId,
      status,
      createdAt: Timestamp.now(),
    };

    await db.collection("student-logs").add(data);

    res.status(200).json({ message: "Notified" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "server error", extraInfo: err });
  }
}
