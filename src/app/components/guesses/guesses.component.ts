import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-guesses',
  templateUrl: './guesses.component.html',
  styleUrls: ['./guesses.component.scss']
})
export class GuessesComponent {

  game$: Observable<any>;
  guesses$: Observable<any>;

  constructor(private data: DataService) {
    this.game$ = this.data.getState();
    this.guesses$ = this.game$.pipe(
      map(game => game.guesses)
    )
  }
}
