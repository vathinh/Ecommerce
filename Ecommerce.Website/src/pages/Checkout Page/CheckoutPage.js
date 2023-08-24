import { getOrderAPI } from 'api';
import { NotFound } from 'components';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { orderStatus } from 'utils/common';
import { Payment, PriceDetail, ProductsList } from './components';
import * as Actions from 'actions';

const CheckoutPage = () => {
	const { orderId } = useParams();
	const dispatch = useDispatch();

	const [data, setData] = useState(null);
	const [loaded, setLoaded] = useState(false);
	const [payment, setPayment] = useState(null);

	useEffect(() => {
		const getOrderData = async () => {
			try {
				const result = await getOrderAPI(`/${orderId}`)
				if(result.data) {
					setData(result.data);
					setLoaded(true);
				}
			} catch(error) {	
				dispatch(Actions.setAlertSnackbar({
					state: true,
					type: "error",
					content: "Get order failed!"
				}));
				setLoaded(true);
			}
		}

		if(!loaded) {
			getOrderData();
		}
	}, [loaded, orderId])

	if(!loaded) return null;

	if(loaded && !data) return <NotFound />

	if(loaded && data && data.status !== orderStatus.PENDING) return (
		<div className='font-semibold text-2xl text-center'>This order had been processed!</div>
	);

	return (
		<div className='md:container mx-auto px-4'>
			<div className='font-semibold text-2xl mb-4'>Checkout</div>

			<div className='flex'>
				<div className='flex-1 pr-4'>
					<ProductsList data={data} />
					<div className='my-4'/>
					<Payment payment={payment} onChange={(value) => setPayment(value)} total={data.total} />
				</div>
				<PriceDetail data={data} payment={payment} />
			</div>
		</div>
	)
}

export default CheckoutPage;