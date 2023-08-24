import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import * as Actions from "actions";
import { numberWithCommas } from "utils/convert";

const ProductsResult = () => {
	const dispatch = useDispatch();
	const location = useLocation();

	const loaded = useSelector(({ product }) => product.loaded);
	const products = useSelector(({ product }) => product.list);

	useEffect(() => {
		dispatch(Actions.getProductsList(location.search));

		return () => {
			dispatch(Actions.clearProductState());
		}
	}, [dispatch, location.search]);

	return (
		<div className="flex-1 ml-4 max-w-[1000px] border p-2 pb-4">
			{loaded ? (
				<>
					<div className="p-2">
						<span className="font-semibold">{products.length}</span> results found
					</div>
					{Array.isArray(products) && products.map((item, index) => (
						<div key={index} className="flex px-2 py-6 border-t">
							<Link to={`/product/${item.slug}`}>
								<div className="w-[225px] h-[225px] rounded-lg">
								<img
									src={`${process.env.REACT_APP_API_URL}/image/${item.thumbnail}`} alt="product"
									className="block w-full h-full object-contain
									hover:scale-110 transition-all ease-out duration-200"
								/>
								</div>
							</Link>
							<div className="flex-1 ml-6">
								<Link
									to={`/product/${item.slug}`}
									className="font-medium text-gray-800 text-xl line-clamp-2 mb-2 hover:text-indigo-800 hover:underline"
								>{item.name}</Link>
								<div className="text-gray-500 font-medium">{item.brand?.name}</div>
								<div className="text-indigo-800 font-medium">{item.quantity ? `${item.quantity} left in stock` : 'Out of stock'}</div>
								<div className="my-4 text-3xl font-semibold flex">
									{numberWithCommas(item.price)}<span className="font-base text-sm ml-[2px]">VND</span>
								</div>
							</div>
						</div>
					))}
				</>
			) : (
				<div>Loading...</div>
			)}
		</div>
	)
}

export default ProductsResult