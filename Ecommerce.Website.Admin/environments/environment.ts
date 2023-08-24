// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  end_points: {
    user_service: 'http://localhost:8080/api/v1/user',
    auth_service: 'http://localhost:8080/api/v1/auth',
    product_service: 'http://localhost:8080/api/v1/product',
    category_service: 'http://localhost:8080/api/v1/category',
    brand_service: 'http://localhost:8080/api/v1/brand',
    order_service: 'http://localhost:8080/api/v1/order',
    image_service: 'http://localhost:8080/api/v1/image',
  },
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
