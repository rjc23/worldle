import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Game } from 'src/app/interfaces/interfaces';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {

  state$: Observable<Game>;

  constructor(
    private data: DataService,
    private router: Router
  ) {
    this.state$ = this.data.getState();
  }

  ngOnInit(): void {
  }

  updateGameType(val: string) {
    this.data.createGame(val);
  }

  toggleUnlimited() {
    this.data.toggleUnlimited();
  }

}
