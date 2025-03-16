import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateMonitorFormData, CreateMonitorSchema, Monitor } from "../../types/types";
import { createMonitor } from "../../api/monitor";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Button, TextField, MenuItem, Box, Container } from "@mui/material";
import { Header } from "../header";
import { motion } from "framer-motion";

export const CreateMonitorForm = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm<CreateMonitorFormData>({
    resolver: zodResolver(CreateMonitorSchema),
  });

  const mutation = useMutation<Monitor, Error, CreateMonitorFormData>({
    mutationFn: createMonitor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["monitors"] }); 
      navigate("/dashboard");
    },
  });

  const onSubmit = (data: CreateMonitorFormData) => {
    mutation.mutate(data);
  };

  return (
    <motion.div
    initial={{ opacity: 0, y: -50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <Header />
    <Container>
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ maxWidth: 400, mx: "auto", mt: 4 }}>
      
      <TextField
        {...register("name")}
        label="Monitor Name"
        fullWidth
        margin="normal"
        error={!!errors.name}
        helperText={errors.name?.message}
      />
      <TextField
        {...register("url")}
        label="URL"
        fullWidth
        margin="normal"
        error={!!errors.url}
        helperText={errors.url?.message}
      />
      <TextField
        {...register("method")}
        label="HTTP Method"
        select
        fullWidth
        margin="normal"
        error={!!errors.method}
        helperText={errors.method?.message}
      >
        <MenuItem value="GET">GET</MenuItem>
        <MenuItem value="POST">POST</MenuItem>
        <MenuItem value="PUT">PUT</MenuItem>
        <MenuItem value="DELETE">DELETE</MenuItem>
        <MenuItem value="PATCH">PATCH</MenuItem>
        <MenuItem value="OPTIONS">OPTIONS</MenuItem>
      </TextField>
      <TextField
        {...register("interval", { valueAsNumber: true })}
        label="Interval (seconds)"
        type="number"
        fullWidth
        margin="normal"
        error={!!errors.interval}
        helperText={errors.interval?.message}
      />
      <TextField
        {...register("expectedStatus", { valueAsNumber: true })}
        label="Expected Status Code"
        type="number"
        fullWidth
        margin="normal"
        error={!!errors.expectedStatus}
        helperText={errors.expectedStatus?.message}
      />
      <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
        Create Monitor
      </Button>
    </Box>
    </Container>
    </motion.div>
  );
};