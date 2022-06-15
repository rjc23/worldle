export interface Game {
    country: string,
    imgSrc: string,
    lat: number,
    long: number,
    guessValue: string,
    guessNumber: number,
    guesses: Guess[]
}

export interface Guess {
    id: number,
    country: string,
    isBlank: boolean,
    isLoading: boolean,
    isGuessed: boolean,
    percent: number,
    distance: number,
    direction: string,
    squares: string[]
}

export interface Country {
    name: string,
    region: string,
    capital: string,
    lat: number,
    long: number,
    country_code: string,
    mapSrc: string,
    flagSrc: string
}