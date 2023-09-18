import mongoose from 'mongoose';
import CONFIG from './config';

export default (async () => {
  try {
    const env: any = CONFIG.NODE_ENV || 'development';
    const mongoUri: any = CONFIG.MONGO_URI;

    const mongooseOptions: any = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
    await mongoose.connect(mongoUri, mongooseOptions);
    console.log('MongoDB Connected Successfully');
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
})();
