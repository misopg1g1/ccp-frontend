import constants from '../constants.js'
import * as dotenv from 'dotenv'

dotenv.config();
export const env = process.env.APP_ENV || constants.ENV_DEV