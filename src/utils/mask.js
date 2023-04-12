export function maskValue(val, mask) {
    let res = '';
    let j = 0;

    const value = val.replace(/[^kK\d]/g, '');

    for (let index = 0; index < value.length; index++) {
        if (mask[j]) {
            if (mask[j] === '#' || value[i] === mask[i]) {
                res += value[i];
                j += 1;
            } else if (mask[j]) {
                res += mask[j] + value[i];
                j += 2;
            }
        }
    }
    return res;
}

export function unmaskValue(value) {
    return value.replace(/[^kK\d]/g, '');
}