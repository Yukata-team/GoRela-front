import { HttpService } from './../../services/http.service';
import { Router } from '@angular/router';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.scss'],
})
export class TopComponent implements OnInit {
  constructor(
    private userService: UserService,
    private router: Router,
    private http: HttpService
  ) {}

  ngOnInit(): void {}

  guest(){
    this.userService.login({email: "guest@gmail.com",password: "guest"}).subscribe((res) => {
      console.log(res);
      sessionStorage.setItem('current_user_id', res.user_id);
      localStorage.setItem('access_token', res.token);
      this.http.updateToken(localStorage.getItem('access_token'));
      this.router.navigate(['list']);
    });
  }

}
