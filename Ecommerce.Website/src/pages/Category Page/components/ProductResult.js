import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from 'actions';
import { Link } from 'react-router-dom';
import { numberWithCommas } from 'utils/convert';
import ProductCard from 'components/ProductCard';

const ProductResult = ({ slug }) => {
	const dispatch = useDispatch();

	const loaded = useSelector(({ product }) => product.loaded);
	const products = useSelector(({ product }) => product.list);

	useEffect(() => {
		if(slug) {
			dispatch(Actions.getProductsList(`?c=${slug}`));
		}
		return () => {
			dispatch(Actions.clearProductState());
		}
	}, [dispatch, slug]);

  return (
	<div>
		{loaded ? (
			Array.isArray(products) && (
			<>
				<div className='font-semibold'>{products?.length} Result(s)</div>
				<div className='border-b border-[#ccc] mb-4 mt-2'></div>
				<div className='grid grid-cols-4 gap-4'>
					{products.map((item, index) => (
						<ProductCard data={item} key={index} className="mx-auto" />
					))}
				</div>
			</>
			)
		) : (
			<div>Loading...</div>
		)}
	</div>
  )
}

export default ProductResult;