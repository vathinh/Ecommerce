import { Router } from '@angular/router';
import { CategoryService } from './../category.service';
import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss'],
})
export class CreateCategoryComponent implements OnInit {
  constructor(
    private categoryService: CategoryService,
    private message: NzMessageService,
    private router: Router
  ) {}

  parentCategories: any;

  async ngOnInit() {
    this.getParentCategories();
  }

  async createCategory(data: any) {
    data['thumbnail'] = '';
    await this.categoryService
      .createCategory(data)
      .then((response) => {
        this.createMessage(true);
        this.router.navigate(['dashboard/product-manage/category']);
      })
      .catch((err) => {
        this.createMessage(false);
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
      this.message.create('success', `Create category success`);
    } else {
      this.message.create('error', `Create category failed`);
    }
  }
}
