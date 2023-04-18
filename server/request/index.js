import CryptoJS from 'crypto-js';

export const hashObject = (jsonBody) => {
    const cleanJsonBody = Object.fromEntries(
      Object.entries(jsonBody).filter(([key]) => key !== 'hash'),
    );
    const sortedKeys = Object.keys(cleanJsonBody).sort();
    const jsonString = sortedKeys
      .map(
        (key, index) =>
          `"${key}": "${cleanJsonBody[key]}"${
            index < sortedKeys.length - 1 ? ', ' : ''
          }`,
      )
      .join('');
  
    const wrappedJsonString = `{${jsonString}}`;
    const md5Hash = CryptoJS.MD5(wrappedJsonString).toString();
    return {...cleanJsonBody, hash: md5Hash};
};

export class Request {
    constructor() {
        return true
    }

    static async post(url, payload) {
        const body = hashObject(payload);
        return fetch(url, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(response => response.json())
            .then(response => {
                if (payload.password) {
                    payload.password = '**********'
                }
                try {
                    if (response.error) {
                        console.error(`SERVER-APP-WEB[POST]: ${url}; BODY: ${JSON.stringify(payload)}; RESPONSE-ERROR: ${JSON.stringify(response)}`)
                        return response
                    }
                    console.info(`SERVER-APP-WEB[POST]: ${url}; BODY: ${JSON.stringify(payload)}; SUCCESS`)
                    return response
                } catch (err) {
                    console.error(`SERVER-APP-WEB[POST]: ${url}; BODY: ${JSON.stringify(payload)}; EXCEPTION; REQUEST: ${JSON.stringify(err)}`)
                    return Promise.reject(err)
                }
            }).catch((err) => {
                console.error(`SERVER-APP-WEB[POST]: ${url}; EXCEPTION-ERROR: ${JSON.stringify(err)}`)
                throw err
            })
    }
}