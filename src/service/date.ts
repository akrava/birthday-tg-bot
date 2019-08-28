export function isBirthdayTody(d1: Date) {
    const d2 = new Date();
    return d1.getDate() === d2.getDate() &&
        d1.getMonth() === d2.getMonth();
}

export function howManyYears(d1: Date) {
    const d2 = new Date();
    return d2.getFullYear() - d1.getFullYear();
}

export function toFormatedString(date: Date) {
    const y = date.getFullYear();
    const m = `${(date.getMonth() + 1) > 9 ? "" : "0"}` + (date.getMonth() + 1); // getMonth() is zero-based
    const d = `${date.getDate() > 9 ? "" : "0"}` + date.getDate();
    return `${d}.${m}.${y}`;
}
