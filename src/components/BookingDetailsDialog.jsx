// src/components/BookingDetailsDialog.jsx
import React, { useMemo, useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  Button,
  Divider,
  TextField,
} from "@mui/material";

const safeParse = (maybeJson) => {
  if (!maybeJson) return {};
  if (typeof maybeJson === "object") return maybeJson;
  try {
    return JSON.parse(maybeJson);
  } catch {
    return {};
  }
};

const formatDateTime = (isoString) => {
  if (!isoString) return "-";
  const d = new Date(isoString);
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(d);
};

const BookingDetailsDialog = ({ open, onClose, row, onRefund }) => {
  console.log("row is ", row);

  const { paymentEntity } = useMemo(() => {
    const paymentResponse = safeParse(row?.payment_response);
    const paymentEntity = paymentResponse?.payload?.payment?.entity ?? {};
    return { paymentEntity };
  }, [row]);

  // ---------------- REFUND STATE ----------------
  const [refundAmount, setRefundAmount] = useState("");
  const [refundError, setRefundError] = useState("");

  // Show refund only when status is FAILED (order or payment)
  const isRefundAllowed =
    row &&
    (row.status === "FAILED" || row.payment_status === "FAILED");

  // Prefill refund amount when row changes
  useEffect(() => {
    if (!row) {
      setRefundAmount("");
      setRefundError("");
      return;
    }

    const originalAmount = Number(row.amount || 0);
    setRefundAmount(originalAmount ? String(originalAmount) : "");
    setRefundError("");
  }, [row]);

  const validateRefund = (value, max) => {
    if (!value) return "Refund amount is required";
    const num = Number(value);
    if (Number.isNaN(num)) return "Enter a valid number";
    if (num <= 0) return "Amount must be greater than 0";
    if (num > max) return `Refund cannot be more than original amount (₹${max})`;
    return "";
  };

  const handleRefundAmountChange = (e) => {
    const val = e.target.value;
    setRefundAmount(val);

    const max = Number(row?.amount || 0);
    const err = validateRefund(val, max);
    setRefundError(err);
  };

  const handleRefundClick = () => {
    const max = Number(row?.amount || 0);
    const err = validateRefund(refundAmount, max);
    if (err) {
      setRefundError(err);
      return;
    }

    if (onRefund) {
      onRefund({
        orderId: row?.order_id,
        refundAmount: Number(refundAmount),
        row,
      });
    }
  };

  const handleClose = () => {
    setRefundAmount("");
    setRefundError("");
    onClose?.();
  };

  const isRefundDisabled =
    !isRefundAllowed ||
    !row ||
    !refundAmount ||
    !!refundError ||
    Number(row?.amount || 0) <= 0;

  // ----------------------------------------------------

  if (!row) {
    return (
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Booking Details</DialogTitle>
        <DialogContent dividers>
          <Typography>No booking selected.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle>Booking Details</DialogTitle>
      <DialogContent dividers>
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            Order
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
            <Typography sx={{ fontWeight: 500 }}>Order ID:</Typography>
            <Typography>{row.order_id}</Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
            <Typography sx={{ fontWeight: 500 }}>Custom Order ID:</Typography>
            <Typography>{row.custom_order_id}</Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
            <Typography sx={{ fontWeight: 500 }}>Order Type:</Typography>
            <Typography>{row.order_type}</Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
            <Typography sx={{ fontWeight: 500 }}>Status:</Typography>
            <Typography>{row.status}</Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
            <Typography sx={{ fontWeight: 500 }}>Payment Status:</Typography>
            <Typography>{row.payment_status}</Typography>
          </Box>
          {/* <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
            <Typography sx={{ fontWeight: 500 }}>Amount:</Typography>
            <Typography>₹{row.amount}</Typography>
          </Box> */}
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
            <Typography sx={{ fontWeight: 500 }}>Created At:</Typography>
            <Typography>{formatDateTime(row.created_at)}</Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* PAYMENT DETAILS (from payment_response) */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            Payment
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
            <Typography sx={{ fontWeight: 500 }}>Payment ID:</Typography>
            <Typography>{paymentEntity.id ?? "-"}</Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
            <Typography sx={{ fontWeight: 500 }}>Order ID:</Typography>
            <Typography>{paymentEntity.order_id ?? "-"}</Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
            <Typography sx={{ fontWeight: 500 }}>Method:</Typography>
            <Typography>{paymentEntity.method ?? "-"}</Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
            <Typography sx={{ fontWeight: 500 }}>Status:</Typography>
            <Typography>{paymentEntity.status ?? "-"}</Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
            <Typography sx={{ fontWeight: 500 }}>Amount :</Typography>
            <Typography>
              {paymentEntity.amount
                ? `₹${(paymentEntity.amount / 100).toFixed(2)}`
                : "-"}
            </Typography>
          </Box>
          {/* <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
            <Typography sx={{ fontWeight: 500 }}>VPA:</Typography>
            <Typography>
              {paymentEntity.vpa ?? paymentEntity?.upi?.vpa ?? "-"}
            </Typography>
          </Box> */}
          {/* <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
            <Typography sx={{ fontWeight: 500 }}>RRN:</Typography>
            <Typography>{paymentEntity.acquirer_data?.rrn ?? "-"}</Typography>
          </Box> */}
        </Box>

        {/* REFUND SECTION – ONLY FOR FAILED STATUS */}
        {isRefundAllowed && (
          <>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ mb: 1 }}>
              <Typography variant="h6" sx={{ mb: 1 }}>
                Refund
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Original Amount: ₹{row.amount ?? "-"}
              </Typography>

              <TextField
                label="Refund Amount"
                type="number"
                fullWidth
                value={refundAmount}
                onChange={handleRefundAmountChange}
                error={Boolean(refundError)}
                helperText={refundError || "Enter amount up to original value"}
                inputProps={{ min: 0, step: "0.01" }}
              />
            </Box>
          </>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
        {isRefundAllowed && (
          <Button
            variant="contained"
            onClick={handleRefundClick}
            disabled={isRefundDisabled}
              sx={{
                        backgroundColor: "var(--orange-color)",
                        marginRight: "5px",
                        "&:hover": {
                          backgroundColor: "var(--blue-color)",
                        },
                      }}
          >
            Refund
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default BookingDetailsDialog;
