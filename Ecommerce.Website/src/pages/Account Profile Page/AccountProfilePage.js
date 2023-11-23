import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from 'actions';
import { getUserAPI } from 'api';
import { numberWithCommas } from 'utils/convert';
import moment from 'moment';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const AccountProfilePage = () => {
    const dispatch = useDispatch();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const userId = useSelector(({ auth }) => auth.userId);

    useEffect(() => {
        const getUserDetails = async () => {
            try {
                setLoading(true);

                if (userId) {
                    const userResult = await getUserAPI(userId);
                    setUserData(userResult.data);
                }
            } catch (error) {
                console.error('Error fetching user details:', error);
                setError(error.message);
                dispatch(Actions.setAlertSnackbar({
                    state: true,
                    type: 'error',
                    content: 'Get user details failed!',
                }));
            } finally {
                setLoading(false);
            }
        };

        getUserDetails();

        // Clean up error on component unmount
        return () => setError(null);
    }, [dispatch, userId]);

    return (
        <div className="mx-auto max-w-screen-lg p-4">

            {loading && <div className="text-center">Loading...</div>}
            {error && <div className="text-red-500 mb-4">Error: {error}</div>}

            {userData && (
                <table className="border-collapse border border-[#ccc] rounded-lg w-full">
                    <thead>
                    <tr className="bg-gray-200">
                        <th className="p-2 border" colSpan="2">User Details</th>
                    </tr>
                    </thead>
                    <tbody>
                    <TableRow attribute="Username" value={userData.username} />
                    <TableRow attribute="Full Name" value={userData.fullname} />
                    <TableRow attribute="Email" value={userData.email} />
                    <TableRow attribute="Phone" value={userData.phone} />
                    {/* Add additional rows as needed */}
                    </tbody>
                </table>
            )}
        </div>
    );
};

// Helper component for table rows
const TableRow = ({ attribute, value }) => (
    <tr>
        <td className="p-2 border">{attribute}</td>
        <td className="p-2 border">{value}</td>
    </tr>
);

export default AccountProfilePage;
