import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Game } from './../interfaces/interfaces';
import { initialData } from './../data/data';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  data: Game = initialData;

  private state = new BehaviorSubject(this.data);

  getState() : Observable<any> {
    return this.state;
  }

  updateInputValue(val: string) {
    let currentState = this.state.value;
    currentState.guessValue = val;
    this.state.next(currentState);
  }

  guess(val: string) : void {
    let currentState = this.state.value;
    console.log(currentState);
    currentState.guesses[currentState.guessNumber].squares = ["green", "green", "green", "yellow", "grey"];
    currentState.guesses[currentState.guessNumber].isBlank = false;
    currentState.guesses[currentState.guessNumber].isLoading = true;
    this.state.next(currentState);
    setTimeout(() => {
      currentState.guesses[currentState.guessNumber].isGuessed = true;
      currentState.guesses[currentState.guessNumber].isLoading = false;
      currentState.guessNumber++;
      this.state.next(currentState);
  }, 1500);
  }
}
