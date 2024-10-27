import admin, { ServiceAccount } from 'firebase-admin';

if (!admin.apps.length) {
  try {
    const serviceAccount = JSON.parse(process.env.FIREBASE_CREDS!);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount as ServiceAccount),
      storageBucket: process.env.FIREBASE_STORAGE_URL,
    });
  } catch (error) {
    console.error('Error initializing Firebase Admin:', error);
  }
}

const bucket = admin.storage().bucket();
if (!bucket) {
  console.error('Bucket is undefined.');
} else {
  console.log('Bucket initialized:', bucket.name);
}

export { bucket };
