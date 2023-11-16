import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { environment } from 'environments/environment';
import { BrandService } from './../../brand/brand.service';
import { CategoryService } from './../../category/category.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.scss'],
})
export class CategoryDetailComponent implements OnInit {
  categoryDetail: any
  categoryId: any;
  parentCategories: any;

  constructor(
    private categoryService: CategoryService,
    private message: NzMessageService,
    private router: Router,
    private route: ActivatedRoute
  ) {}


  async ngOnInit() {
    this.categoryId = this.route.snapshot.paramMap.get('id');
    this.getCategory(this.categoryId);
    this.getParentCategories();
  }

  async updateCategory(data: any) {
    await this.categoryService
      .updateCategory(data, this.categoryId)
      .then((response) => {
        this.createMessage(true);
        this.router.navigate(['dashboard/product-manage/category']);
      })
      .catch((err) => {
        this.createMessage(false);
      });
  }

  async getCategory(id: any) {
    await this.categoryService
      .getCategory(id)
      .then((response) => {
        this.categoryDetail = response
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async getParentCategories() {
    await this.categoryService
      .getCategories()
      .then((response) => {
        this.parentCategories = response;
        this.parentCategories = this.parentCategories.filter(
          (p: any) => p.parent == ''
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  createMessage(type: boolean): void {
    if (type === true) {
      this.message.create('success', `Update category success`);
    } else {
      this.message.create('error', `Update category failed`);
    }
  }
}
