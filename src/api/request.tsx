import fetch from 'axios';

const fetchRetry: any = (reqParams: any, n: number) =>
    fetch(reqParams).catch((errorResponse: any) => {
        if (errorResponse instanceof Error) {
            throw {
                response: {
                    message: "The request could not be processed"
                }
            };
        }
        const error = errorResponse.response.data || {};
        if (n === 0 || error.code) {
            throw errorResponse;
        }
        return fetchRetry(reqParams, n - 1);
    });

function request(method: string, url: string, params: any = {}, body: any = null, headers: any = null, retriesNumber: number = 0) {
    const reqParams = {
        url,
        data: null,
        method,
        responseType: 'json',
        headers: headers || {
            Accept: 'application/json'
        }
    };

    const parsedParams = Object.keys(params)
        .map(p => `${p}=${params[p]}`)
        .join('&')
    
    if (method !== 'get' && method !== 'head' && body !== null) {
        if (!reqParams.headers['Content-type']) {
            reqParams.headers['Content-type'] = 'application/json'
        }
        reqParams.data = body
    }

    reqParams.url = parsedParams ? `${url}?${parsedParams}` : url
    return fetchRetry(reqParams, retriesNumber).catch((error: any) => Promise.reject(error.response))
}

export function get(url: string, query: any, headers: any = null, retriesNumber: number = 1) {
    return request('get', url, query, null, headers, retriesNumber)
}

export function post(url: string, query: any, body: any = {}, headers: any = null, retriesNumber: number = 1) {
    return request('post', url, query, body, headers, retriesNumber)
}

export function put(url: string, query: any, body: any = {}, headers: any = null, retriesNumber: number = 1) {
    return request('put', url, query, body, headers, retriesNumber)
}