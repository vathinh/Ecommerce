// PasswordResetModal.js
import React, { useState } from "react";
import { Modal, Button, TextField, Typography } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const modalContainerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
};

const modalContentStyle = {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "8px",
    width: "300px",
    textAlign: "center",
};

const inputStyle = {
    marginBottom: "12px",
};

const buttonStyle = {
    marginTop: "12px",
};

const PasswordResetModal = ({ isOpen, handleClose }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

        const handleResetPassword = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/v1/auth/resetPassword", {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email,
                        password,
                    }),
                });

                if (response.ok) {
                    const data = await response.text();

                    // Display the success message
                    toast.success(data);
                    console.log("Password reset successfully");
                } else {
                    toast.error("Password reset failed");
                    console.error("Password reset failed");
                }
            } catch (error) {
                toast.error("An error occurred during password reset");
                console.error("An error occurred during password reset:", error);
            }

            // Close the modal after handling reset logic
            handleClose();
        };

    return (
        <Modal open={isOpen} onClose={handleClose}>
            <div style={modalContainerStyle}>
                <div style={modalContentStyle}>
                    <Typography variant="h5" component="div" gutterBottom>
                        Reset Password
                    </Typography>
                    <TextField
                        label="Email"
                        type="email"
                        fullWidth
                        variant="outlined"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={inputStyle}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        fullWidth
                        variant="outlined"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={inputStyle}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleResetPassword}
                        style={buttonStyle}
                    >
                        Reset Password
                    </Button>

                    {/* Toastify container for notifications */}
                    <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
                </div>
            </div>
        </Modal>
    );
};

export default PasswordResetModal;
