import { UserAccount } from './../../models/users/user-account.model';
import { UserAccountInfo } from '../../models/users/user-account-info.model';
import { AuthService } from '../../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Axios } from 'axios';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authorize',
  templateUrl: './authorize.component.html',
  styleUrls: ['./authorize.component.scss'],
})
export class AuthorizeComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  errorCode: number = 0;

  async ngOnInit() {}

  async signIn(formValue: any) {
    let userAccount = new UserAccount('', '');
    let result: any = null;
    this.errorCode = 0; //reset the flag each submit time

    userAccount.setUsername(formValue.username);
    userAccount.setPassword(formValue.password);

    await this.authService
      .signIn(userAccount)
      .then((response) => {
        result = response;
      })
      .catch((err) => {
        this.errorCode = err.status;
      });
    if (this.errorCode != 0) {
    } else {
      localStorage.setItem('authorizeToken', result.token);
      localStorage.setItem('userId', result.id);
      this.router.navigate(['dashboard/welcome']);
    }
  }
}
