import mongoose from 'mongoose';
import { getLogger } from '../config/logger';

const options = {
  wtimeoutMS: 2500,
  useNewUrlParser: true,
  maxPoolSize: 20,
};

const initDb = async () => {
  await mongoose
    .connect(process.env.DATABASE_URL, options)
    .then(() => {
      getLogger().info(`Connected to database :${process.env.DATABASE_URL}`);
    })
    .catch(() => {
      getLogger().error(
        `Failed to connect to database :${process.env.DATABASE_URL}`,
      );
    });
};
export default initDb;
