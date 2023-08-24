import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UserService } from './../user.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
})
export class CreateUserComponent {
  constructor(
    private userService: UserService,
    private message: NzMessageService,
    private router: Router
  ) {}

  async ngOnInit() {}

  async createUser(data: any) {
    data['avatar'] = '';
    data['thumbnail'] = 0;
    await this.userService
      .createUser(data)
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
      this.message.create('success', `Create user success`);
    } else {
      this.message.create('error', `Create user failed`);
    }
  }
}
