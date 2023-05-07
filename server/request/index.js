import CryptoJS from 'crypto-js';

const hashObject = (jsonBody) => {
    const cleanJsonBody = Object.fromEntries(
      Object.entries(jsonBody).filter(([key]) => key !== 'hash'),
    );
    const sortDict = (obj) => {
        if (typeof obj === 'object' && obj !== null) {
          const sortedObj = {};
          Object.keys(obj)
            .sort()
            .forEach(key => {
              let insideObj = obj[key]
              if(typeof insideObj === "object" && obj !== null && !Array.isArray(insideObj)){
                insideObj = sortDict(insideObj)
              }
              sortedObj[key] = insideObj;
            });
          return sortedObj;
        }
        return obj;
      };
      const sortedJson = sortDict(cleanJsonBody);
      const md5Hash = CryptoJS.MD5(JSON.stringify(sortedJson)).toString();
      return {...cleanJsonBody, hash: md5Hash};
};

const setHeaders = (token) => {
    const headers = {
        'Content-Type': 'application/json'
    }
    if (token) {
        headers['Authorization'] = token
    }
    return headers
}

export class Request {
    constructor() {
        return true
    }

    static async get(url,token = null) {
        const headers = setHeaders(token)
        return fetch(url, {
            method: 'GET',
            headers
        })
        .then(response => response.json())
        .then(response => {
            console.info(token)
            try {
                if (response.error) {
                    console.error(`SERVER-APP-WEB[GET]: ${url}; RESPONSE-ERROR: ${JSON.stringify(response)}`)
                    return response
                }
                console.info(`SERVER-APP-WEB[GET]: ${url}; SUCCESS`)
                return response
            } catch (error) {
                console.error(`SERVER-APP-WEB[GET]: ${url}; EXCEPTION-ERROR: ${JSON.stringify(err)}`)
                throw err
            }
        })
    }

    static async post(url, payload, token = null) {
        const body = hashObject(payload)
        const headers = setHeaders(token)
        return fetch(url, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: headers
        })
        .then(response => response.json())
        .then(response => {
            try {
                if (response.error) {
                    console.error(`SERVER-APP-WEB[POST]: ${url}; BODY: ${JSON.stringify(body)}; RESPONSE-ERROR: ${JSON.stringify(response)}`)
                    return response
                }
                console.info(`SERVER-APP-WEB[POST]: ${url}; BODY: ${JSON.stringify(body)}; SUCCESS`)
                return response
            } catch (err) {
                console.error(`SERVER-APP-WEB[POST]: ${url}; BODY: ${JSON.stringify(body)}; EXCEPTION; REQUEST: ${JSON.stringify(err)}`)
                return Promise.reject(err)
            }
        }).catch((err) => {
            console.error(`SERVER-APP-WEB[POST]: ${url}; EXCEPTION-ERROR: ${JSON.stringify(err)}`)
            throw err
        })
    }

    static async put(url, payload, token = null) {
        const body = hashObject(payload);
        const headers = setHeaders(token)
        return fetch(url, {
            method: 'PUT',
            body: JSON.stringify(body),
            headers: headers
        })
        .then(response => response.json())
        .then(response => {
            try {
                if (response.error) {
                    console.error(`SERVER-APP-WEB[PUT]: ${url}; BODY: ${JSON.stringify(body)}; RESPONSE-ERROR: ${JSON.stringify(response)}`)
                    return response
                }
                console.info(`SERVER-APP-WEB[PUT]: ${url}; BODY: ${JSON.stringify(body)}; SUCCESS`)
                return response
            } catch (err) {
                console.error(`SERVER-APP-WEB[PUT]: ${url}; BODY: ${JSON.stringify(body)}; EXCEPTION; REQUEST: ${JSON.stringify(err)}`)
                return Promise.reject(err)
            }
        }).catch((err) => {
            console.error(`SERVER-APP-WEB[PUT]: ${url}; EXCEPTION-ERROR: ${JSON.stringify(err)}`)
            throw err
        })
    }
}