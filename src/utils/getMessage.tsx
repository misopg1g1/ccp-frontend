
const getConten = (message: string) => {
    const array = message.split('|');
    return array.length > 1 ? array[1] : message
}

export default (message: any) => {
    return {
        title: message && message.code ? message.code : '',
        content: message && message.error ? getConten(message.error) : message.msg ? getConten(message.msg) : '',
        type: message && message.msg ? 'success' : 'error',
        ...message
    }
}