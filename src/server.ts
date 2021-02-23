import express from 'express';
import routes from './routes';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const SERVER_PORT = process.env.SERVER_PORT;

app.use(routes);

app.listen(SERVER_PORT, () => {
  console.log(`Server running on port ${SERVER_PORT}`);
});
