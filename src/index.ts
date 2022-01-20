import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import initDatabase from './database';
import { createTokenContract } from './service';

(async () => {
  const app = express();

  app.use(cors());
  app.use(express.json());

  await initDatabase({ synchronize: false, logging: false });

  app.post('/', async (req, res) => {
    try {
      const { chain, event, data } = JSON.parse(req.body.Message);
      
      switch (event) {
        case 'CreateContract':
          await createTokenContract({ chain, ...data });
          break;
      }
      return res.status(200).json({ success: true });
    } catch (err) {
      return res.status(500).json({ success: false, err });
    }
  });

  app.listen(3000, () => { console.log('app starting'); });
})();