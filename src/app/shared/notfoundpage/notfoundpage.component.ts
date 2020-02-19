import { Component, OnInit } from '@angular/core';

declare function initPlugins();

@Component({
  selector: 'app-notfoundpage',
  templateUrl: './notfoundpage.component.html',
  styles: []
})
export class NotFoundPageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    initPlugins();
    
  }

}
