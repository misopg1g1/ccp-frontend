// Routes
import {inventory} from './inventory/index.js'
import {login} from './login/index.js'
import {product} from './product/index.js'

export default function loadRoutes(server) {
    inventory(server)
    login(server)
    product(server)
}
