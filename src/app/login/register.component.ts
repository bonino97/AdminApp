import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor( public router: Router ) { }

  ngOnInit() {
  }

}
