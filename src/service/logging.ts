export function error(e: Error) {
    console.error(log("Error", e.message));
    console.log(e.stack);
}

export function warning(what: string) {
    console.warn(log("Warning", what));
}

export function success(what: string) {
    console.log(log("Success", what));
}

export function info(what: string) {
    console.info(log("Info", what));
}

function log(type: string, what: string) {
    const date = new Date();
    const DD = date.getDate();
    const MM = date.getMonth() + 1;
    const YYYY = date.getFullYear();
    const time = date.toLocaleTimeString();
    return `[${DD}.${MM}.${YYYY} ${time}.]: ${type}: ${what}`;
}
