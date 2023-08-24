import React from 'react'
import { Link } from 'react-router-dom';
import { numberWithCommas } from 'utils/convert';

const ProductsList = ({ data }) => {
	if(!Array.isArray(data.products)) return null;

  return (
	<div className='p-4 border'>
		<div className='font-semibold mb-2'>Review item</div>
		{data.products.map((item, index) => (
			<div
				className='my-4 py-4 border-t flex'
				key={index}
			>
				<Link to={`/product/${item.slug}`} className='w-[96px] mr-6'>
					<img 
						className=' w-full h-full object-contain aspect-square
						hover:scale-110 transition-all ease-out duration-200'
						src={`${process.env.REACT_APP_API_URL}/image/${item.thumbnail}`} alt="product" 
					/>
				</Link>
				<div className='flex-1'>
					<Link 
						to={`/product/${item.slug}`}
						className="block font-semibold text-indigo-700 hover:underline text-xl"
					>{item.name}</Link>
					<div className='font-bold my-3'>{numberWithCommas(item.price)} VND</div>
					<div className='font-serif'>Quantity: {item.quantity}</div>
				</div>
			</div>
		))}
	</div>
  )
}

export default ProductsList;