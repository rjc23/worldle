import { Injectable } from '@angular/core';

let m_w = 123456789;
let m_z = 987654321;
let mask = 0xffffffff;

@Injectable({
  providedIn: 'root'
})
export class RandomNumService {

  constructor() { }

  // Takes any integer
  private seed(i: number) {
      m_w = (123456789 + i) & mask;
      m_z = (987654321 - i) & mask;
  }

  randomNumberGenerator(arrayLength: number) {
    let randomNum = Math.round(Math.random()*arrayLength);
    return randomNum;
  }

  randomNumGeneratorToday(arrayLength: number, seed: number) {
    // Get dates for last
    // console.log(arrayLength);
    let pastDates: number[] = [];

    const dateRightNow = new Date();
    const day = dateRightNow.getDate();
    const month = dateRightNow.getMonth();
    const year = dateRightNow.getFullYear();

    let varDay = day;
    let varMonth = month;
    let varYear = year;

    let date = new Date(varYear, varMonth, varDay).getTime();
    let randomNum = Math.round(this.random(date/seed)*arrayLength);
    return randomNum;

    //Future interation
    // for(let i = 0; i < 50; i++) {

    //   let date = new Date(varYear, varMonth, varDay).getTime();

    //   let dayBefore = varDay;
    //   let monthBefore = varMonth;
    //   let yearBefore = varYear;

    //   let randomNum = Math.round(this.random(date)*arrayLength);

    //   if(pastDates.includes(randomNum)) {
    //     console.log("repeat");
    //   }

    //   pastDates.push(randomNum);
    //   console.log(pastDates);

    //   varDay = this.getPreviousDay(dayBefore, monthBefore, yearBefore);
    //   varMonth = this.getPreviousMonth(dayBefore, monthBefore);
    //   varYear = this.getPreviousYear(dayBefore, monthBefore, yearBefore);
    // }
  }

  private random(num: number) : number {
      this.seed(num);
      m_z = (36969 * (m_z & 65535) + (m_z >> 16)) & mask;
      m_w = (18000 * (m_w & 65535) + (m_w >> 16)) & mask;
      var result = ((m_z << 16) + (m_w & 65535)) >>> 0;
      result /= 4294967296;
      return result;
  }

  private getPreviousDay(day: number, month: number, year: number) : number {
    const months31 = [0, 1, 3, 5, 7, 8, 10, 12];
    const months30 = [4, 6, 9, 11];

    if(day !== 1) {
      return day-1;
    } else {
      //February
      if(month === 2) {
        if(year % 4 === 0) {
          return 29;
        } else {
          return 28;
        }
      } else if(months31.includes(month)) {
        return 31;
      } else if(months30.includes(month)) {
        return 30;
      }
      return 28;
    }
  }

  private getPreviousMonth(day: number, month: number) {
    if(day === 1) {
      if(month === 0) {
        return 11;
      } else {
        return month-1;
      }
    } else {
      return month;
    }
  }

  private getPreviousYear(day: number, month: number, year: number) {
    if(day === 1 && month === 0) {
      return year-1;
    } else {
      return year;
    }
  }
}
