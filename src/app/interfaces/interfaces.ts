export interface Game {
    country: string,
    guessValue: string,
    guessNumber: number,
    guesses: Guess[]
}

export interface Guess {
    id: number,
    isBlank: boolean,
    isLoading: boolean,
    isGuessed: boolean,
    distance: number,
    squares: string[]
}