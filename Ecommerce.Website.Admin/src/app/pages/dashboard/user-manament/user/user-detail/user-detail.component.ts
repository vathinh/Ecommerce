import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent implements OnInit {
  userId: any;

  constructor(
    private userService: UserService,
    private message: NzMessageService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  user: any;

  async ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('id');
    await this.getUser(this.userId);
  }

  async getUser(id: any) {
    await this.userService
      .getUser(id)
      .then((response) => {
        this.user = response;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async updateUser(data: any) {
    await this.userService
      .updateUser(data, this.userId)
      .then((response) => {
        this.createMessage(true);
        this.router.navigate(['dashboard/user-manage/user']);
      })
      .catch((err) => {
        this.createMessage(false);
      });
  }

  createMessage(type: boolean): void {
    if (type === true) {
      this.message.create('success', `Update user success`);
    } else {
      this.message.create('error', `Update user failed`);
    }
  }
}
