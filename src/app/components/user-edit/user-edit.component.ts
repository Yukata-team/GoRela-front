import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  public user_id: number;
  public user;
  public user_name: string;
  public user_introduction: string;

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.user_id = params['id'];
    });

    this.userService.getEditUser(this.user_id).subscribe(
      (res) => {
        this.user = res;
        this.user_name = res.name;
        this.user_introduction = res.introduction;
      }
    )
  }

  edit(){
    this.user.name = this.user_name;
    this.user.introduction = this.user_introduction;
    this.userService.editUser(this.user).subscribe(
      (res) => this.router.navigate(['account'])
    )
  }

}
