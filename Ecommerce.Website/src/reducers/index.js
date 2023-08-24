import authSlice from './auth-reducer';
import cartSlice from './cart-reducer';
import categorySlice from './category-reducer';
import productSlice from './product-reducer';

export const reducerSlice = {
	auth     : authSlice,
	cart     : cartSlice,
	category : categorySlice, 
	product  : productSlice
}
