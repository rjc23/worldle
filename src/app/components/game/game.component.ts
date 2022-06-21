import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from 'src/app/interfaces/interfaces';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  state$: Observable<Game>;

  constructor(private data: DataService) {
    this.state$ = this.data.getState();
  }
  
  ngOnInit(): void {
    this.data.createGame('country');
  }

}
