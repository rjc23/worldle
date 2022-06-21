import { Game } from "../interfaces/interfaces";

export const initialData: Game = {
    country: "",
    gameType: "country",
    gameMode: "Daily",
    showAlert: false,
    showShare: false,
    showAnswer: false,
    date: "",
    imgSrc: "",
    lat: 0,
    long: 0,
    guessValue: "",
    guessNumber: 0,
    guesses: [
      {
        id: 0,
        distance: 0,
        direction: "",
        percent: 0,
        country: "",
        isBlank: true,
        isLoading: false,
        isGuessed: false,
        squares: []
      },
      {
        id: 1,
        distance: 0,
        direction: "",
        percent: 0,
        country: "",
        isBlank: true,
        isLoading: false,
        isGuessed: false,
        squares: []
      },
      {
        id: 2,
        distance: 0,
        direction: "",
        percent: 0,
        country: "",
        isBlank: true,
        isLoading: false,
        isGuessed: false,
        squares: []
      },
      {
        id: 3,
        distance: 0,
        direction: "",
        percent: 0,
        country: "",
        isBlank: true,
        isLoading: false,
        isGuessed: false,
        squares: []
      },
      {
        id: 4,
        distance: 0,
        direction: "",
        percent: 0,
        country: "",
        isBlank: true,
        isLoading: false,
        isGuessed: false,
        squares: []
      },
      {
        id: 5,
        distance: 0,
        direction: "",
        percent: 0,
        country: "",
        isBlank: true,
        isLoading: false,
        isGuessed: false,
        squares: []
      },
    ]
  }