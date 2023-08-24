import React from 'react'
import { Link } from 'react-router-dom';
import { numberWithCommas } from 'utils/convert';

const ProductCard = ({ data, className }) => {
	if(!data) return null;

  return (
	<div className={`border p-2 w-[240px] ${className}`}>
		<Link to={`/product/${data.slug}`} >
			<div className="w-full rounded-lg bg-slate-100">
				<img
					src={`${process.env.REACT_APP_API_URL}/image/${data.thumbnail}`} alt="product"
					className="block w-full h-full object-contain aspect-square
					hover:scale-110 transition-all ease-out duration-200"
				/>
			</div>
		</Link>
		<Link 
			className='block my-2 hover:text-indigo-700 hover:underline line-clamp-3 font-semibold text-gray-700 h-[74px]'
			to={`/product/${data.slug}`} 
		>{data.name}</Link>
		<div className='font-bold text-xl'>{numberWithCommas(data.price)} VND</div>
	</div>
  )
}

export default ProductCard;