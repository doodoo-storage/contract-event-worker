import { createConnection } from 'typeorm';
import env from 'env-var';

import * as Entity from '../entity';

const DB_PORT = env.get('DB_PORT').required().asInt();
const DB_NAME = env.get('DB_NAME').required().asString();
const DB_HOST = env.get('DB_HOST').required().asString();
const DB_USER = env.get('DB_USER').required().asString();
const DB_PASSWORD = env.get('DB_PASSWORD').required().asString();

export default async ({
  synchronize,
  logging,
}: {
  synchronize: boolean;
  logging: boolean;
}) =>
  createConnection({
    type: 'mysql',
    port: DB_PORT,
    database: DB_NAME,
    host: DB_HOST,
    username: DB_USER,
    password: DB_PASSWORD,
    entities: Object.values(Entity),
    synchronize,
    logging
  });
