import { environment } from 'environments/environment';
import { Router } from '@angular/router';
import { NzMessageModule, NzMessageService } from 'ng-zorro-antd/message';
import { OrderService } from './../order.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss'],
})
export class OrderDetailComponent implements OnInit {
  orderStatus = [
    'PENDING',
    'PAID',
    'REJECTED',
    'DELIVERING',
    'CANCELLED',
    'FINISHED',
  ];
  async ngOnInit() {
    await this.getOrder();
  }

  order: any;
  private _apiImageEndpoint: string = `${environment.end_points.image_service}`;

  constructor(
    private orderService: OrderService,
    private router: Router,
    private message: NzMessageService
  ) {}

  async getOrder() {
    this.orderService
      .getOrder(localStorage.getItem('orderId'))
      .then((response) => {
        let count = 0;
        this.order = response;
        localStorage.setItem('updateOrder', JSON.stringify(this.order));
        this.order.products.forEach((product: any) => {
          this.order.products[
            count
          ].thumbnail = `${this._apiImageEndpoint}/${product.thumbnail}`;
          count++;
        });
      });
  }

  async updateOrderStatus(formData: any) {
    let temp: any = localStorage.getItem('updateOrder');

    let orderUpdateModel: any = JSON.parse(temp);
    orderUpdateModel.status = formData.status;

    this.orderService
      .updateProduct(orderUpdateModel)
      .then((response) => {
        this.createMessage(true);
        this.router.navigate(['dashboard/order-manage/order']);
      })
      .catch((err) => {
        this.createMessage(false);
      });
  }

  createMessage(type: boolean): void {
    if (type === true) {
      this.message.create('success', `Update status success`);
    } else {
      this.message.create('error', `Update status failed`);
    }
  }
}
