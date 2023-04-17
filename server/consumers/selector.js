import { country } from '../util/getCountryCode.js'
import { ConsumerAr } from './AR/index.js'
import { ConsumerCl } from './CL/index.js'
import { ConsumerCo } from './CO/index.js'

const getConsumerByCountry = () => {
    switch (country) {
        case 'AR':
            return ConsumerAr;
        case 'CL':
            return ConsumerCl;
        case 'CO':
            return ConsumerCo;
        default:
            console.error(`Contry ${country} not found`)
            break;
    }
}

export const Consumer = getConsumerByCountry()