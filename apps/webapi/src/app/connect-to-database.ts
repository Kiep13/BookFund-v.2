import {createConnection} from 'typeorm';

import { DATABASE_CONFIGS } from '@core/constants';

const createConnectionPromise = createConnection(DATABASE_CONFIGS);
export default createConnectionPromise;
