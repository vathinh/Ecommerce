import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { BrandService } from '../brand.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-brand-detail',
  templateUrl: './brand-detail.component.html',
  styleUrls: ['./brand-detail.component.scss'],
})
export class BrandDetailComponent implements OnInit {
  brandDetail: any
  brandId: any;

  constructor(
    private brandService: BrandService,
    private message: NzMessageService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  async ngOnInit() {
    this.brandId = this.route.snapshot.paramMap.get('id');
    this.getBrand(this.brandId);
  }

  async updateBrand(data: any) {
    await this.brandService
      .updateBrand(data, this.brandId)
      .then((response) => {
        this.createMessage(true);
        this.router.navigate(['dashboard/product-manage/brand']);
      })
      .catch((err) => {
        this.createMessage(false);
      });
  }

  async getBrand(id: any) {
    await this.brandService
      .getBrand(id)
      .then((response) => {
        this.brandDetail = response
      })
      .catch((err) => {
        console.log(err);
      });
  }

  createMessage(type: boolean): void {
    if (type === true) {
      this.message.create('success', `Update brand success`);
    } else {
      this.message.create('error', `Update brand failed`);
    }
  }
}
