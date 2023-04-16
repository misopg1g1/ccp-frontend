export default (error) => {
    console.log('error', error)
    return {
        title: error && error.code ? error.code : '0000',
        content: error && error.error ? error.error : '0000',
        ...error
    }
}