import CryptoJS from 'crypto-js';

export const hashObject = (jsonBody) => {
    const cleanJsonBody = Object.fromEntries(
      Object.entries(jsonBody).filter(([key]) => key !== 'hash'),
    );
    const sortDict = (obj) => {
        if (typeof obj === 'object' && obj !== null) {
          const sortedObj = {};
          Object.keys(obj)
            .sort()
            .forEach(key => {
              sortedObj[key] = obj[key];
            });
          return sortedObj;
        }
        return obj;
      };
      const sortedJson = sortDict(cleanJsonBody);
      const md5Hash = CryptoJS.MD5(JSON.stringify(sortedJson)).toString();
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