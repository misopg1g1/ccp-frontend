export function response_error(method, req, error) {
    const body = req.body ? `BODY: ${JSON.stringify(req.body)};` : '';
    const params = req.params ? `PARAMS: ${JSON.stringify(req.params)};` : '';
    const err = error ? `ERROR: ${error};` : '';
    console.log(`${method} FAIL: HEADERS: ${JSON.stringify(req.headers)}; ${body} ${params} ${err}`);
}
export function response_success(method, req, error) {
    const body = req.body ? `BODY: ${JSON.stringify(req.body)};` : '';
    const params = req.params ? `PARAMS: ${JSON.stringify(req.params)};` : '';
    const response = `RESPONSE: ${JSON.stringify(res)}`;
    console.log(`${method} SUCCESS: HEADERS: ${JSON.stringify(req.headers)}; ${body} ${params} ${response}`);
}