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
