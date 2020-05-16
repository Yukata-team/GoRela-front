import { HttpService } from './../../services/http.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from './../../services/user.service';
import { User } from './../../models/index';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private http: HttpService
  ) {}

  ngOnInit(): void {}

  login() {
    if (!this.loginForm.invalid) {
      this.userService.login(this.loginForm.value).subscribe((res) => {
        console.log(res);
        res['id'] = 11;
        localStorage.setItem('current_user_id', res.id);
        localStorage.setItem('access_token', res.token);
        this.http.updateToken(localStorage.getItem('access_token'));
        console.log(localStorage.getItem('access_token'));
        this.router.navigate(['list']);
      });
    }
  }
}
