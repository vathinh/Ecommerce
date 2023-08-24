import { getProductAPI, putOrderAPI, putPaymentAPI, putProductAPI } from 'api';
import { postHistoryAPI } from 'api/history-api';
import { CustomButton, Loading } from 'components';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { historyType, orderStatus } from 'utils/common';
import { numberWithCommas } from 'utils/convert';
import * as Actions from 'actions';
import { useNavigate } from 'react-router-dom';

const PriceDetail = ({ data, payment }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);

	const countQuantity = (products) => {
		let result = 0;
		if (Array.isArray(products)) {
			products.map(item => {
				result += item.quantity ?? 0
				return null;
			})
		}
		return result;
	};

	const handlePurchase = async () => {
		setLoading(true);
		try {
			//update order status
			await putOrderAPI(data.id, { 
				status: orderStatus.PAID,
				products: data.products
			})

			//reduce products quantity
			if(Array.isArray(data.products)) {
				data.products.map(async (item) => {
					const res = await getProductAPI(`/${item.slug}`);
					if(res.data) {
						await putProductAPI(`/${item.slug}`, { quantity: res.data.quantity - item.quantity })
						await postHistoryAPI({
							type: historyType.PURCHASE,
							quantity: item.quantity,
							productId: res.data.id
						})
					}
				})
			}

			//reduce payment balance
			await putPaymentAPI(`/${payment?.id}`, { balance: payment.balance - data.total });

			navigate("/account/purchase");
		} catch(error) {
			dispatch(Actions.setAlertSnackbar({
				state: true,
				type: "error",
				content: "Purchase failed!"
			}));
		}
		setLoading(false);
	};

	return (
		<div className='w-[380px] border p-4'>
			<div className='flex text-sm'>
				<div className='flex-1 mb-1'>Subtotal ({countQuantity(data.products)} item{countQuantity(data.products) ? 's' : ''})</div>
				<div>{numberWithCommas(data.total)} VND</div>
			</div>
			<div className='flex text-sm'>
				<div className='flex-1'>Shipping</div>
				<div>0 VND</div>
			</div>
			<div className='border-b my-4' />
			<div className='flex font-semibold'>
				<div className='flex-1'>Order total</div>
				<div>{numberWithCommas(data.total)} VND</div>
			</div>
			<div className='p-4 bg-[#f7f7f7] text-sm my-4'>
				You agree to the{" "}
				<span className='hover:cursor-pointer underline text-indigo-700'>Global Shipping Program terms</span>.
			</div>
			<CustomButton 
				className={`w-full !text-xl rounded-full my-2 ${!payment ? 'bg-gray-300' : ''}`} 
				onClick={() => handlePurchase()}
				disabled={!payment || loading}
			>
				{loading ? (
					<span><Loading /> Processing...</span>
				) : (
					<span>Purchase</span>
				)}
			</CustomButton>
		</div>
	)
}

export default PriceDetail;