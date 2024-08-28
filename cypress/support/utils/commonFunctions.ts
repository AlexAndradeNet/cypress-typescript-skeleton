export function generateRandomNumber(size: number): number {
    return Math.floor(Math.random() * size);
}

export function generateRandomString(size: number): string {
    return Math.random()
        .toString(36)
        .replace(/[^a-z]+/g, '')
        .substring(0, size);
}

export function generateRandomEmail(): string {
    return `test+${generateRandomString(5)}+${generateRandomNumber(
        100000
    )}@gmail.com`;
}
