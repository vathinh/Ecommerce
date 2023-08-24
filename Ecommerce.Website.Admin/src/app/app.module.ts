import { NzMessageModule } from 'ng-zorro-antd/message';
import { CreateProductComponent } from './pages/dashboard/productmanagement/product/create-product/create-product.component';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconsProviderModule } from './icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { ProductComponent } from './pages/dashboard/productmanagement/product/product.component';
import { BrandComponent } from './pages/dashboard/productmanagement/brand/brand.component';
import { CategoryComponent } from './pages/dashboard/productmanagement/category/category.component';
import { OrderComponent } from './pages/dashboard/order-manament/order/order.component';
import { UserComponent } from './pages/dashboard/user-manament/user/user.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ProductDetailComponent } from './pages/dashboard/productmanagement/product/product-detail/product-detail.component';
import { AuthorizeComponent } from './pages/authorize/authorize.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { LightboxModule } from 'ngx-lightbox';
import { CreateBrandComponent } from './pages/dashboard/productmanagement/brand/create-brand/create-brand.component';
import { CreateCategoryComponent } from './pages/dashboard/productmanagement/category/create-category/create-category.component';
import { CreateUserComponent } from './pages/dashboard/user-manament/user/create-user/create-user.component';
import { UserDetailComponent } from './pages/dashboard/user-manament/user/user-detail/user-detail.component';
import { OrderDetailComponent } from './pages/dashboard/order-manament/order/order-detail/order-detail.component';
import { StatisticComponent } from './pages/dashboard/statistic/statistic.component';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { UnauthorizedComponent } from './pages/unauthorized/unauthorized.component';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    BrandComponent,
    CategoryComponent,
    OrderComponent,
    UserComponent,
    NotFoundComponent,
    ProductDetailComponent,
    AuthorizeComponent,
    DashboardComponent,
    CreateProductComponent,
    CreateBrandComponent,
    CreateCategoryComponent,
    CreateUserComponent,
    UserDetailComponent,
    OrderDetailComponent,
    StatisticComponent,
    UnauthorizedComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    NzDropDownModule,
    NzAlertModule,
    NzTableModule,
    NzDividerModule,
    NzImageModule,
    NzMessageModule,
    NzStatisticModule,
    NzGridModule,
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent],
})
export class AppModule {}
