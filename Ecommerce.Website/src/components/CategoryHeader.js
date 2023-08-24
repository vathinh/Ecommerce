import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

const CategoryHeader = ({ currentCate }) => {
  const [childCate, setChildCate] = useState(null);
  const [parentCate, setParentCate] = useState(null);

  const categories = useSelector(({ category }) => category.data);

  useEffect(() => {
	if(Array.isArray(categories) && categories.length > 0) {
	  categories.map(item => {
		const child = item.child?.find(c => c.slug === currentCate);
		if(child) {
			setChildCate(child);
			setParentCate(item);
		}
		return null;
	  })
	}
  }, [categories, currentCate])

  return (
  	<div className="mb-4 mt-[-16px] text-sm text-indigo-700 font-semibold z-[100]">
	  {childCate && parentCate && (
		<div className="flex items-center">
			<Link to="/" className="hover:underline">eNPT</Link>
			<KeyboardArrowRightIcon className="mx-1 w-[20px] h-[20px] text-gray-500" />
			<Link to={`/category/${parentCate.slug}`} className="hover:underline">{parentCate.name}</Link>
			<KeyboardArrowRightIcon className="mx-1 w-[20px] h-[20px] text-gray-500" />
			<Link to={`/category/${childCate.slug}`} className="hover:underline">{childCate.name}</Link>
		</div>
	  )}
	</div>
  );
};

export default CategoryHeader;
