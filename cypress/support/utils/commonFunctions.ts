export default function generateRandomEmail(): string {
    // Function to generate a random string using Web Crypto API
    function generateRandomString(length: number): string {
        const chars: string = 'abcdefghijklmnopqrstuvwxyz0123456789';
        const randomValues: Uint8Array = new Uint8Array(length); // Create a typed array of random values
        window.crypto.getRandomValues(randomValues); // Fill the array with random values

        let result: string = '';
        for (let i: number = 0; i < length; i++) {
            // Use random values to select characters from the chars string
            result += chars.charAt(randomValues[i] % chars.length);
        }
        return result;
    }

    const localPart: string = generateRandomString(8);
    const domain: string = 'gmail';
    const tld: string = 'com';

    return `test-${localPart}@${domain}.${tld}`;
}
