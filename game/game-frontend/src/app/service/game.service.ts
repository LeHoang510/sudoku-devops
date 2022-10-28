import { Injectable } from '@angular/core';
import { Map } from '../models/map';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  
  constructor() {
    this.m = new Map();
    this.m.cas = [5,3,0,0,7,0,0,0,0,
                  6,0,0,1,9,5,0,0,0,
                  0,9,8,0,0,0,0,6,0,
                  8,0,0,0,6,0,0,0,3,
                  4,0,0,8,0,3,0,0,1,
                  7,0,0,0,2,0,0,0,6,
                  0,6,0,0,0,0,2,8,0,
                  0,0,0,4,1,9,0,0,5,
                  0,0,0,0,8,0,0,7,9]
  }
  private m: Map;

  public getMap(): Map {
    return this.m;
  }

  
}
