import { Monitor } from "../types/types";

export const mockMonitors: Monitor[] = [
  {
    id: "1",
    name: "Google",
    url: "https://google.com",
    method: "GET",
    interval: 60,
    expectedStatus: 200,
    alertsEnabled: true,
    userId: "1",
    createdAt: "2023-10-01T12:00:00Z",
    updatedAt: "2023-10-01T12:00:00Z",
    totalChecks: 100,
    successfulChecks: 95,
    uptimePercentage: 95.0,
    avgResponseTime: 120,
    lastCheckTime: "2023-10-10T12:00:00Z",
  },
  {
    id: "2",
    name: "GitHub",
    url: "https://github.com",
    method: "GET",
    interval: 60,
    expectedStatus: 200,
    alertsEnabled: true,
    userId: "1",
    createdAt: "2023-10-01T12:00:00Z",
    updatedAt: "2023-10-01T12:00:00Z",
    totalChecks: 100,
    successfulChecks: 98,
    uptimePercentage: 98.0,
    avgResponseTime: 200,
    lastCheckTime: "2023-10-10T12:00:00Z",
  },

  {
    id: "3",
    name: "Yahoo",
    url: "https://github.com",
    method: "GET",
    interval: 60,
    expectedStatus: 200,
    alertsEnabled: true,
    userId: "1",
    createdAt: "2023-10-01T12:00:00Z",
    updatedAt: "2023-10-01T12:00:00Z",
    totalChecks: 100,
    successfulChecks: 98,
    uptimePercentage: 98.0,
    avgResponseTime: 200,
    lastCheckTime: "2023-10-10T12:00:00Z",
  },
];