import { Component, OnInit } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { Game } from 'src/app/interfaces/interfaces';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnInit {

  state$: Observable<Game>;

  constructor(private data: DataService) {
    this.state$ = this.data.getState().pipe(
      tap(console.log)
    );
  }

  ngOnInit(): void {
  }

}
