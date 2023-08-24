import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import * as Actions from 'actions';
import { getOrderAPI } from 'api';
import { Link } from 'react-router-dom';
import { numberWithCommas } from 'utils/convert';
import { orderStatus, statusColor } from 'utils/common';
import moment from 'moment';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const HistoryPurchasePage = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState(null);

  useEffect(() => {
	const getOrderData = async () => {
		try {
			const result = await getOrderAPI("");
			if(result.data) {
				setData(result.data.filter(item => item.status !== orderStatus.PENDING));
			}
		} catch(error) {
			dispatch(Actions.setAlertSnackbar({
				state: true,
				type: "error",
				content: "Get history purchases fail!"
			}))
		}
	}
	getOrderData();
  }, [dispatch]);

  return (
	<React.Fragment>
		<div className='text-2xl font-semibold'>History purchase</div>
		{Array.isArray(data) && data.map((item, index) => (
			<div className='px-4 border border-[#ccc] rounded-lg mt-8' key={index}>
				<div className='py-2 flex items-center'>
					<div className={`font-bold ${statusColor[item.status]}`}>{item.status}</div>
					<div className='flex-1'/>
					<div>Lasted updated: <span className='font-semibold text-indigo-700'>{moment(item.updatedDate).format("MMM DD,YYYY")}</span></div>
				</div>
				<div className='py-4 border-t'>
					{Array.isArray(item.products) && item.products.map((cItem, index) => (
						<div className='flex mb-4' key={index}>
							<Link to={`/product/${cItem.slug}`}>
							<img 
								alt="product" 
								className='w-[100px] h-[100px] hover:scale-110 transition-all ease-out duration-200 aspect-square' 
								src={`${process.env.REACT_APP_API_URL}/image/${cItem.thumbnail}`}
							/> 
							</Link>
							<div className='flex-1 ml-10'>
								<Link 
									to={`/product/${cItem.slug}`}
									className='block text-xl hover:underline hover:text-indigo-700 font-semibold'
								>{cItem.name}</Link>
								<div className='mt-1 text-sm'>Qty: {cItem.quantity}</div>
								<div className='mt-3 text-lg font-semibold text-orange-700'>{numberWithCommas(cItem.price)} VND</div>
							</div>
						</div>
					))}
				</div>
				<div className='mb-4 text-xl flex items-center flex-row-reverse'>
					<span className='font-semibold text-indigo-700 ml-2'>
						{numberWithCommas(item.total)} VND
					</span>
					{" "}Total:{" "}
					<CheckCircleIcon className='text-indigo-700 mr-3'/>
				</div>
			</div>
		))}
	</React.Fragment>
  )
}

export default HistoryPurchasePage