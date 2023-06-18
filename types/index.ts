import { Timestamp } from "firebase-admin/firestore";

export type Student = {
  id: string;
  busId: string;
  name: string;
  class: string;
  admissionNumber: string;
  address: string;
  parent: string;
  rfid?: string;
};

export type Bus = {
  id: string;
  busNo: string;
  route: string;
  driver: string;
  parents?: string[];
};

export type StudentLog = {
  id: string;
  name: string;
  class: string;
  admissionNumber: string;
  parent: string;
  busId: string;
  busNo: string;
  status: "IN" | "OUT";
  lat: number;
  lng: number;
  createdAt: Timestamp;
};
