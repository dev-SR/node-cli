import nc from 'next-connect';
import onError from './middleware/errors';
import { Logger } from './middleware/logger';
export const handler = nc({ onError }).use(Logger);
