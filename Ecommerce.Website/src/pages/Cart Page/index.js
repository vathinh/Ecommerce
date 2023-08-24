import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { numberWithCommas } from "utils/convert";
import DeleteIcon from "@mui/icons-material/Delete";
import * as Actions from "actions";
import { putOrderAPI } from "api";
import { Loading } from "components";

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [cartInfo, setCartInfo] = useState({
	quantity: 0,
	total: 0
  });

  const cartList = useSelector(({ cart }) => cart.list);
  const cartData = useSelector(({ cart }) => cart.data);
  const isLogedIn = useSelector(({ auth }) => auth.isLogedIn);

  const handleRemove = (id) => {
    dispatch(Actions.removeFromCart({ id, isLogedIn }));
  };


  useEffect(() => {
	if(cartList?.length > 0) {
	  let total = 0
	  let quantity = 0

	  cartList.map(item => {
		total += item.price
		quantity += item.quantity
		return null;
	  })

	  setCartInfo({
		quantity,
		total
	  })
	}
  }, [cartList])

  if (cartList.length === 0)
    return (
      <div>
        <div className="font-bold text-4xl">Shopping cart</div>
        <div className="text-center pt-[96px] pb-[152px]">
          <div className="text-2xl font-medium mb-6">
            You don't have any items in your cart. Let's get shopping!
          </div>
          <Button
            className="
				bg-indigo-700 hover:bg-indigo-800 font-bold w-[270px]
				text-xl normal-case text-white my-[12px] 
				py-3 rounded-full disabled:bg-slate-300 mb-4"
			component={Link} to="/"
          >
            Start shopping
          </Button>
        </div>
      </div>
    );

  return (
    <div>
      <div className="font-bold text-4xl">Shopping cart</div>
      <div className="flex mt-8 space-x-4">
        <div className="flex-1">
          {cartList.map((item) => (
            <div className="border p-4 mb-4" key={item.id}>
              <div className="flex space-x-4">
			  	<Link to={`/product/${item.slug}`} className='w-[140px]'>
					<img 
						className=' w-full h-full object-contain aspect-square
						hover:scale-110 transition-all ease-out duration-200'
						src={`${process.env.REACT_APP_API_URL}/image/${item.thumbnail}`} alt="product" 
					/>
				</Link>
                <Link
                  className="flex-1 font-semibold text-xl hover:underline text-indigo-700"
                  to={`/product/${item.slug}`}
                >
                  {item.name}
                </Link>
                <div className="min-w-[160px] pr-8 text-right text-xl">
                  Qty {item.quantity}
                </div>
                <div className="min-w-[160px] pr-2 text-right text-xl font-medium">
                  {numberWithCommas(item.price)} VNĐ
                </div>
              </div>
              <div
                className="text-indigo-700 text-right font-semibold cursor-pointer hover:underline"
                onClick={() => handleRemove(item.id)}
              >
                <DeleteIcon />
                Remove
              </div>
            </div>
          ))}
        </div>
        <div className="w-full md:max-w-[400px] border p-4">
			{cartData ? (
				<Link to={`/checkout/${cartData.id}`}>
				<Button
					className="
						bg-indigo-700 hover:bg-indigo-800 font-bold 
						text-xl normal-case text-white my-[12px] 
						py-3 rounded-full disabled:bg-gray-300 mb-4"
					fullWidth
				>
					Go to checkout
				</Button>
				</Link>
			) : (
				<div className="text-center py-3 font-semibold text-red-700">
					You need to{" "}
					<Link to="/auth/sign-in" className="hover:underline text-indigo-700 font-bold">Sign in</Link> 
					{" "}or{" "}
					<Link to="/auth/sign-up" className="hover:underline text-indigo-700 font-bold">Sign up</Link> 
					{" "}before purchase!
				</div>
			)}
          <div className="flex justify-between text-lg">
            <div>Items ({cartInfo.quantity})</div>
            <div>{numberWithCommas(cartInfo.total)} VND</div>
          </div>
          <div className="flex justify-between text-lg">
            <div>Shipping</div>
            <div>0 VND</div>
          </div>
          <div className="flex justify-between text-lg">
            <div>Import charges</div>
            <div>0 VND</div>
          </div>
          <div className="flex justify-between text-2xl font-semibold mt-8">
            <div>Subtotal</div>
            <div>{numberWithCommas(cartInfo.total)} VND</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
