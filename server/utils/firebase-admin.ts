import { initializeApp, cert, getApps, getApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const { firebase } = useRuntimeConfig();
const firebaseAdminConfig = {
  credential: cert({
    projectId: firebase.projectId,
    clientEmail: firebase.clientEmail,
    privateKey: firebase.privateKey?.replace(/\\n/g, "\n"),
  }),
};

const app = !getApps().length ? initializeApp(firebaseAdminConfig) : getApp();
const dbAdmin = getFirestore(app);

export { dbAdmin };
