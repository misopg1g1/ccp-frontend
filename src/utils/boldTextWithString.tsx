const boldTextWithString = (text: string, string: string) => {
    const index = text.toUpperCase().indexOf(string.toUpperCase())
    return (
        <span>
            {text.slice(0, index)}
            <b>{text.slice(index, index + string.length)}</b>
            {text.slice(index + string.length, text.length)}
        </span>
    )
}

export default boldTextWithString