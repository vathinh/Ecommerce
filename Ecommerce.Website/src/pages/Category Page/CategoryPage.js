import { Typography } from '@mui/material';
import { CategoryHeader, NotFound } from 'components';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { ProductResult } from './components';

const CategoryPage = () => {
  const params = useParams();
  const { slug } = params;

  const [isLoaded, setIsLoaded] = useState(false);
  const [currentCate, setCurrentCate] = useState(null);
  const [parentCate, setParentCate] = useState(null);

  const categories = useSelector(({ category }) => category.data);

  const isCurrent = (cateSlug) => {
	return slug === cateSlug;
  }

  useEffect(() => {
	if(Array.isArray(categories) && categories.length > 0) {
	categories.map(item => {
		if(item.slug === slug) setCurrentCate(item);

		const child = item.child?.find(c => c.slug === slug);
		if(child) {
			setCurrentCate(child);
			setParentCate(item);
		}

		return null;
	});
	setIsLoaded(true);
}
  }, [categories, slug])


  if(!isLoaded) return null;

  if(isLoaded && !currentCate) return <NotFound />

  return (
	<div>
		<CategoryHeader currentCate={slug} />
		<div className='text-4xl font-bold'>{currentCate.name}</div>
		<div className='flex mt-10'>
			<div className='w-[250px] mr-4'>
				<div className='font-semibold mb-4 text-purple-800'>Shop by Category</div>
				<Typography 
					component={isCurrent(parentCate?.slug ?? currentCate.slug) ? 'div' : Link} 
					to={`/category/${parentCate?.slug ?? currentCate.slug}`} 
					className={`font-serif my-1 block ${isCurrent(parentCate?.slug ?? currentCate.slug) ? 'font-semibold' : ''}`}
				>{parentCate ? parentCate.name : currentCate.name}</Typography>
				<div className='ml-2'>
					{(parentCate ? parentCate.child : currentCate.child).map((item, index) => (
						<Typography
							component={isCurrent(item.slug) ? 'div' : Link} 
							to={`/category/${item.slug}`} 
							className={`block font-serif mb-[2px] ${isCurrent(item.slug) ? 'font-semibold' : ''}`}
							key={index}
						>
							{item.name}
						</Typography>
					))}
				</div>
			</div>
			<div className="flex-1 px-4">
				<ProductResult slug={slug} />
			</div>
		</div>
	</div>
  )
}

export default CategoryPage;