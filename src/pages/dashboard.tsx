import { useState, useEffect } from "react";
import { Container, Typography, CircularProgress, Alert, Button, Box, Grid } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { mockMonitors } from "../mocks/monitors"; 
import { Monitor } from "../types/types";
import { Header } from "../components/header";
import { MonitorCard } from "../components/monitorCard";
import { MetricsOverview } from "../components/metricsOverview";

export const Dashboard = () => {
  const navigate = useNavigate();
  const [monitors, setMonitors] = useState<Monitor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error] = useState<string | null>(null);

  useEffect(() => {
    setTimeout(() => {
      setMonitors(mockMonitors); 
      setIsLoading(false);
    }, 1000); 
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  if (isLoading) return <CircularProgress sx={{ display: "block", mx: "auto", mt: 4 }} />;
  if (error) return <Alert severity="error">Error loading monitors</Alert>;

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Header />
      <Container>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <Typography variant="h4" sx={{ mt: 4 }}>
            Monitors
          </Typography>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/create-monitor")}
            >
              Create Monitor
            </Button>
            <Button variant="contained" color="error" onClick={handleLogout}>
              Logout
            </Button>
          </Box>
        </Box>

        <MetricsOverview />
        
        <Grid container spacing={3}>
          {monitors.map((monitor) => (
            <Grid item xs={12} sm={6} md={4} key={monitor.id}>
              <MonitorCard monitor={monitor} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </motion.div>
  );
};