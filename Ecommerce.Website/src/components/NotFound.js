import React from 'react'
import { Link } from 'react-router-dom';
import CustomButton from './CustomButton';

const NotFound = () => {
  return (
	<div className='lg:container mx-auto text-purple-800 flex'>
		<div className='flex-1'>
			<img className='mx-auto' alt="not found" src="/not-found.png"/>
		</div>
		<div className='flex-1 pt-10'>
			<div className='text-5xl font-bold mb-2'>We looked every where.</div>
			<div className='text-lg font-semibold mb-4'>Looks like this page is missing.</div>
			<Link to="/"><CustomButton>Go to homepage</CustomButton></Link>
		</div>
	</div>
  )
}

export default NotFound;