import React, { useEffect } from "react";
import * as Actions from 'actions';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ProductImages, ProductInfo, ProductRatings } from "./components";
import { CategoryHeader } from "components";
import { historyType } from "utils/common";


const ProductDetailPage = () => {
	const params = useParams();
	const dispatch = useDispatch();
	const { slug } = params;
  
	const loaded = useSelector(({ product }) => product.loaded);
	const product = useSelector(({ product }) => product.data);

	useEffect(() => {
		dispatch(Actions.getSingleProduct(slug));

		return () => {
			dispatch(Actions.clearProductState());
		}
	}, [dispatch, slug]);

	useEffect(() => {
		if(product) {
			dispatch(Actions.getProductStatistics(product.id));
			dispatch(Actions.postHistory({
				type: historyType.VIEW,
				productId: product.id
			}))
		}
	}, [dispatch, product])
  
	if (!loaded|| !product) return null;

	return (
		<React.Fragment>
			<CategoryHeader currentCate={product.category?.slug} />
			<div className="flex">
				<ProductImages />
				<ProductInfo />
			</div>
			<ProductRatings />
		</React.Fragment>
	);
}

export default ProductDetailPage;