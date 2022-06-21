import { Injectable } from '@angular/core';
import { countries } from '../data/countries';
import { Country } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  constructor() { }

  getCountries() : Country[] {
    return countries;
  }

  findCountry(country: string) : Country | null {
    let c = countries.filter(val => val.name.toLowerCase() === country.toLowerCase());
    if(c === []) {
      return null;
    }
    return c[0];
  }

  calcPercentage(dist: number) {
    return Math.floor(100-((dist*100)/21000));
  }

  calcSquares(percent: number) : string[] {
    let squares: string[] = [];
    if(percent === 100) {
      squares = ["green", "green", "green", "green", "green"]
    } else if(percent >= 90 && percent < 100) {
      squares = ["green", "green", "green", "green", "yellow"]
    } else if(percent >= 80 && percent < 90) {
      squares = ["green", "green", "green", "green", "grey"]
    } else if(percent >= 70 && percent < 80) {
      squares = ["green", "green", "green", "yellow", "grey"]
    } else if(percent >= 60 && percent < 70) {
      squares = ["green", "green", "green", "grey", "grey"]
    } else if(percent >= 50 && percent < 60) {
      squares = ["green", "green", "yellow", "grey", "grey"]
    } else if(percent >= 40 && percent < 50) {
      squares = ["green", "green", "grey", "grey", "grey"]
    } else if(percent >= 30 && percent < 40) {
      squares = ["green", "yellow", "grey", "grey", "grey"]
    } else if(percent >= 20 && percent < 30) {
      squares = ["green", "grey", "grey", "grey", "grey"]
    } else if(percent < 20) {
      squares = ["yellow", "grey", "grey", "grey", "grey"]
    } 
    return squares;
  }

  getArrow(bearing: number, dist: number) : string { 
    switch(true) {
      case bearing === 0 && dist === 0:
        return "🎉";
      case bearing < 22.5:
        return "⬇️"
      case bearing < 67.5:
        return "↙️"
      case bearing < 112.5:
        return "⬅️"
      case bearing < 157.5:
        return "↖️"
      case bearing < 202.5:
        return "⬆️"
      case bearing < 247.5:
        return "↗️"
      case bearing < 292.5:
        return "➡️"
      case bearing < 337.5:
        return "↘️"
      default:
        return "⬇️"
    }
  }

  calcDistance(lat1: number, long1: number, lat2: number, long2:number) : number {
    const R = 6371; // km
    const dLat = this.toRad(lat2-lat1);
    const dLon = this.toRad(long2-long1);
    const latitude = this.toRad(lat1);
    const longitude = this.toRad(lat2);

    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(latitude) * Math.cos(longitude); 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    const d = R * c;
    return Math.round(d);
  }

  calcBearing(lat1: number, long1: number, lat2: number, long2: number){
    const startLat = this.toRad(lat1);
    const startLong = this.toRad(long1);
    const endLat = this.toRad(lat2);
    const endLong = this.toRad(long2);
  
    let dLong = endLong - startLong;
  
    const dPhi = Math.log(Math.tan(endLat/2.0+Math.PI/4.0)/Math.tan(startLat/2.0+Math.PI/4.0));
    if (Math.abs(dLong) > Math.PI){
      if (dLong > 0.0)
         dLong = -(2.0 * Math.PI - dLong);
      else
         dLong = (2.0 * Math.PI + dLong);
    }
  
    return Math.round((this.toDegs(Math.atan2(dLong, dPhi)) + 360.0) % 360.0);
  }
  private toRad(val: number) {
    return val * Math.PI / 180;
  }
  private toDegs(radians: number) {
    return radians * 180 / Math.PI;
  }
}
