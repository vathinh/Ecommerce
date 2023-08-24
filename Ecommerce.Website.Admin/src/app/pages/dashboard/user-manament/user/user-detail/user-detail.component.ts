import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent implements OnInit {
  constructor(
    private userService: UserService,
    private message: NzMessageService,
    private router: Router
  ) {}

  user: any;

  async ngOnInit() {
    await this.getUser();
    console.log(this.user);
  }

  async getUser() {
    await this.userService
      .getUser(localStorage.getItem('guestId'))
      .then((response) => {
        this.user = response;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  createMessage(type: boolean): void {
    if (type === true) {
      this.message.create('success', `Create user success`);
    } else {
      this.message.create('error', `Create user failed`);
    }
  }
}
