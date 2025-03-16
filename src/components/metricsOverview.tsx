import { Paper, Stack, Typography } from "@mui/material";

export const MetricsOverview = () => {
  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Typography variant="h6" gutterBottom>
        Metrics Overview
      </Typography>
      <Stack direction="row" spacing={2}>
        <Typography variant="body1">Total Checks: 100</Typography>
        <Typography variant="body1">Successful Checks: 95</Typography>
        <Typography variant="body1">Uptime: 95%</Typography>
        <Typography variant="body1">Avg Response Time: 120ms</Typography>
      </Stack>
    </Paper>
  );
};