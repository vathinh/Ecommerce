import { getPaymentAPI, postPaymentAPI } from 'api';
import React, { useEffect, useState } from 'react'
import { paymentType } from 'utils/common';
import CreditCardRoundedIcon from '@mui/icons-material/CreditCardRounded';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { numberWithCommas } from 'utils/convert';
import { CustomButton } from 'components';
import { useDispatch } from 'react-redux';
import * as Actions from 'actions';

const AddPayment = ({ onAdd }) => {
	const dispatch = useDispatch();

	const [name, setName] = useState("");
	const [type, setType] = useState("");
	const [loading, setLoading] = useState(false);

	const handleAdd = async () => {
		if (!name || !type) return console.log("Missing input");

		setLoading(true);

		try {
			const body = {
				name,
				type,
				balance: 1000000000
			}
			const result = await postPaymentAPI(body);
			if(result.data) {
				onAdd(result.data)
				setName("")
				setType("")
			}
		} catch (error) {
			dispatch(Actions.setAlertSnackbar({
				state: true,
				type: "error",
				content: "Add payment failed!"
			}));
		}

		setLoading(false);
	}

	return (
		<div className='p-4 border-t'>
			<div className='font-semibold flex items-center'><AddCircleOutlineIcon className='mr-2' /> Add new</div>
			<div className='mt-4 mb-2 flex items-center'>
				<input
					pattern="[0-9]"
					type="text"
					value={name}
					className='p-1 border border-[#ccc] w-[240px]'
					placeholder='Card ID or account number'
					onChange={(e) => setName(e.target.value)}
				/>
				<select className='mx-4 p-1 border border-[#ccc]' value={type} onChange={(e) => setType(e.target.value)}>
					<option value="" selected disabled hidden>Choose here</option>
					{Object.keys(paymentType).map((key, index) => (
						<option key={index} value={key}>{paymentType[key]}</option>
					))}
				</select>
				<CustomButton className="rounded disabled:opacity-50 disabled:cursor-wait" onClick={handleAdd} disabled={loading}>Add</CustomButton>
			</div>
		</div>
	)
}

const Payment = ({ payment, onChange, total }) => {
	const dispatch = useDispatch();

	const [data, setData] = useState(null);
	const [loaded, setLoaded] = useState(false);

	const checkBalance = (balance) => {
		return balance >= total;
	}

	const handleAddPayment = (newData) => {
		setData([...data, newData])
		onChange(newData.id)
	}

	useEffect(() => {
		const getOrderData = async () => {
			try {
				const result = await getPaymentAPI('');
				if (result.data) {
					setData(result.data);
					setLoaded(true);
				}
			} catch (error) {
				dispatch(Actions.setAlertSnackbar({
					state: true,
					type: "error",
					content: "Get payment list failed!"
				}));
				setLoaded(true);
			}
		}

		if (!loaded) {
			getOrderData();
		}
	}, [loaded])

	if (!loaded || !Array.isArray(data)) return null;

	return (
		<div className='border'>
			<div className='font-semibold p-4'>Payment</div>
			{data.map((item, index) => (
				<div className={`p-4 border-t flex items-center ${!checkBalance(item.balance) ? 'opacity-50' : ''} `} key={index}>
					<input
						type="radio"
						className='w-[18px] h-[18px] mr-[24px] disabled:cursor-not-allowed'
						checked={payment?.id === item.id}
						disabled={!checkBalance(item.balance)}
						onChange={() => { onChange(item) }}
					/>
					{item.type === "CREDIT_CARD" && <CreditCardRoundedIcon className='mr-[12px] h-[28px] w-[28px] text-orange-700' />}
					{item.type === "INTERNATIONAL_BANKING" && <AccountBalanceIcon className='mr-[12px] h-[28px] w-[28px] text-orange-700' />}
					<div className='w-[240px]'>
						<div className='font-semibold text-lg'>ID: {item.name}</div>
						<div className='text-sm'>{paymentType[item.type]}</div>
					</div>
					<div className='flex-1 font-bold text-lg'>
						{numberWithCommas(item.balance)} VND
					</div>
				</div>
			))}
			<AddPayment onAdd={handleAddPayment}/>
		</div>
	)
}

export default Payment;