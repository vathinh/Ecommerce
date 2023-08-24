import { UserService } from './user.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  users: any;
  constructor(
    private router: Router,
    private userService: UserService,
    private message: NzMessageService
  ) {}

  async ngOnInit() {
    await this.getUsers();
  }

  async getUsers() {
    await this.userService
      .getUsers()
      .then((response) => {
        console.log((this.users = response));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async deleteBrand(id: any) {
    await this.userService
      .deleteUser(id)
      .then((response) => {
        this.createMessage(true);
        location.reload();
      })
      .catch((error) => {
        this.createMessage(false);
        console.log(error);
      });
  }

  createMessage(type: boolean): void {
    if (type === true) {
      this.message.create('success', `Delete brand success`);
    } else {
      this.message.create('error', `Delete brand failed`);
    }
  }

  gotoDetail(id: any) {
    localStorage.setItem('guestId', id),
      this.router.navigate(['/dashboard/user-manage/user-detail/' + id]);
  }
}
