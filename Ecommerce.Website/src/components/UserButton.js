import { Menu, Transition } from "@headlessui/react";
import { Link, useNavigate } from "react-router-dom";
import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import * as Actions from 'actions';

const UserButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLogedIn = useSelector(({ auth }) => auth.isLogedIn);

  const handleSignOut = () => {
	dispatch(Actions.signOutAccount());
	dispatch(Actions.setAlertSnackbar({
		state: true,
		type: "success",
		content: "Sign out success!"
	}));
	navigate(0);
  }

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
				<circle fill="none" cx="12" cy="7" r="3" />
				<path d="M12 2C9.243 2 7 4.243 7 7s2.243 5 5 5 5-2.243 5-5S14.757 2 12 2zM12 10c-1.654 0-3-1.346-3-3s1.346-3 3-3 3 1.346 3 3S13.654 10 12 10zM21 21v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h2v-1c0-2.757 2.243-5 5-5h4c2.757 0 5 2.243 5 5v1H21z" />
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
          <Menu.Items className="absolute right-0 mt-2 min-w-[200px] origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-4 py-2 shadow-xl border border-[#ccc] rounded-lg">
              <Menu.Item>
                <React.Fragment>
				  <Link 
				  	to="/account/purchase"
					className="hover:underline text-sm py-2 block hover:text-indigo-700 font-semibold text-gray-700"
				  >Purchase history</Link>
				  {isLogedIn && (
					<div 
						className="hover:underline text-sm py-2 cursor-pointer hover:text-indigo-700 font-semibold text-gray-700"
						onClick={handleSignOut}
					>Sign out</div>
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

export default UserButton;