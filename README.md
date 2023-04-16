## Conventions
- FrontEnd solution on directory `src/`.
- BackEnd solution on directory `server/`.
- JS files end with `.js`.
- TSX files end with `.jsx`.
- ES6 Syntax.

## API Endpoint configuration
The fornt will comunicate allways with the Back using the same domain.

To configure the Backend:
- Environment variable: Change the value to connect with the different environments.
    - Default value: Change the default value on `/server/util/getEnv.js`.
        ```
        import constants from '../constants.js'
        export const env = process.env.APP_ENV || constants.ENV_STAGING
        ```
    - Env Var: Set APP_ENV with the value of the environment you want to connect.
- Country variable: Change the value to connect with the specific environment.
    - Default value: Change the default value on `/server/util/getCountryCode.js` ('ar', 'cl', 'co', etc)
        ```
        export const country = (process.env.COUNTRY || 'co').toUpperCase()
        ```
    - Env Var: Set COUNTRY with the value of the environment you want to connect.
- ApiGateway connection: Use the values to connect to Api Gateway.
    - ENV Variables
        - ENDPOINT_GATEWAY

## How to run

### Run Front and Back
Install dependencies with `npm install`. <br>
Start boot Client and Sever with `npm run dev` <br>
This starts the front on port 3000 and back on port 3003. <br>
