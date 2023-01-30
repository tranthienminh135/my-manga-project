export const targetUrl = (href: string) => {
    const a = document.createElement('a');
    a.href = href;
    a.target = '_blank';
    a.click();
};

export const formatDateTimeResList = (date: any) => {
    if (date) {
        date = date.replace('T', ' ');
        date = date.replace('Z', '');
        date = date.replace(':000', '');
        return date;
    }
    return '';
};

export const getRandom = (arr: any, n: number) => {
    var result = new Array(n),
        len = arr.length,
        taken = new Array(len);
    if (n > len) throw new RangeError('getRandom: more elements taken than available');
    while (n--) {
        var x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
};
