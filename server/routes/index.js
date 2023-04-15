import fs from 'fs'
import path from 'path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'url';

import {login} from './login/index.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getModule = (path) => {
    const require = createRequire(import.meta.url);
    return require.resolve(path);
}

export default function loadRoutes(server) {
    login(server)
}
