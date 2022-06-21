import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from './interfaces/interfaces';
import { DataService } from './services/data.service';
import { RandomNumService } from './services/random-num.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  state$: Observable<Game>;

  constructor(private data: DataService) {
    this.state$ = this.data.getState();
  }
  
  ngOnInit(): void {
    this.data.createGame('country');
  }
}
