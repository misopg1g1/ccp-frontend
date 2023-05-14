export function response_error(method, req, error) {
    const body = req.body ? `BODY: ${JSON.stringify(req.body)};` : '';
    const params = req.params ? `PARAMS: ${JSON.stringify(req.params)};` : '';
    const err = error ? `ERROR: ${error};` : '';
    console.error(`${method} FAIL: HEADERS: ${JSON.stringify(req.headers)}; ${body} ${params} ${err}`);
}