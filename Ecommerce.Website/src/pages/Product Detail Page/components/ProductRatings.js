import { StarRating } from 'components';
import moment from 'moment';
import React from 'react'
import { useSelector } from 'react-redux';

const ProductRatings = () => {
  const statistics = useSelector(({ product }) => product.statics);

  if(!Array.isArray(statistics?.ratings) || statistics.ratings.length === 0) return null;

  return (
	<div className='border rounded-lg p-4 mt-[60px] my-5'>
		<div className='text-xl font-semibold mb-4'>Ratings and Reviews</div>
			{statistics.ratings.map((item, index) => (
				<div key={index} className="py-4 border-t border-[#ccc] flex">
					<div className='text-center mr-[100px]'>
						<StarRating star={item.star} size={16} />
						<div className='text-gray-700 mt-[2px]'>{moment(item.createdDate).format('MMM DD,YYYY')}</div>
					</div>
					<div className='flex-1 text-lg text-gray-800'>{item.content}</div>
				</div>
			))}
	</div>
  )
}

export default ProductRatings;