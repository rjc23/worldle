import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Country, Game } from './../interfaces/interfaces';
import { initialData } from './../data/data';
import { CountriesService } from './countries.service';
import { RandomNumService } from './random-num.service';
import { ImageService } from './image.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {


  private state = new BehaviorSubject(JSON.parse(JSON.stringify(initialData)));

  constructor(private countriesService: CountriesService, private randomGen: RandomNumService, private imgService: ImageService) {}

  getState() : Observable<any> {
    return this.state;
  }

  toggleUnlimited() {
    let state = this.state.value;
    const gameMode = state.gameMode;
    const gameType = state.gameType;

    // let newGame: Game = JSON.parse(JSON.stringify(initialData));
    gameMode === "Daily" ? state.gameMode = "Unlimited" : state.gameMode = "Daily";
    this.state.next(state);

    this.createGame(gameType);
  }

  createGame(val: string) {

    let state = this.state.value;

    //Does play have Daily game in Local Storage?
    if(state.gameMode === 'Daily') {
      let localStorageGame = localStorage.getItem(val);
      if(localStorageGame !== null) {
        let localGame: Game = JSON.parse(localStorageGame);

        const date = new Date();
        const stringDate = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
        if(localGame.date === stringDate) {
          this.state.next(localGame);
          return;
        }
      }
    }


    // Create a new game
    let randomNum = 0;
    this.imgService.setLoading();
    this.state.next(JSON.parse(JSON.stringify(initialData)));
    const countries = this.countriesService.getCountries();
    let filter: Country[] = [];
    const date = new Date();

    if(val === 'country') {
      filter = countries.filter(c => c.mapSrc !== "");
      if(state.gameMode === 'Daily') {
        randomNum = this.randomGen.randomNumGeneratorToday(filter.length-1, 2);
      } else {
        randomNum = this.randomGen.randomNumberGenerator(filter.length-1);
      }
      state.imgSrc = filter[randomNum].mapSrc;
      state.gameType = 'country';
    } else if(val === 'flag') {
      filter = countries.filter(c => c.flagSrc !== "");
      if(state.gameMode === 'Daily') {
        randomNum = this.randomGen.randomNumGeneratorToday(filter.length-1, 3);
      } else {
        randomNum = this.randomGen.randomNumberGenerator(filter.length-1);
      }
      state.imgSrc = filter[randomNum].flagSrc;
      state.gameType = 'flag';
    } else if(val === 'capital') {
      filter = countries.filter(c => c.flagSrc !== "");
      if(state.gameMode === 'Daily') {
        randomNum = this.randomGen.randomNumGeneratorToday(filter.length-1, 4);
      } else {
        randomNum = this.randomGen.randomNumberGenerator(filter.length-1);
      }
      state.imgSrc = filter[randomNum].capital;
      state.gameType = 'capital';
    }

    if(state.country === filter[randomNum].name) {
      this.imgService.setLoaded();
    }

    state.country = filter[randomNum].name;
    state.lat = filter[randomNum].lat;
    state.long = filter[randomNum].long;
    state.date = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
    state.guesses = JSON.parse(JSON.stringify(initialData.guesses));
    state.guessNumber = 0;
    state.showShare = false;
    state.showAnswer = false;
    this.state.next(state);
  }

  updateInputValue(val: string) {
    let currentState = this.state.value;
    currentState.guessValue = val;
    this.state.next(currentState);
  }

  guess(val: string) : void {
    // Find country
    let country: Country | null = this.countriesService.findCountry(val);
    if(country === null || country === undefined) {
      this.triggerAlert();
      return;
    }

    // Update state
    let state = this.state.value;
    let currentGuess = state.guesses[state.guessNumber];
    state.guessValue = "";
    currentGuess.isBlank = false;
    currentGuess.distance = this.countriesService.calcDistance(country.lat, country.long, state.lat, state.long);
    currentGuess.percent = this.countriesService.calcPercentage(currentGuess.distance);
    currentGuess.squares = this.countriesService.calcSquares(currentGuess.percent);
    const bearing = this.countriesService.calcBearing(state.lat, state.long, country.lat, country.long);
    currentGuess.direction = this.countriesService.getArrow(bearing, currentGuess.distance);
    currentGuess.isLoading = true;
    if(state.guessNumber > 4 || currentGuess.distance === 0) {
      state.showShare = true;
      if(state.guessNumber > 4 && currentGuess.distance !== 0) {
        state.showAnswer = true;
      }
    }
    this.state.next(state);
    setTimeout(() => {
      currentGuess.country = val;
      currentGuess.isGuessed = true;
      currentGuess.isLoading = false;
      state.guessNumber++;
      this.state.next(state);
      // Put into localStorage
      if(state.gameMode === 'Daily') {
        localStorage.setItem(state.gameType, JSON.stringify(state));
      }
  }, 1800);
  }

  triggerAlert() {
    let state = this.state.value;
    state.showAlert = true;
    this.state.next(state);
    setTimeout(() => {
      state.showAlert = false;
      this.state.next(state);
  }, 2000);
    return;
  }
}
