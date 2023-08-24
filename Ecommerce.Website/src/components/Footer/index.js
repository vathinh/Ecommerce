import React from "react";
class Footer extends React.Component {
  render() {
    return (
      <div className="mx-auto bg-white flex px-3 py-8 border-t border-gray-400">
        <div className="w-full text-center text-xs">
          Copyright © 2022-2023 eNPT Inc. All Rights Reserved.{" "}
          <span className="font-semibold underline text-gray-500 cursor-pointer hover:text-gray-400">Accessibility</span>,{" "}
		  <span className="font-semibold underline text-gray-500 cursor-pointer hover:text-gray-400">User Agreement</span>,{" "}
		  <span className="font-semibold underline text-gray-500 cursor-pointer hover:text-gray-400">Privacy</span>,{" "}
		  <span className="font-semibold underline text-gray-500 cursor-pointer hover:text-gray-400">Payments Terms of Use</span>,{" "}
		  <span className="font-semibold underline text-gray-500 cursor-pointer hover:text-gray-400">Cookies</span>,{" "}
		  <span className="font-semibold underline text-gray-500 cursor-pointer hover:text-gray-400"> Do not sell my personal
          information</span>,{" and "}
		  <span className="font-semibold underline text-gray-500 cursor-pointer hover:text-gray-400">AdChoice</span>
        </div>
      </div>
    );
  }
}
export default Footer;
