import { Component, OnInit } from '@angular/core';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor() {}
  isCollapsed = false;
  userInfo: any;

  async ngOnInit() {
    this.getUserInfo();
  }

  getUserInfo() {
    this.userInfo = sessionStorage.getItem('userInfo');
    this.userInfo = JSON.parse(this.userInfo);
  }

  logOut() {
    localStorage.clear();
    location.reload();
  }
}
