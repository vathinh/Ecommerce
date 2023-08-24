import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { BrandService } from './../brand.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-brand',
  templateUrl: './create-brand.component.html',
  styleUrls: ['./create-brand.component.scss'],
})
export class CreateBrandComponent implements OnInit {
  constructor(
    private brandService: BrandService,
    private message: NzMessageService,
    private router: Router
  ) {}

  async ngOnInit() {}

  async createBrand(data: any) {
    data['thumbnail'] = '';
    await this.brandService
      .createBrand(data)
      .then((response) => {
        this.createMessage(true);
        this.router.navigate(['dashboard/product-manage/brand']);
      })
      .catch((err) => {
        this.createMessage(false);
      });
  }

  createMessage(type: boolean): void {
    if (type === true) {
      this.message.create('success', `Create brand success`);
    } else {
      this.message.create('error', `Create brand failed`);
    }
  }
}
