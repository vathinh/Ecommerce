import { NzMessageService } from 'ng-zorro-antd/message';
import { OrderService } from './../order-manament/order/order.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzGridModule } from 'ng-zorro-antd/grid';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.scss'],
})
export class StatisticComponent implements OnInit {
  constructor(
    private router: Router,
    private orderService: OrderService,
    private message: NzMessageService
  ) {}

  orders: any;
  ordersSucess: any;
  ordersSucessTotal: number = 0;
  orderFailed: any;
  orderFailedTotal: number = 0;
  orderPending: any;
  orderPendingTotal: number = 0;
  productSold: any = [];
  productTotal: number = 0;

  async ngOnInit() {
    await this.getOrders();
  }

  async getOrders() {
    this.orderService.getOrders().then((response) => {
      this.orders = response;
      this.ordersSucess = this.orders.filter(
        (o: any) =>
          o.status == 'PAID' ||
          o.status == 'DELIVERING' ||
          o.status == 'FINISHED'
      );

      this.orderFailed = this.orders.filter(
        (o: any) => o.status == 'REJECTED' || o.status == 'CANCELLED'
      );

      this.orderPending = this.orders.filter((o: any) => o.status == 'PENDING');

      this.ordersSucess.forEach((os: any) => {
        this.ordersSucessTotal = this.ordersSucessTotal + os.total;
        os.products.forEach((p: any) => {
          this.productSold.push(p);
        });
      });

      this.productSold.forEach((ps: any) => {
        for (let i = 0; i < ps.quantity - 1; i++) {
          this.productSold.push(ps);
        }
      });

      this.productSold.map((p: any) => (p.quantity = 1));

      this.productSold.forEach((p: any) => {
        this.productTotal = this.productTotal + p.price;
      });

      this.orderFailed.forEach((os: any) => {
        this.orderFailedTotal = this.orderFailedTotal + os.total;
      });

      this.orderPending.forEach((os: any) => {
        this.orderPendingTotal = this.orderPendingTotal + os.total;
      });
    });
  }
}
