import React from 'react'
import { ProductsCategory, ProductsResult } from './components';

const ProductListPage = () => {
  return (
	<div className="flex">
		<ProductsCategory />
		<ProductsResult />
	</div>
  );
};

export default ProductListPage;
