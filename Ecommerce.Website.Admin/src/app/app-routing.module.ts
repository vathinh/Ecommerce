import { UnauthorizedComponent } from './pages/unauthorized/unauthorized.component';
import { StatisticComponent } from './pages/dashboard/statistic/statistic.component';
import { OrderDetailComponent } from './pages/dashboard/order-manament/order/order-detail/order-detail.component';
import { CreateUserComponent } from './pages/dashboard/user-manament/user/create-user/create-user.component';
import { UserDetailComponent } from './pages/dashboard/user-manament/user/user-detail/user-detail.component';
import { CreateCategoryComponent } from './pages/dashboard/productmanagement/category/create-category/create-category.component';
import { CreateBrandComponent } from './pages/dashboard/productmanagement/brand/create-brand/create-brand.component';
import { CreateProductComponent } from './pages/dashboard/productmanagement/product/create-product/create-product.component';
import { ProductDetailComponent } from './pages/dashboard/productmanagement/product/product-detail/product-detail.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { WelcomeComponent } from './pages/dashboard/welcome/welcome.component';
import { AuthorizeComponent } from './pages/authorize/authorize.component';
import { AuthGuard } from './auth/auth.guard';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { UserComponent } from './pages/dashboard/user-manament/user/user.component';
import { OrderComponent } from './pages/dashboard/order-manament/order/order.component';
import { CategoryComponent } from './pages/dashboard/productmanagement/category/category.component';
import { BrandComponent } from './pages/dashboard/productmanagement/brand/brand.component';
import { ProductComponent } from './pages/dashboard/productmanagement/product/product.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { combineLatest } from 'rxjs';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/dashboard/welcome' },
  { path: 'auth', component: AuthorizeComponent },
  {
    path: 'unauthorized',
    component: UnauthorizedComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'welcome',
        component: WelcomeComponent,
      },
      {
        path: 'product-manage',
        children: [
          {
            path: 'product',
            component: ProductComponent,
          },
          {
            path: 'product-detail/:id',
            component: ProductDetailComponent,
          },
          {
            path: 'create-product',
            component: CreateProductComponent,
          },
          {
            path: 'category',
            component: CategoryComponent,
          },
          {
            path: 'create-category',
            component: CreateCategoryComponent,
          },
          {
            path: 'brand',
            component: BrandComponent,
          },
          {
            path: 'create-brand',
            component: CreateBrandComponent,
          },
        ],
      },
      {
        path: 'order-manage',
        children: [
          {
            path: 'order',
            component: OrderComponent,
          },
          {
            path: 'order-detail/:id',
            component: OrderDetailComponent,
          },
        ],
      },
      {
        path: 'user-manage',
        children: [
          {
            path: 'user',
            component: UserComponent,
          },
          {
            path: 'user-detail/:id',
            component: UserDetailComponent,
          },
          { path: 'create-user', component: CreateUserComponent },
        ],
      },
      {
        path: 'statistic',
        component: StatisticComponent,
      },
    ],
  },
  {
    path: '**',
    pathMatch: 'full',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
