import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit { // the sodoku title

  title = 'Sudoku';
  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  
  // For Returning to the menu when clicked
  navigationMenu(){
    this.router.navigateByUrl('/menu');
  }
}
