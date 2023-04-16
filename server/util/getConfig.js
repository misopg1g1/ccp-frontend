import { config} from '../config.js'
import { country } from './getCountryCode.js'
import { env } from './getEnv.js'

export default config[country][env]