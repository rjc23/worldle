import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  isLoading = new BehaviorSubject<boolean>(true);

  constructor() { }

  getState() : Observable<boolean> {
    return this.isLoading;
  }
  setLoading() {
    this.isLoading.next(true);
  }
  setLoaded() {
    this.isLoading.next(false);
  }
}
