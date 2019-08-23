export function isBirthdayTody(d1: Date) {
    const d2 = new Date();
    return d1.getUTCDate() === d2.getUTCDate() &&
        d1.getUTCMonth() === d2.getUTCMonth();
}

export function howManyYears(d1: Date) {
    const d2 = new Date();
    return d2.getUTCFullYear() - d1.getUTCFullYear();
}
