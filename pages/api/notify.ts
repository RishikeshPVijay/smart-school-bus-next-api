import { initFirebase } from "@/lib/firebase-app";
import { Bus, SSBUser, Student, StudentLog } from "@/types";
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

    const now = Timestamp.now();
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
      createdAt: now,
    };

    await db.collection("student-logs").add(data);

    const parentSnapshot = await db.collection("users").doc(parent).get();

    if (!parentSnapshot) {
      res.status(200).json({ message: "Log added" });
      return;
    }

    const { token } = parentSnapshot.data() as SSBUser;

    if (token) {
      const date = now.toDate();
      await messaging().send({
        token: token,
        notification: {
          title: `${name.split(" ")[0]} got ${status.toLowerCase()}`,
          body: `${name.split(" ")[0]} got ${status.toLowerCase()} ${
            status === "IN" ? "to" : "of"
          } bus at ${date.getHours()}:${date.getMinutes()}`,
        },
        data: {},
      });
    }

    res.status(200).json({ message: "Notified" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "server error", extraInfo: err });
  }
}
