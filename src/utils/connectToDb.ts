import mongoose from 'mongoose';
import config from 'config';
import log from './logger';

const connectToDb = async () => {
  const dbUrl = config.get<string>('dbUrl');

  try {
    await mongoose.connect(dbUrl);
    log.info('Connected to database');
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export default connectToDb;
