import { Component, ElementRef, HostListener, Injectable, OnInit, ViewChild } from '@angular/core';
import { FormControl, ValidatorFn } from '@angular/forms';
import { BehaviorSubject, map, Observable, Subject, Subscription, tap } from 'rxjs';
import { DataService } from '../../services/data.service';
import { Country, Game } from '../../interfaces/interfaces';
import { CountriesService } from 'src/app/services/countries.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {

  valueChanges!: Subscription;
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
  list = new BehaviorSubject(this.countryNames);
  state$: Observable<Game>;
  inputValue$: any;

  constructor(
    private data: DataService,
    private countries: CountriesService
  ) { 
    this.state$ = this.data.getState();
    this.inputValue$ = this.state$.pipe(
      map(val => val.guessValue)
    )
  }

  ngOnInit(): void {
    this.onChanges();
    this.inputChange();
    let countries = this.countries.getCountries();
    this.countryNames = countries.map(val => val.name);
    this.list.next(this.countryNames);
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
    this.state$.subscribe(val => {
      this.input.setValue(val.guessValue);
    })
  }

  filterList(val: string) {
    let newList: string[] = [];
    this.countryNames.forEach(word => {
      if(word.toLowerCase().includes(val.toLowerCase())) {
        newList.push(word);
      }
    });
    this.list.next(newList);
  }

  guess() {
    this.data.guess(this.input.value);
  }

  countrySelect(country: string) {
    this.data.updateInputValue(country);
    this.showListBox = false;
  }

  ngOnDestroy() {
    this.valueChanges.unsubscribe();
  }
}