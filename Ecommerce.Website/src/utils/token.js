export const token = () => {
	const token = localStorage.getItem('token');
	return token;
}
