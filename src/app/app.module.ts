import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ImageComponent } from './components/image/image.component';
import { GuessesComponent } from './components/guesses/guesses.component';
import { GuessComponent } from './components/guesses/guess/guess.component';
import { InputComponent } from './components/input/input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CountUpModule } from 'ngx-countup';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ImageComponent,
    GuessesComponent,
    GuessComponent,
    InputComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    CountUpModule
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
