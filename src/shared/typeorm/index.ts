import { Connection, createConnection, getConnectionManager } from 'typeorm';
import ormConfig from '../../../ormconfig';

let connectionPromise: Promise<Connection> | null = null;

export async function initializeDatabase(): Promise<Connection> {
  const connectionManager = getConnectionManager();

  if (connectionManager.has('default')) {
    const connection = connectionManager.get('default');

    if (connection.isConnected) {
      return connection;
    }

    if (!connectionPromise) {
      connectionPromise = connection.connect();
    }

    return connectionPromise;
  }

  if (!connectionPromise) {
    connectionPromise = createConnection(ormConfig);
  }

  return connectionPromise;
}
