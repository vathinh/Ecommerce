import { Alert, Snackbar } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "actions";

const AlertSnackbar = () => {
	const dispatch = useDispatch();

	const alert = useSelector(({ auth }) => auth.alert);

	const handleCloseAlert = () => {
		dispatch(
			Actions.setAlertSnackbar({
				state: false,
				type: alert.type,
				content: "",
			})
		);
	};

	return (
		<Snackbar
			anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
			open={alert.state}
			onClose={() => handleCloseAlert()}
			autoHideDuration={3000}
			className="min-w-[300px] max-w-[500px]"
		>
			<Alert
				onClose={() => handleCloseAlert()}
				variant="filled"
				severity={alert.type}
				sx={{ width: "100%" }}
			>
				{alert.content}
			</Alert>
		</Snackbar>
	);
};

export default AlertSnackbar;
