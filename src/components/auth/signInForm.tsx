import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignInFormData, SignInSchema } from "../../types/types";
import { signIn } from "../../api/auth";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, Link } from "react-router-dom";
import { AuthResponse } from "../../types/types";
import { motion } from "framer-motion";
import { Button, TextField, Box, Typography, Paper } from "@mui/material";
import { useState } from "react"; 
import { Alert } from "@mui/material";
import { CircularProgress } from "@mui/material";

export const SignInForm = () => {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm<SignInFormData>({
    resolver: zodResolver(SignInSchema),
  });

  const mutation = useMutation<AuthResponse, Error, SignInFormData>({
    mutationFn: signIn,
    onSuccess: (data) => {
        localStorage.setItem("token", data.token);
        setSuccessMessage("Successfully signed in!"); 
        setTimeout(() => {
          navigate("/dashboard"); 
        }, 2000);
    },
    onError: (error) => {
        setErrorMessage(error.message || "An error occurred, try again.");
    },
  });

  const onSubmit = (data: SignInFormData) => {
    mutation.mutate(data);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Paper elevation={3} sx={{ maxWidth: 400, mx: "auto", mt: 8, p: 4 }}>
        <Typography variant="h4" align="center" sx={{ mb: 4 }}>
          Sign In
        </Typography>
        {errorMessage && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {errorMessage}
        </Alert>
      )}
        {successMessage && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {successMessage}
          </Alert>
        )}
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <TextField
            {...register("email")}
            label="Email"
            fullWidth
            margin="normal"
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            {...register("password")}
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? (
            <CircularProgress size={24} color="inherit" /> 
            ) : (
                "Sign In" 
            )}
          </Button>
          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            Don't have an account?{" "}
            <Link to="/signup" style={{ textDecoration: "none", color: "#1976d2" }}>
              Sign Up
            </Link>
          </Typography>
        </Box>
      </Paper>
    </motion.div>
  );
};