import { HttpClient } from '@angular/common/http';
import { Map } from './map';
import { Game } from './game';


describe('TungTest', () => {

    let m1: Map;
    let m2: Map;
    let http: HttpClient

    beforeEach(() => {
        m1 = new Map();
        m2 = new Map();
    });

    it('should create an instance', () => {
        expect(new Game(m1,m2,http)).toBeTruthy();
    });
});