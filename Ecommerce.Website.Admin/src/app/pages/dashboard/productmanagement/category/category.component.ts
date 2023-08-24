import { NzMessageService } from 'ng-zorro-antd/message';
import { CategoryService } from './category.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  categories: any;
  categoriesChildren: any;
  categoriesParent: any;
  categoryId: any;
  constructor(
    private Router: Router,
    private categoryService: CategoryService,
    private message: NzMessageService,
    private router: Router
  ) {}

  async ngOnInit() {
    await this.getCategories();
  }

  async getCategories() {
    let count = 0;
    await this.categoryService
      .getCategories()
      .then((response) => {
        this.categories = response;
        this.categoriesChildren = this.categories.filter(
          (c: any) => c.parent != ''
        );
        this.categoriesParent = this.categories.filter(
          (c: any) => c.parent == ''
        );

        this.categoriesChildren.forEach((i: any) => {
          this.categoriesParent.forEach((j: any) => {
            debugger;
            if (i.parent == j.id) {
              i['parentname'] = j.name;
            }
          });

          console.log(this.categoriesChildren);
        });
      })

      .catch((err) => {
        console.log(err);
      });
  }

  async deleteBrand(id: any) {
    await this.categoryService
      .deleteCategory(id)
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
      this.message.create('success', `Delete category success`);
    } else {
      this.message.create('error', `Delete category failed`);
    }
  }

  navigateToDetail(id: any) {
    localStorage.setItem('categoryId', id);
    this.router.navigate(['dashboard/product-manage/category-detail/' + id]);
  }
}
