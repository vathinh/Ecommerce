import Header from "components/Header";
import Footer from "components/Footer";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import * as Actions from "actions";
import { getOrderAPI, postOrderAPI, putOrderAPI } from "api";
import { orderStatus } from "utils/common";
import { AlertSnackbar } from "components";

const HomeLayout = () => {
  const dispatch = useDispatch();

  const categories = useSelector(({ category }) => category.data);
  const isLogedIn = useSelector(({ auth }) => auth.isLogedIn);
  const cartList = useSelector(({ cart }) => cart.list);
  const cartData = useSelector(({ cart }) => cart.data);

  useEffect(() => {
	const dispatchData = async (data) => {
		dispatch(Actions.updateCartList(data.products));
		dispatch(Actions.updateCartData(data));
	};
	const getCartData = async () => {
		try {
			if(localStorage.getItem("cart")) {
				const newCart = await postOrderAPI({ products: JSON.parse(localStorage.getItem("cart")) });
				if(newCart.data) {
					localStorage.removeItem("cart");
					return dispatchData(newCart.data)
				}
			} else {
				const result = await getOrderAPI(`?status=${orderStatus.PENDING}`);
				if(Array.isArray(result.data) && result.data.length > 0) {
					dispatchData(result.data[result.data.length - 1])
				} else {
					const newCart = await postOrderAPI({ products: [] })
					if(newCart.data) {
						dispatchData(newCart.data)
					}
				}
			}
		} catch(error) {
			dispatch(Actions.setAlertSnackbar({
				state: true,
				type: "error",
				content: "Get cart data failed!"
			}));
			localStorage.removeItem("cart");
		}
	}

	if(isLogedIn && !cartData) {
		getCartData();
	}
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, isLogedIn]);

  useEffect(() => {
	const updateOrder = async () => {
		try {
			await putOrderAPI(`/${cartData.id}`, {
				status: cartData.status,
				products: cartList
			});
		} catch(error) {
			dispatch(Actions.setAlertSnackbar({
				state: true,
				type: "error",
				content: "Update cart failed!"
			}));
		}
	}

	if(cartData) {
		updateOrder();
	}
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartList])

  useEffect(() => {
	if(!categories) {
		dispatch(Actions.getAllCategories());
	}
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])

  return (
    <>
	  <AlertSnackbar />
      <Header />
      <div className="min-h-[calc(100vh-230px)] pt-[32px] pb-[64px] px-[24px] 2xl:container 2xl:mx-auto 2xl:px-0">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default HomeLayout;
