import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { Game } from 'src/app/interfaces/interfaces';
import { DataService } from 'src/app/services/data.service';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageComponent implements OnInit {

  state$: Observable<Game>;
  imgState$: Observable<boolean>;
  constructor(private data: DataService, private img: ImageService) {
    this.state$ = this.data.getState();
    this.imgState$ = this.img.getState();
  }

  ngOnInit(): void {
  }

  isLoaded() {
    this.img.setLoaded();
  }
  
}
