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
  user: User;
  // registerForm = this.fb.group({
  //   email: ['', Validators.required, Validators.email],
  //   password: ['', Validators.required],
  //   passwordconfirm: ['', Validators.required],
  // });

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

  users: User[];

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

  log() {
    console.log(this.registerForm.value.email);
    console.log(this.registerForm.value.password);
    console.log(this.registerForm.value.passwordconfirm);
  }

  add() {
    let _isExist = this.userService.isExist(
      this.users,
      this.registerForm.value.email
    );

    console.log(this.registerForm.value);
    if (!this.registerForm.invalid && !_isExist) {
      this.userService.addUser(this.registerForm.value).subscribe((user) => {
        this.user = user;
        console.log('add!!!!!');
        console.log(this.user);
        this.log();
      });

      this.router.navigate(['list']);
    } else {
      console.log('no!!!!');
    }
  }

  // isExist(newEmail: string, password?: string): boolean {
  //   return this.users.some((user) => user.email === newEmail);
  // }
}
