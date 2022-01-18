import 'dotenv/config';

import express from 'express';
import cors from 'cors';

import initializer from './initializer';

(async () => {
  await initializer();
  const app = express();

  app.use(express.json());
  app.use(cors());

  app.listen(process.env.PORT, () => {
    console.log(`app listening ${process.env.PORT}`)
  });
})();