import multer from '@koa/multer';
import admin, { ServiceAccount } from 'firebase-admin';
import _ from 'lodash';
import { productSchema } from 'schemas/src/product.schema';
import { AppKoaContext, AppRouter } from 'types';
import serviceAccount from '../../../config/firebase.json';
import { validateMiddleware } from '../../../middlewares';
import productService from '../product.service';

const storage = multer.memoryStorage();
const upload = multer({ storage });

async function handler(ctx: AppKoaContext) {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount as ServiceAccount),
      storageBucket: process.env.FIREBASE_STORAGE_URL,
    });
  }

  const bucket = admin.storage().bucket();

  const productData = ctx.validatedData;
  const imageFile = ctx.request.file;

  if (imageFile) {
    try {
      const fileName = `products/${Date.now()}_${imageFile.originalname}`;
      const file = bucket.file(fileName);
      await file.save(imageFile.buffer, {
        metadata: { contentType: imageFile.mimetype },
        public: true,
      });

      const fileUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;
      productData.image = fileUrl;

      console.log('File uploaded successfully:', fileUrl);
    } catch (error) {
      console.error('Error uploading file:', error);
      ctx.status = 500;
      ctx.body = { error: 'Error uploading file to Firebase.' };
      return;
    }
  }

  const product = await productService.insertOne(productData);
  ctx.body = productService.getPublic(product);
}

export default (router: AppRouter) => {
  router.post('/new', upload.single('image'), validateMiddleware(_.omit(productSchema, 'image')), handler);
};
