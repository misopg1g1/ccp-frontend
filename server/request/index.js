
export class Request {
    constructor() {
        return true
    }

    static async post(url, payload) {
        return fetch(url, {
            method: 'POST',
            body: JSON.stringify(payload),
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
                        console.log(`SERVER-APP-WEB[POST]: ${url}; BODY: ${JSON.stringify(payload)}; RESPONSE-ERROR: ${JSON.stringify(response)}`)
                        return response
                    }
                    console.log(`SERVER-APP-WEB[POST]: ${url}; BODY: ${JSON.stringify(payload)}; SUCCESS`)
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