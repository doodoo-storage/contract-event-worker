import initDatabase from './database';

export default async () => {
  await initDatabase({ synchronize: false, logging: false });
}