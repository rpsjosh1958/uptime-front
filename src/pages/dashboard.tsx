import { useQuery } from "@tanstack/react-query";
import { getMonitors } from "../api/monitor";
import { Container, Typography, List, ListItem, ListItemText, CircularProgress, Alert, Button, Box } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
  const navigate = useNavigate();

  const { data, isLoading, error } = useQuery({
    queryKey: ["monitors"],
    queryFn: () => getMonitors(1, 10),
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  // Log the error for debugging
  if (error) {
    console.error("Error fetching monitors:", error);
  }

  if (isLoading) return <CircularProgress sx={{ display: "block", mx: "auto", mt: 4 }} />;
  if (error) return <Alert severity="error">Error loading monitors</Alert>;

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Container>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <Typography variant="h4" sx={{ mt: 4 }}>
            Monitors
          </Typography>
          <Button variant="contained" color="error" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
        <List>
          {data?.data.map((monitor) => (
            <motion.div
              key={monitor.id}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ListItem sx={{ mb: 2, boxShadow: 3, borderRadius: 2 }}>
                <ListItemText
                  primary={monitor.name}
                  secondary={`URL: ${monitor.url} | Status: ${monitor.expectedStatus}`}
                />
              </ListItem>
            </motion.div>
          ))}
        </List>
      </Container>
    </motion.div>
  );
};