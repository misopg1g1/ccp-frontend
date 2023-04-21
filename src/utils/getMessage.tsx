
const getConten = (error: string) => {
    const array = error.split('|');
    return array.length > 1 ? array[1] : error
}

export default (error: any) => {
    return {
        title: error && error.code ? error.code : '',
        content: error && error.error ? getConten(error.error) : '',
        ...error
    }
}