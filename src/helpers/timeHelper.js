export function fromStrToTime(dateString) {
    return dateString.substr(11);
}

export function timeISOToUAFormat(dateString) {
    return new Date(dateString).toLocaleString("uk");
}