export function greetings(name: string, yearOld: number) {
    return `Happy birthday, dear ${name}!\n`
        + `Wishing you many happiness for the coming years ahead.\n`
        + `Congratulations on your ${yearOld}th birthday. `
        + (yearOld >= 20 && "Oh no, so old...")
    ;
}
