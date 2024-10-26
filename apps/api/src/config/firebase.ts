import admin, { ServiceAccount } from 'firebase-admin';
import serviceAccount from './firebase.json';
console.log(admin.apps.length);
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as ServiceAccount),
    storageBucket: process.env.FIREBASE_STORAGE_URL,
  });
}

console.log(process.env.FIREBASE_STORAGE_URL);

const bucket = admin.storage().bucket();
export { bucket };
