import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import qs from 'qs';
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Collapse, Typography } from '@mui/material';

const CategoryItem = ({ data, queryCate }) => {
	const [open, setOpen] = useState(data.slug === queryCate || 
		data.child?.findIndex(item => item.slug === queryCate) > -1);

	const isViewing = (slug) => {
		return slug === queryCate;
	}

	return (
		<div className='my-2'>
			<div className='flex items-center justify-between'>
				<Typography 
					className={`text-lg my-2 ${isViewing(data.slug) ? 'text-black font-bold' :'text-indigo-800 font-semibold'}`} 
					component={isViewing(data.slug) ? "div" : Link}
					to={`/product?c=${data.slug}`}
				>
					{data.name}
				</Typography>
				<div className="cursor-pointer" onClick={() => setOpen(!open)}>
					{open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
				</div>
			</div>
			{Array.isArray(data.child) && (
				<Collapse className='ml-2' in={open}>
					{data.child.map((c, cIndex) => (
						<Typography 
							key={cIndex} to={`/product?c=${c.slug}`}
							component={isViewing(c.slug) ? "div" : Link}
							className={`text-lg my-1 block ${isViewing(c.slug) ? 'text-black font-bold' : 'text-indigo-600 font-medium'}`}
						>
							{c.name}
						</Typography>
					))}
				</Collapse>
			)}
		</div>
	)
};

const ProductsCategory = () => {
  const location = useLocation();
  const query = qs.parse(location.search, {
	ignoreQueryPrefix: true
  });

  const categories = useSelector(({ category }) => category.data);

  return (
	<div className="w-[240px]">
		<div className="font-semibold text-xl font-serif">Category</div>
		<div className="my-4 ml-2">
			{Array.isArray(categories) && categories.map((item, index) => (
				<CategoryItem key={index} data={item} queryCate={query?.c} querySearch={query?.s} />
			))}
		</div>
	</div>
  )
}

export default ProductsCategory;