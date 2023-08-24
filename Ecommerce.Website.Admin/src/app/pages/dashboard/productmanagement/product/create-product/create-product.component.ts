import { Router } from '@angular/router';
import { ProductService } from './../product.service';
import { BrandService } from './../../brand/brand.service';
import { CategoryService } from './../../category/category.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NzMessageModule, NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss'],
})
export class CreateProductComponent implements OnInit {
  public catogories: any;
  public brands: any;
  public thumbnailUrl: any;
  public imageUrl: any;
  public thumbnailFile: any;
  public imageUrls: any;
  public thumnailUploaded: boolean = false;
  public imageUploaded: boolean = false;
  public uploadThumbnailSuccess: number = 0;
  public uploadImageSuccess: number = 0;
  public imageFile: any;
  public thumbnailId: any;
  public imageIds: any = [];

  constructor(
    private categoryService: CategoryService,
    private brandService: BrandService,
    private productService: ProductService,
    private message: NzMessageService,
    private router: Router
  ) {}

  async ngOnInit() {
    await this.getCategories();
    await this.getBrands();
  }

  async getBrands() {
    await this.brandService.getBrands().then((response) => {
      this.brands = response;
    });
  }

  async getCategories() {
    await this.categoryService.getCategories().then((response) => {
      this.catogories = response;
      this.catogories = this.catogories.filter((c: any) => c.parent != '');
    });
  }

  async uploadImage(file: any) {
    let data = new FormData();
    let imageId: any;
    data.append('image', file);
    imageId = await this.productService
      .uploadImage(data)
      .then()
      .catch((err) => {
        console.log('Upload false' + err.status);
      });
    return imageId[0];
  }

  async previewThumbnail(event: any) {
    let reader = new FileReader();

    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      await reader.readAsDataURL(file);
      reader.onload = () => {
        this.thumbnailUrl = reader.result;
        this.thumbnailFile = event.target.files[0];
        this.thumnailUploaded = true;
      };
    }
  }

  async previewImage(event: any) {
    this.uploadImageSuccess = 0;

    let reader = new FileReader();

    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      await reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageUrl = reader.result;
        this.imageFile = event.target.files[0];
        this.imageUploaded = true;
      };
    }
  }

  async uploadThumbnail() {
    let result: any = await this.uploadImage(this.thumbnailFile)
      .then((response) => {
        this.uploadThumbnailSuccess = 1;
        this.thumbnailId = response;
      })
      .catch((err) => {
        this.uploadThumbnailSuccess = -1;
      });
  }

  async uploadImages() {
    await this.uploadImage(this.imageFile)
      .then((response) => {
        this.imageIds.push(response);

        this.uploadImageSuccess = 1;
      })
      .catch((err) => {
        this.uploadImageSuccess = -1;
      });
  }

  createMessage(type: boolean): void {
    if (type === true) {
      this.message.create('success', `Create product success`);
    } else {
      this.message.create(
        'error',
        `Create product failed, please fill all the inputs`
      );
    }
  }

  async createProduct(data: any) {
    data['thumbnail'] = this.thumbnailId;
    data['images'] = this.imageIds;
    if (data.description.includes('div') == false) {
      data.description = '<div>' + data.description + '</div>';
    }

    await this.productService
      .createProduct(data)
      .then((response) => {
        this.createMessage(true);
        setTimeout(() => {}, 2000);
        this.router.navigate(['dashboard/product-manage/product']);
      })
      .catch((err) => {
        this.createMessage(false);
      });

    console.log(data);
    // this.productService.createProduct()
  }
}
