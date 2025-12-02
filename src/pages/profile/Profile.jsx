// pages/dashboard/profile.jsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Avatar,
  Typography,
  Grid,
  Divider,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
} from "@mui/material";
import { useTheme, useMediaQuery } from "@mui/material";
import { profileController } from "../../api/profileController";
import { COLORS } from "../../utils/colors";
const formatDate = (iso) => {
  if (!iso) return "-";
  try {
    return new Date(iso).toLocaleDateString();
  } catch {
    return iso;
  }
};

export default function Profile() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    let cancelled = false;
    const fetch = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await profileController.getDetail();
        if (!cancelled) setData(res?.data ?? res ?? null);
      } catch (e) {
        console.error("Failed to fetch admin profile", e);
        if (!cancelled) setError(e?.message || "Failed to load profile");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetch();
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
        <CircularProgress />
      </Box>
    );

  if (error)
    return (
      <Box sx={{ p: 4 }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );

  if (!data)
    return (
      <Box sx={{ p: 4 }}>
        <Typography>No profile details found.</Typography>
      </Box>
    );

  const fullName = data.full_name || data.name || "Admin";
  const avatarLetter = (fullName || "A").charAt(0).toUpperCase();

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      {/* Header */}
      <Paper sx={{ p: { xs: 2, md: 3 }, mb: 3, borderRadius: 2 }} elevation={1}>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <Avatar
              sx={{
                width: isSm ? 64 : 88,
                height: isSm ? 64 : 88,
                bgcolor: COLORS.PRIMARY || "#1976d2",
                fontSize: isSm ? 26 : 34,
              }}
            >
              {avatarLetter}
            </Avatar>
          </Grid>

          <Grid item xs>
            <Typography variant={isSm ? "h6" : "h5"} sx={{ fontWeight: 700 }}>
              {fullName}
            </Typography>

            <Typography color="text.secondary">{data.email ?? "-"}</Typography>

            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ mt: 1, display: "block" }}
            >
              Status:{" "}
              <strong style={{ textTransform: "uppercase" }}>
                {data.status ?? "-"}
              </strong>
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      {/* General info */}
      <Paper sx={{ p: 2, borderRadius: 2 }} elevation={0}>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
          General Information
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <List dense>
          <ListItem>
            <ListItemText primary="Name" secondary={fullName} />
          </ListItem>

          <ListItem>
            <ListItemText primary="Email" secondary={data.email ?? "-"} />
          </ListItem>

          <ListItem>
            <ListItemText
              primary="Phone"
              secondary={data.phone_number ?? "-"}
            />
          </ListItem>

          <ListItem>
            <ListItemText
              primary="User Type"
              secondary={data.user_type ?? "-"}
            />
          </ListItem>

          <ListItem>
            <ListItemText primary="Status" secondary={data.status ?? "-"} />
          </ListItem>

          <ListItem>
            <ListItemText
              primary="Account Created"
              secondary={formatDate(data.created_at)}
            />
          </ListItem>

          <ListItem>
            <ListItemText
              primary="Email Verified"
              secondary={data.is_email_verified ? "Yes" : "No"}
            />
          </ListItem>

          <ListItem>
            <ListItemText
              primary="Phone Verified"
              secondary={data.is_phone_verified ? "Yes" : "No"}
            />
          </ListItem>

          <ListItem>
            <ListItemText
              primary="Verify Status"
              secondary={data.verify_status ?? "-"}
            />
          </ListItem>

          {/* GST / business fields */}
          <ListItem>
            <ListItemText
              primary="GST Registered Company"
              secondary={data.gst_registered_company_name ?? "-"}
            />
          </ListItem>

          <ListItem>
            <ListItemText
              primary="GST Number"
              secondary={data.gst_number ?? "-"}
            />
          </ListItem>

          <ListItem>
            <ListItemText
              primary="GST Registered Email"
              secondary={data.gst_registered_email ?? "-"}
            />
          </ListItem>

          <ListItem>
            <ListItemText
              primary="GST Registered Address"
              secondary={data.gst_registered_address ?? "-"}
            />
          </ListItem>
        </List>
      </Paper>
    </Box>
  );
}
