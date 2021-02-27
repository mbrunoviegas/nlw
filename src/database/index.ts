import { Connection, createConnection, getConnectionOptions } from 'typeorm';

export default async (): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();
  const NODE_ENV: string = process.env.NODE_ENV;
  const options = Object.assign(defaultOptions, {
    database:
     NODE_ENV === 'test'
        ? './src/database/database.test.sqlite'
        : defaultOptions.database,
  });
  return createConnection(options);
};
