import { NzMessageService } from 'ng-zorro-antd/message';
import { BrandService } from './brand.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss'],
})
export class BrandComponent implements OnInit {
  brands: any;
  constructor(
    private router: Router,
    private brandService: BrandService,
    private message: NzMessageService
  ) {}

  async ngOnInit() {
    await this.getBrands();
  }

  async getBrands() {
    await this.brandService
      .getBrands()
      .then((response) => {
        console.log((this.brands = response));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async deleteBrand(id: any) {
    await this.brandService
      .delete(id)
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
}
