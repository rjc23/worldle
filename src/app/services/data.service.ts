import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Country, Game } from './../interfaces/interfaces';
import { initialData } from './../data/data';
import { CountriesService } from './countries.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  data: Game = initialData;
  private state = new BehaviorSubject(this.data);

  constructor(private countriesService: CountriesService) {}

  getState() : Observable<any> {
    return this.state;
  }

  createGame() {
    const countries = this.countriesService.getCountries();
    const filter = countries.filter(c => c.mapSrc !== "");
    let randomNum = Math.floor((Math.random() * filter.length) + 1);
    console.log(randomNum);
    console.log(filter[randomNum].name);
    let state = this.state.value;

    state.country = filter[randomNum].name;
    state.imgSrc = filter[randomNum].mapSrc;
    state.lat = filter[randomNum].lat;
    state.long = filter[randomNum].long;

    // console.log("State");
    // console.log(state);
    this.state.next(state);
  }

  updateInputValue(val: string) {
    let currentState = this.state.value;
    currentState.guessValue = val;
    this.state.next(currentState);
  }

  guess(val: string) : void {
    // Find country
    let country: Country = this.countriesService.findCountry(val);

    // Update state
    let state = this.state.value;
    let currentGuess = state.guesses[state.guessNumber];
    state.guessValue = "";
    currentGuess.isBlank = false;
    currentGuess.distance = this.countriesService.calcDistance(country.lat, country.long, state.lat, state.long);
    currentGuess.percent = this.countriesService.calcPercentage(currentGuess.distance);
    currentGuess.squares = this.countriesService.calcSquares(currentGuess.percent);
    const bearing = this.countriesService.calcBearing(state.lat, state.long, country.lat, country.long);
    console.log(bearing);
    currentGuess.direction = this.countriesService.getArrow(bearing);
    currentGuess.isLoading = true;
    this.state.next(state);
    setTimeout(() => {
      currentGuess.country = val;
      currentGuess.isGuessed = true;
      currentGuess.isLoading = false;
      state.guessNumber++;
      this.state.next(state);
  }, 1500);
  }
}
