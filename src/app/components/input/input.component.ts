import { ChangeDetectionStrategy, Component, ElementRef, HostListener, Injectable, OnInit, ViewChild } from '@angular/core';
import { FormControl, ValidatorFn } from '@angular/forms';
import { BehaviorSubject, map, Observable, Subject, Subscription, tap } from 'rxjs';
import { DataService } from '../../services/data.service';
import { Country, Game } from '../../interfaces/interfaces';
import { CountriesService } from 'src/app/services/countries.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputComponent implements OnInit {

  valueChanges!: Subscription;
  state!: Subscription;

  @ViewChild('dropdown', { read: ElementRef, static: false }) dropdown!: ElementRef;

  @HostListener('document:click', ['$event'])
  clickOut() {
    if(this.dropdown !== undefined) {
      if(this.focusClicked) {
        this.focusClicked = false;
      } else {
        this.showListBox = false;
      }
    }
  }

  showListBox = false;
  input = new FormControl('');
  focusClicked = false;
  countryNames: string[] = [];
  list: string[] = [];
  state$: Observable<Game>;
  showAnswer$: Observable<boolean>;
  inputValue$: any;
  copied = false;

  constructor(
    private data: DataService,
    private countries: CountriesService
  ) { 
    this.state$ = this.data.getState();
    this.showAnswer$ = this.state$.pipe(
      map(val => val.showAnswer)
    );
    this.inputValue$ = this.state$.pipe(
      map(val => val.guessValue)
    );
  }

  ngOnInit(): void {
    this.onChanges();
    this.inputChange();
    let countries: Country[] = this.countries.getCountries();
    this.countryNames = countries.map(val => val.name);
    this.list = JSON.parse(JSON.stringify(this.countryNames));
  }
  
  onFocus() {
    if(this.input.value.length > 0) {
      this.focusClicked = true;
      this.showListBox = true;
    }
  }

  onChanges() {
    this.valueChanges = this.input.valueChanges.subscribe(val => {
      if(val.length > 0) {
        this.showListBox = true;
        this.filterList(val);
      } else {
        this.showListBox = false;
      }
    })
  }
  
  inputChange() {
    this.state = this.state$.subscribe(val => {
      this.input.setValue(val.guessValue);
    })
  }

  filterList(val: string) {
    this.list = [];
    this.countryNames.forEach(word => {
      if(word.toLowerCase().includes(val.toLowerCase())) {
        this.list.push(word);
      }
    });
    // this.countryNames = newList;
    // this.list.next(newList);
  }

  guess() {
    this.data.guess(this.input.value);
  }

  countrySelect(country: string) {
    this.data.updateInputValue(country);
    this.showListBox = false;
  }

  share(){
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = "https://playworldle.com";
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    this.copied = true;
    setTimeout(() => {
      console.log('hello :)');
      this.copied = false;
  }, 500);
  }

  ngOnDestroy() {
    this.valueChanges.unsubscribe();
    this.state.unsubscribe();
  }
}