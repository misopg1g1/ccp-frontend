export const emailRegex = /^([\w-.]+@([\w-]+\.)+[\w-]{2,10})?$/
export const passwordRegex = /^[a-zA-ZÁáÀàÉéÈèÍíÌìÓóÒòÚúÙùÑñüÜ0-9!@#$%^&*?_~/-]{6,15}$/
export const onlyLettersRegexMin = /^[a-zA-ZÀ-ÿ ']{2,}$/
export const onlyLettersRegex = /^[a-zA-ZÀ-ÿ ']+$/
export const onlyNumbersRegex = /^[0-9]+$/
export const onlyLettersNumbersPointComaRegex = /[a-zA-Z0-9.,ñÑ ]$/
export const onlyLettersNumbersPointComaRegexMin = /[a-zA-Z0-9.,ñÑ ]{2,}$/
export const onlyLettersAndNumbersRegexMin = /^[a-zA-ZÀ-ÿ0-9 ']{2,}$/