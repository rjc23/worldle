import { Component, Input, OnInit } from '@angular/core';
import * as AOS from 'aos';

@Component({
  selector: 'app-guess',
  templateUrl: './guess.component.html',
  styleUrls: ['./guess.component.scss']
})
export class GuessComponent implements OnInit {

  @Input() guess!: any;

  constructor() { }

  ngOnInit(): void {
    AOS.init();
  }

  getDelay(index : number) : number {
    return index*250;
  }
}
