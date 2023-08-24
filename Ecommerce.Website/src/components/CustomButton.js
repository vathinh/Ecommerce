import React from "react";

const CustomButton = (props) => {
  return (
    <button 
		{...props}
		className={`
			text-white bg-indigo-700 hover:bg-indigo-800 
			font-medium text-sm px-4 py-2 
			${props.className ?? ""}
		`}
	>
      {props.children}
    </button>
  );
};

export default CustomButton;
