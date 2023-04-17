import fetch from 'axios';

const fetchRetry = (reqParams, n) =>
    fetch(reqParams).catch(errorResponse => {
        if (errorResponse instanceof Error) {
            const error = {
                response: {
                    message: 'No se pudo procesar la solicitud'
                }
            };
            throw error;
        }
        const error = errorResponse.response.data || {};
        if (n === 0 || error.code) {
            throw errorResponse;
        }
        return fetchRetry(reqParams, n - 1);
    });

function request(method, url, params = {}, body = null, headers = null, retriesNumber) {
    const reqParams = {
        method,
        responseType: 'json',
        headers: headers || {
            Accept: 'application/json'
        }
    };

    const parsedParams = Object.keys(params)
        .map(p => `${p}=${params[p]}`)
        .join('&');
    
    if (method !== 'get' && method !== 'head' && body !== null) {
        if (!reqParams.headers['Content-type']) {
            reqParams.headers['Content-type'] = 'application/json';
        }
        reqParams.data = body;
    }

    reqParams.url = parsedParams ? `${url}?${parsedParams}` : url;
    return fetchRetry(reqParams, retriesNumber).catch(error => Promise.reject(error.response));
}

export function post(url, query, body = {}, headers = null, retrieNumber = 2) {
    return request('post', url, query, body, headers, retrieNumber);
}