import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { environment } from 'environments/environment';
import { BrandService } from './../../brand/brand.service';
import { CategoryService } from './../../category/category.service';
import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  private _apiImageEndpoint: string = `${environment.end_points.image_service}`;

  productSlug: any;
  productDetail: any;
  editable: boolean = false;

  categories: any;
  brands: any;

  uploaded: boolean = false;
  countUploaded: number = 0;

  tempImages: any = [];

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private brandService: BrandService,
    private message: NzMessageService,
    private router: Router
  ) {}

  async ngOnInit() {
    this.productSlug = localStorage.getItem('slug');
    await this.getProduct(this.productSlug);
    this.categories = await this.getCategories();
    this.categories.filter((c: any) => c.parent != '');
    this.brands = await this.getBrands();
  }

  async getCategories() {
    return this.categoryService
      .getCategories()
      .then()
      .catch((err) => {
        console.log(err);
      });
  }

  async getBrands() {
    return this.brandService
      .getBrands()
      .then()
      .catch((err) => {
        console.log(err);
      });
  }

  async getProduct(slug: any) {
    await this.productService.getProduct(slug).then((response) => {
      this.productDetail = response;
      this.productDetail['imageUrls'] = [];
      this.productDetail['thumbnailUrl'] = '';

      if (
        this.productDetail.description != null ||
        this.productDetail.description != undefined
      ) {
        this.productDetail.description = this.productDetail.description.replace(
          '</div>',
          ''
        );
        this.productDetail.description = this.productDetail.description.replace(
          '<div>',
          ''
        );
      }

      if (
        this.productDetail.thumbnail != null ||
        this.productDetail.thumbnail != undefined
      ) {
        this.productDetail.thumbnailUrl = `${this._apiImageEndpoint}/${this.productDetail.thumbnail}`;
      }

      if (
        this.productDetail.images != null ||
        this.productDetail.images != undefined ||
        this.productDetail.images.length != 0
      ) {
      }

      this.productDetail.images.forEach((image: any) => {
        this.productDetail.imageUrls.push(`${this._apiImageEndpoint}/${image}`);
      });
    });
    console.log(this.productDetail);
  }

  async updateProduct(updateData: any) {
    debugger;
    updateData['thumbnail'] = '';
    updateData['images'] = [];

    updateData.thumbnail = this.productDetail.thumbnail;
    updateData.images = this.productDetail.images;

    await this.productService
      .updateProduct(updateData, this.productSlug)
      .then(async (response) => {
        this.createMessage(1);
        await new Promise((r) => setTimeout(r, 2000));
        this.router.navigate(['dashboard/product-manage/product']);
      })
      .catch((err) => {
        this.createMessage(2);
      });
  }

  async deleteThumbnail() {
    this.productDetail.thumbnail = null;
    this.productDetail.thumbnailUrl = null;
  }

  async deleteImage(image: any) {
    this.productDetail.imageUrls = this.productDetail.imageUrls.filter(
      (i: any) => i != image
    );

    image = image.replace(`${this._apiImageEndpoint}/`, '');

    this.productDetail.images = this.productDetail.images.filter(
      (i: any) => i != image
    );
  }

  async previewImage(event: any) {
    let reader = new FileReader();

    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      this.tempImages.push(file);
      await reader.readAsDataURL(file);
      reader.onload = () => {
        this.productDetail.imageUrls.push(reader.result);
      };
    }
  }

  async updateThumbnail() {
    this.tempImages.forEach(async (image: any) => {
      this.productDetail.images.push(await this.uploadImage(image));
      this.countUploaded++;
    });
    this.uploaded = true;
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

  createMessage(type: number): void {
    if (type === 1) {
      this.message.create('success', `Update product success`);
    } else if (type === 2) {
      this.message.create('error', `Update product failed`);
    } else if (type === 3) {
      this.message.create('success', `Upload success`);
    } else if (type === 4) {
      this.message.create('error', `Upload failed`);
    }
  }
}
