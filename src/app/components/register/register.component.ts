import { HttpService } from './../../services/http.service';
import { Router } from '@angular/router';
import { UserService } from './../../services/user.service';
import { User } from './../../models/index';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
  ValidationErrors,
  AbstractControl,
  FormControl,
} from '@angular/forms';
import { CustomValidators } from 'ng2-validation';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);
  password_confirm = new FormControl('', [
    Validators.required,
    CustomValidators.equalTo(this.password),
  ]);

  registerForm = this.fb.group({
    email: this.email,
    password: this.password,
    password_confirm: this.password_confirm,
  });

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private http: HttpService
  ) {}

  ngOnInit(): void {}

  add() {
    if (!this.registerForm.invalid) {
      this.userService.addUser(this.registerForm.value).subscribe((res) => {
        console.log(res);
        localStorage.setItem('access_token', res.token);
        this.http.updateToken(localStorage.getItem('access_token'));
        this.router.navigate(['list']);
      });
    }
  }
}
