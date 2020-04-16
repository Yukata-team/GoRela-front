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
  users: User[];
  loginForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe((users: User[]) => {
      this.users = users;
    });
  }

  login() {
    let _isExist = this.userService.isExist(
      this.users,
      this.loginForm.value.email,
      this.loginForm.value.password
    );
    if (_isExist) {
      this.router.navigate(['list']);
    }
  }
}
