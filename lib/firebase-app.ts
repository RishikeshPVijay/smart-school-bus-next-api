import { credential } from "firebase-admin";
import { initializeApp } from "firebase-admin/app";
import { firebaseConfig } from "./smart-school-bus-c2ba1-firebase-adminsdk-j48w8-5f949e5a2d";

export const initFirebase = () => {
  try {
    initializeApp({
      credential: credential.cert({
        clientEmail: firebaseConfig.client_email,
        projectId: firebaseConfig.project_id,
        privateKey: firebaseConfig.private_key,
      }),
    });
  } catch (error) {
    /*
     * We skip the "already exists" message which is
     * not an actual error when we're hot-reloading.
     */
    if (!/already exists/u.test((error as Error).message)) {
      console.error(
        "Firebase admin initialization error",
        (error as Error).stack
      );
    }
  }
};
