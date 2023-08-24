import React, { useState } from "react";
import { useSelector } from "react-redux";
import { CategoryProducts } from "./components";


export const homeWallpaper = `${process.env.PUBLIC_URL}/carusel.png`;

const HomePage = () => {
  const [loadIndex, setLoadIndex] = useState(0);
  const categories = useSelector(({ category }) => category.data);

  const handleLoadFinish = () => {
	if(loadIndex < categories.length-1) {
		setLoadIndex(loadIndex + 1);
	}
  }

  return (
	<div className="mx-[50px]">
		<div 
			style={{
            	height: "300px",
				backgroundImage: `url(${homeWallpaper})`,
				backgroundPosition: "center",
				backgroundSize: "cover",
				backgroundRepeat: "no-repeat",
			}}
		>
			<div className="p-8">
				<div className="font-bold text-gray-700 text-4xl mb-2 z-50">The gift season</div>
				<div className="font-medium text-gray-600 text-lg">Sneakers, electronics, toys and more</div>
			</div>
		</div>
		{Array.isArray(categories) && categories.map((item, index) => (
			<CategoryProducts 
				key={index} 
				data={item} 
				loadAble={loadIndex === index}
				handleFinish={handleLoadFinish}
			/>
		))}
	</div>
  );
};

export default HomePage;
