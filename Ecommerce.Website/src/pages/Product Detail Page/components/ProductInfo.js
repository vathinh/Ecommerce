import React, { useState } from 'react'
import { numberWithCommas } from "utils/convert";
import CustomButton from "components/CustomButton";
import LocalMallIcon from '@mui/icons-material/LocalMall';
import PaymentIcon from '@mui/icons-material/Payment';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VerifiedIcon from '@mui/icons-material/Verified';
import { useDispatch, useSelector } from 'react-redux';
import StarRating from 'components/StarRating';
import { postOrderAPI } from 'api';
import { useNavigate } from 'react-router-dom';
import * as Actions from 'actions';
import { Loading } from 'components';

const BuyNowButton = ({ data, quantity }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [loading, setLoading] = useState(false);
	const isLogedIn = useSelector(({ auth }) => auth.isLogedIn);

	const handleQuickBuy = async () => {
		if(!isLogedIn) {
			return dispatch(Actions.setAlertSnackbar({
				state: true,
				type: "info",
				content: "You need to sign in!"
			}));
		};
		
		setLoading(true);

		try {
			const body = {
				products: [
					{
						id: data.id,
						name: data.name,
						slug: data.slug,
						price: data.price,
						quantity: quantity,
						thumbnail: data.thumbnail
					}
				]
			}
			
			const result = await postOrderAPI(body);

			if(result.data) {
				navigate(`/checkout/${result.data.id}`)
			}
		} catch(error) {
			dispatch(Actions.setAlertSnackbar({
				state: true,
				type: "error",
				content: "Quick buy failed!"
			}));
		}

		setLoading(false);
	};

	return (
		<CustomButton 
			className={`block mb-3 rounded-full w-[200px]`} 
			onClick={() => handleQuickBuy()}
			disabled={loading}
		>
			{loading ? (
				<span className="inline-flex items-center"><Loading /> Processing...</span>
			) : (
				<span className="inline-flex items-center"><PaymentIcon className="w-[18px] h-[18px] mr-1" /> Buy It Now</span>
			)}
		</CustomButton>
	)
}

const AddToCartButton = ({ data, quantity }) => {
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(false);

	const isLogedIn = useSelector(({ auth }) => auth.isLogedIn);

	const handleAddToCart = () => {
		setLoading(true);
		const newItem = { 
			id: data.id,
			name: data.name,
			slug: data.slug,
			price: data.price,
			quantity: quantity,
			thumbnail: data.thumbnail
		};
		dispatch(Actions.addToCart({
			data: newItem,
			isLogedIn
		}));
		dispatch(Actions.setAlertSnackbar({
			state: true,
			type: "info",
			content: `Add "${data.name}" to cart`
		}));
		setLoading(false);
	};

	return (
		<CustomButton 
			className={`block mb-3 rounded-full w-[200px] !bg-orange-600 hover:!bg-orange-700 disabled:bg-gray-300 ${loading ? 'cursor-wait' : ''}`}
			onClick={() => handleAddToCart()}
			disabled={loading}
		>
			<div className="inline-flex items-center">
				<AddShoppingCartIcon className="w-[18px] h-[18px] mr-1" /> Add To Cart
			</div>
		</CustomButton>
	)
}

function ProductInfo() {
	const [quantity, setQuantity] = useState(1);

	const product = useSelector(({ product }) => product.data);
	const statistics = useSelector(({ product }) => product.statics);

	


	const countPurchase = (data) => {
		let result = 0;

		if(!Array.isArray(data)) return result;

		data.map(item => {
			result += item.quantity
			return item
		})
		return result
	}

	const countAvgRating = (data) => {
		let result = 0;
		if(!Array.isArray(data)) return result;
		const average = arr => arr.reduce( ( p, c ) => p + c, 0 ) / arr.length;
		return parseFloat(average(data.map(item => item.star)).toFixed(1));
	}

	return (
		<div className="flex-1">
			<div className="border-b border-[#ccc] pb-4">
				<div className="font-bold text-2xl mb-2">{product.name}</div>
				{statistics && (
					<>
					{Array.isArray(statistics.views) && statistics.views.length > 0 && (
						<div className="font-semibold text-indigo-700 flex items-center my-1">
							<VisibilityIcon className="mr-2"/> {statistics.views.length} view(s)
						</div>
					)}
					{Array.isArray(statistics.purchases) && statistics.purchases.length > 0 && (
						<div className="font-semibold text-orange-600 flex items-center my-1">
							<VerifiedIcon className="mr-2"/> {countPurchase(statistics.purchases)} purchase(s)
						</div>
					)}
					{Array.isArray(statistics.ratings) && statistics.ratings.length > 0 && (
						<div className='flex items-center mt-2 font-semibold'>
							<StarRating star={countAvgRating(statistics.ratings)} size={20}/>
							<div className='text-slate-500 ml-2'>
								{numberWithCommas(statistics.ratings.length)} rating(s)
							</div>
						</div>
					)}
					</>
				)}
			</div>
			<div className="py-2 flex">
				<div className="font-serif w-[100px] text-right text-gray-600">Condition :</div>
				<div className="flex-1 ml-2 font-semibold">{product.condition}</div>
			</div>
			<div className="py-2 flex items-center">
				<div className="font-serif w-[100px] text-right text-gray-600">Quantity :</div>
				{product.quantity ? (
					<>
					<div className="mx-2">
						<input
							className="border border-[#767676] focus:border-indigo-700 rounded-lg text-center pl-[10px] w-[60px]"
							type="number" value={quantity} min={1} max={product.quantity}
							onChange={(e) => setQuantity(e.target.value)}
						/>
					</div>
					<div className="ml-6 flex items-center text-xs">
						<LocalMallIcon className="mr-[2px] text-indigo-700" /> {product.quantity > 10 ? `More than 10 available` : `Only ${product.quantity} left`}
					</div>
					</>
				) : (
					<div className='mx-2 text-red-600 font-bold text-lg'>Out of stock</div>
				)}
			</div>
			<div className="py-2 flex">
				<div className="font-serif w-[100px] text-right text-gray-600">Price :</div>
				<div className="flex-1 ml-2 flex">
					<div className="w-[300px]">
						<div className="font-bold text-2xl">{numberWithCommas(product.price)} VND</div>
					</div>
					{product.quantity ? (
					<div className="flex-1">
						<BuyNowButton data={product} quantity={quantity} />
						<AddToCartButton data={product} quantity={quantity} />
					</div>
					) : null}
				</div>
			</div>
			<div className="border-b border-[#ccc] my-2" />
			<div className="py-2 flex">
				<div className="font-serif w-[100px] text-right text-gray-600">Brand :</div>
				<div className="flex-1 ml-2 font-semibold">{product.brand?.name}</div>
			</div>
			<div className="py-2 flex">
				<div className="font-serif w-[100px] text-right text-gray-600">Description :</div>
				<div className="font-serif flex-1 ml-2 text-justify" dangerouslySetInnerHTML={{ __html: product.description }} />
			</div>
		</div>
	)
}

export default ProductInfo