//Utility functions
export function generateRandomCode(num: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result1 = '';
    const charactersLength = characters.length;
    for (let i = 0; i < num; i++) {
        result1 += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result1;
}

export function validateBody(body: any, required: string[]): boolean {
    for (let i = 0; i < required.length; i++) {
        if (body[required[i]] == null || body[required[i]] == "") {
            return false;
        }
    }
    return true;
}