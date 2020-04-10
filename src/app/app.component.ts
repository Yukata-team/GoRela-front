import {
  Router,
  NavigationStart,
  NavigationEnd,
  RouterEvent,
} from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isMenuHidden: boolean;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart && event.url === '/') {
        this.isMenuHidden = true;
      } else if (event instanceof NavigationStart && event.url === '/login') {
        this.isMenuHidden = true;
      } else if (
        event instanceof NavigationStart &&
        event.url === '/register'
      ) {
        this.isMenuHidden = true;
      } else if (event instanceof NavigationStart && event.url) {
        this.isMenuHidden = false;
      }
    });
  }
}
