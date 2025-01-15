import React, { useState, useEffect } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";

export default function CredentialMetricsBarChart() {
  const [data, setData] = useState(null); // State to store fetched data
  const [view, setView] = useState("Last 12 Months"); // State to manage selected view
  const [loading, setLoading] = useState(true); // Loading state

  // Simulate a mock API fetch
  useEffect(() => {
    setTimeout(() => {
      setData({
        labels: [
          "Feb 2024",
          "Mar 2024",
          "Apr 2024",
          "May 2024",
          "Jun 2024",
          "Jul 2024",
          "Aug 2024",
          "Sep 2024",
          "Oct 2024",
          "Nov 2024",
          "Dec 2024",
          "Jan 2025",
        ],
        issuedCredentialTypes: [30, 40, 35, 50, 45, 60, 55, 70, 65, 80, 75, 90],
        issuedCredentials: [
          200, 220, 250, 300, 280, 320, 310, 350, 340, 380, 370, 400,
        ],
        verifications: [
          150, 180, 200, 220, 210, 250, 240, 270, 260, 290, 280, 300,
        ],
      });
      setLoading(false); // Set loading to false once data is fetched
    }, 2000); // Simulate a 2-second API delay
  }, []);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="500px"
      >
        <CircularProgress />
      </Box>
    );
  }

  // Filter data based on the selected range
  let displayedLabels = data.labels;
  let displayedSeries = [
    {
      data: data.issuedCredentialTypes,
      label: "Issued Credential Types",
    },
    {
      data: data.issuedCredentials,
      label: "Issued Credentials",
    },
    {
      data: data.verifications,
      label: "Verifications",
    },
  ];

  if (view === "Last 6 Months") {
    displayedLabels = data.labels.slice(-6); // Last 6 months
    displayedSeries = [
      {
        data: data.issuedCredentialTypes.slice(-6),
        label: "Issued Credential Types",
      },
      {
        data: data.issuedCredentials.slice(-6),
        label: "Issued Credentials",
      },
      {
        data: data.verifications.slice(-6),
        label: "Verifications",
      },
    ];
  } else if (view === "Cumulative") {
    displayedLabels = ["Cumulative"];
    displayedSeries = [
      {
        data: [data.issuedCredentialTypes.reduce((a, b) => a + b, 0)],
        label: "Cumulative Issued Credential Types",
      },
      {
        data: [data.issuedCredentials.reduce((a, b) => a + b, 0)],
        label: "Cumulative Issued Credentials",
      },
      {
        data: [data.verifications.reduce((a, b) => a + b, 0)],
        label: "Cumulative Verifications",
      },
    ];
  }

  return (
    <Box sx={{ backgroundColor: "#FFF", padding: 3, borderRadius: 2 }}>
      {/* Title */}
      <Typography
        variant="h5"
        sx={{ color: "#000", marginBottom: 2 }}
        align="center"
      >
        Credential Metrics
      </Typography>

      {/* Dropdown positioned elegantly */}
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <FormControl size="small" sx={{ minWidth: 200 }}>
          <InputLabel id="view-select-label">View</InputLabel>
          <Select
            labelId="view-select-label"
            value={view}
            onChange={(e) => setView(e.target.value)}
          >
            <MenuItem value="Last 6 Months">Last 6 Months</MenuItem>
            <MenuItem value="Last 12 Months">Last 12 Months</MenuItem>
            <MenuItem value="Cumulative">Cumulative</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Bar Chart */}
      <BarChart
        xAxis={[
          {
            scaleType: "band",
            data: displayedLabels,
            label: "Month-Year",
            labelStyle: { color: "#000" }, // Black for X-axis labels
          },
        ]}
        series={displayedSeries.map((series, index) => ({
          ...series,
          color:
            index === 0
              ? "#A9A9A9" // Cool Grey for Issued Credential Types
              : index === 1
              ? "#87CEEB" // Sky Blue for Issued Credentials
              : "#FFDAB9", // Light Peach for Verifications
        }))}
        width={900} // Adjusted width for better visibility
        height={500} // Adjusted height for better visibility
        legend={{ position: "top", labelStyle: { color: "#000" } }}
      />
    </Box>
  );
}
