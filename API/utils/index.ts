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
        if (body[required[i]] === null || body[required[i]] === "") {
            return false;
        }
    }
    return true;
}

//f(n,a,b) = (P+M+G*a+A*b+BP)*(1+(n-1)*0.25)
export function calculatePoints() {

    let winner: number = 0;
    let finalScore: number = 0;
    let goals: number = 0;
    let assists: number = 0;
    let bestPlayer: number = 0;
    let points: number = 0;
    let multiplier: number = getMultiplier(winner, finalScore, goals,
        assists, bestPlayer);

    points = (winner + finalScore + goals + assists + bestPlayer) * (1 + (multiplier - 1) * 0.25);
}


function getMultiplier(winner: number, finalScore: number, goals: number,
    assists: number, bestPlayer: number): number {

    let multiplier: number = 0;

    if (winner == 10) {
        multiplier++;
    }
    if (finalScore == 10) {
        multiplier++;
    }
    if (goals == 1) {
        multiplier++;
    }
    if (assists == 1) {
        multiplier++;
    }
    if (bestPlayer == 10) {
        multiplier++;
    }

    return multiplier;
}

