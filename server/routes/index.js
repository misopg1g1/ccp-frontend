// Routes
import {login} from './login/index.js'

export default function loadRoutes(server) {
    login(server)
}
