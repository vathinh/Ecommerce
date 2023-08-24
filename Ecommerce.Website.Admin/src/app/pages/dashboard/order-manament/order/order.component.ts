import { OrderService } from './order.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent {
  orders: any;
  constructor(
    private router: Router,
    private orderService: OrderService,
    private message: NzMessageService
  ) {}

  async ngOnInit() {
    await this.getOrders();
  }

  async getOrders() {
    await this.orderService
      .getOrders()
      .then((response) => {
        console.log((this.orders = response));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  createMessage(type: boolean): void {
    if (type === true) {
      this.message.create('success', `Delete brand success`);
    } else {
      this.message.create('error', `Delete brand failed`);
    }
  }

  navigateToDetail(id: any) {
    localStorage.setItem('orderId', id);
    this.router.navigate(['dashboard/order-manage/order-detail/' + id]);
  }
}
