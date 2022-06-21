import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-guess',
  templateUrl: './guess.component.html',
  styleUrls: ['./guess.component.scss']
})
export class GuessComponent implements OnInit {

  @Input() guess!: any;

  constructor() { }

  ngOnInit(): void {

  }
}
