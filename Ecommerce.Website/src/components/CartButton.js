import { Menu, Transition } from "@headlessui/react";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import React from 'react';

const CartButton = () => {
  const productsCart = useSelector(({ cart }) => cart.list);

  return (
	<div className="z-50">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-full justify-center rounded-md text-black  px-4 py-2 text-sm font-medium ml-3 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            <button
              className=" inline-block no-underline hover:text-black"
              href="#"
            >
              <svg
                className="fill-current hover:text-black"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M21,7H7.462L5.91,3.586C5.748,3.229,5.392,3,5,3H2v2h2.356L9.09,15.414C9.252,15.771,9.608,16,10,16h8 c0.4,0,0.762-0.238,0.919-0.606l3-7c0.133-0.309,0.101-0.663-0.084-0.944C21.649,7.169,21.336,7,21,7z M17.341,14h-6.697L8.371,9 h11.112L17.341,14z" />
                <circle cx="10.5" cy="18.5" r="1.5" />
                <circle cx="17.5" cy="18.5" r="1.5" />
              </svg>
            </button>
          </Menu.Button>
        </div>
        <Transition
          as={React.Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-[550px] origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="p-5 shadow-xl border border-[#ccc] rounded-lg">
              <Menu.Item>
                <React.Fragment>
				  {Array.isArray(productsCart) && (
					productsCart.length > 0 ? (
						<div>
							{productsCart.map((item) => (
								<div className="flex justify-start items-center gap-x-3" key={item.id}>
								<Link to={`/product/${item.slug}`}>
								<img
									src={`${process.env.REACT_APP_API_URL}/image/${item.thumbnail}`}
									alt="product"
									className="w-14 h-14 shadow-md p-1 rounded-md hover:scale-110 transition-all ease-out duration-200"
								/>
								</Link>
								<Link to={`/product/${item.slug}`} className="flex-1 font-semibold text-ellipsis line-clamp-1">{item.name}</Link>
								<span>Qty: {item.quantity}</span>
								<span className="font-bold text-orange-700">
									{item.price?.toLocaleString()} VNĐ
								</span>
								</div>
							))}
							<div className="flex justify-end items-center text-white">
								<Button
								component={Link}
								to={"/cart"}
								className="
									normal-case text-white
									p-3 bg-indigo-700 rounded-md border
									transition-all ease-linear duration-200 hover:bg-white 
									hover:text-indigo-700 hover:border hover:border-indigo-700
								"
								>
								Checkout
								</Button>
							</div>
						</div>
					) : (
						<div className="text-xl text-gray-500 font-bold text-center">
							Your cart is empty
						</div>
					)
				  )}
                  
                </React.Fragment>
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}

export default CartButton