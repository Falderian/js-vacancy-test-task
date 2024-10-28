import multer from '@koa/multer';
import admin, { ServiceAccount } from 'firebase-admin';

import { validateMiddleware } from 'middlewares';

import { productSchema } from 'schemas/src/product.schema';
import { AppKoaContext, AppRouter } from 'types';

import productService from '../product.service';

const storage = multer.memoryStorage();
const upload = multer({ storage });

async function handler(ctx: AppKoaContext) {
  const isTitleTaken = await productService.findOne({ title: (ctx.validatedData as { title: string }).title });

  if (isTitleTaken) {
    ctx.body = { errors: { title: 'The title is already taken' } };
    ctx.status = 409;
    return;
  }

  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_CREDS!) as ServiceAccount),
      storageBucket: process.env.FIREBASE_STORAGE_URL,
    });
  }

  const bucket = admin.storage().bucket();

  const productData = ctx.validatedData as { image: string };
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
    } catch (error) {
      ctx.status = 500;
      ctx.body = { error: 'Error uploading file to Firebase.' };
      return;
    }
  }

  const product = await productService.insertOne(productData);
  ctx.body = productService.getPublic(product);
}

export default (router: AppRouter) => {
  router.post('/new', upload.single('image'), validateMiddleware(productSchema), handler);
};
