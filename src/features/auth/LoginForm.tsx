// src/features/auth/LoginForm.tsx
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "./authSlice";
import { Box, Typography } from "@mui/material";
import { Input } from "../../components/common/CustomInput"; // ✅ custom input
import { Button } from "../../components/common/CustomButton"; 

export const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    dispatch(
      login({
        name: "John Doe",
        id: "some-id", // Replace with actual id if available
      })
    );
    navigate("/dashboard");
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={10} gap={2} width={300}>
      <Typography variant="h4">Login</Typography>
      
      {/* Custom Input */}
      <Input
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <Input
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {/* Custom Button */}
      <Button onClick={handleLogin}>Login</Button>
    </Box>
  );
};
