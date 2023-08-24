import React, { useState } from 'react'
import { useSelector } from 'react-redux';

const ProductImages = () => {
	const [imgIndex, setImageIndex] = useState(0);
	
	const product = useSelector(({ product }) => product.data);

	return (
		<>
			<div className="w-[45px]">
				{Array.isArray(product.images) && product.images.map((item, index) => (
					<div 
						className={`w-[45px] h-[45px] border border-[#ccc] mb-2 cursor-pointer ${imgIndex === index ? 'border-indigo-700' : ''}`} 
						key={index}
						onMouseOver={() => setImageIndex(index)}
					>
						<img
							src={`${process.env.REACT_APP_API_URL}/image/${item}`} alt="img"
							className="w-full h-full object-contain"
						/>
					</div>
				))}
			</div>
			<div className="w-[500px] h-[500px] border border-[#ccc] mx-5">
				<img 
					className="object-contain max-w-full max-h-full mx-auto hover:cursor-pointer"
					src={`${process.env.REACT_APP_API_URL}/image/${product.images[imgIndex]}`} 
					alt="img product" 
				/>
			</div>
		</>
	)
}

export default ProductImages;