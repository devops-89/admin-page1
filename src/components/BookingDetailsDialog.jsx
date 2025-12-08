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

// Small helper to avoid repeating the flex row
const Row = ({ label, value }) => (
  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
    <Typography sx={{ fontWeight: 500 }}>{label}:</Typography>
    <Typography sx={{ ml: 1, textAlign: "right" }}>{value}</Typography>
  </Box>
);

/**
 * Build normalized details for HOTEL order
 */
const buildHotelDetails = (row) => {
  const req1 = safeParse(row?.order_request);
  const req2 = safeParse(row?.order_request_second);

  const firstPassenger =
    req1?.HotelRoomsDetails?.[0]?.HotelPassenger?.[0] ?? {};

  return {
    type: "HOTEL",
    // Guest
    guestName:
      `${firstPassenger?.Title ?? ""} ${firstPassenger?.FirstName ?? ""} ${
        firstPassenger?.LastName ?? ""
      }`.trim() || "-",
    guestAge: firstPassenger?.Age ?? "-",
    guestNationality: req1?.GuestNationality ?? "-",
    isLead: firstPassenger?.LeadPassenger ? "Yes" : "No",

    // Hotel
    hotelName: req2?.hotelName ?? "-",
    hotelAddress: req2?.hotelAddress ?? "-",
    roomType: req2?.roomType ?? "-",
    rooms: req2?.rooms ?? "-",
    stayDuration: req2?.stayDuration ?? "-",
    checkIn: req2?.checkIn ?? "-",
    checkOut: req2?.checkOut ?? "-",

    // Pricing
    basePrice: req2?.basePrice ?? null,
    tax: req2?.tax ?? null,
    serviceFees: req2?.serviceFees ?? null,
    netAmount: req1?.NetAmount ?? null,
    bookingCode: req1?.BookingCode ?? "-",
  };
};

/**
 * Build normalized details for FLIGHT order
 */
const buildFlightDetails = (row) => {
  const orderReq = safeParse(row?.order_request);
  const successRes = safeParse(row?.success_response);

  const passenger = orderReq?.Passengers?.[0] ?? {};
  const itin = successRes?.Response?.Response?.FlightItinerary ?? {};
  const seg = itin?.Segments?.[0] ?? {};
  const originAirport = seg?.Origin?.Airport ?? {};
  const destAirport = seg?.Destination?.Airport ?? {};
  const airline = seg?.Airline ?? {};

  return {
    type: "FLIGHT",

    // Passenger
    passengerName:
      `${passenger?.Title ?? ""} ${passenger?.FirstName ?? ""} ${
        passenger?.LastName ?? ""
      }`.trim() || "-",
    passengerEmail: passenger?.Email ?? "-",
    passengerPhone: passenger?.ContactNo ?? "-",
    passengerCity: passenger?.City ?? "-",
    passengerCountry: passenger?.CountryName ?? "-",

    // Flight core
    pnr: itin?.PNR ?? "-",
    bookingId: itin?.BookingId ?? "-",
    journeyType:
      itin?.JourneyType === 1
        ? "ONE WAY"
        : itin?.JourneyType === 2
        ? "ROUND TRIP"
        : itin?.JourneyType === 3
        ? "MULTI TRIP"
        : itin?.JourneyType ?? "-",
    isDomestic: itin?.IsDomestic ? "Yes" : "No",

    // Airline / route
    airlineName: airline?.AirlineName ?? "-",
    airlineCode: airline?.AirlineCode ?? "-",
    flightNumber: airline?.FlightNumber ?? "-",

    originCity: originAirport?.CityName ?? "-",
    originCode: originAirport?.AirportCode ?? "-",
    originName: originAirport?.AirportName ?? "-",
    destCity: destAirport?.CityName ?? "-",
    destCode: destAirport?.AirportCode ?? "-",
    destName: destAirport?.AirportName ?? "-",
    depTime: seg?.Origin?.DepTime ? formatDateTime(seg.Origin.DepTime) : "-",
    arrTime: seg?.Destination?.ArrTime
      ? formatDateTime(seg.Destination.ArrTime)
      : "-",

    // Fare (from itinerary)
    baseFare: itin?.Fare?.BaseFare ?? null,
    tax: itin?.Fare?.Tax ?? null,
    publishedFare: itin?.Fare?.PublishedFare ?? null,
    offeredFare: itin?.Fare?.OfferedFare ?? null,
  };
};

const BookingDetailsDialog = ({ open, onClose, row, onRefund }) => {
  console.log("row is ", row);

  const { paymentEntity, bookingDetails } = useMemo(() => {
    const paymentResponse = safeParse(row?.payment_response);
    const paymentEntity = paymentResponse?.payload?.payment?.entity ?? {};

    let bookingDetails = null;
    if (row?.order_type === "HOTEL") {
      bookingDetails = buildHotelDetails(row);
    } else if (row?.order_type === "FLIGHT") {
      bookingDetails = buildFlightDetails(row);
    }

    return { paymentEntity, bookingDetails };
  }, [row]);

  // ---------------- REFUND STATE ----------------
  const [refundAmount, setRefundAmount] = useState("");
  const [refundError, setRefundError] = useState("");

  const isRefundAllowed =
    row && (row.status === "FAILED" || row.payment_status === "FAILED");

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
    if (num > max)
      return `Refund cannot be more than original amount (₹${max})`;
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
        {/* ORDER SECTION */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            Order
          </Typography>
          <Row label="Order ID" value={row.order_id} />
          <Row label="Custom Order ID" value={row.custom_order_id} />
          <Row label="Order Type" value={row.order_type} />
          <Row label="Status" value={row.status} />
          <Row label="Payment Status" value={row.payment_status} />
          <Row
            label="Amount"
            value={row.amount ? `₹${row.amount}` : "-"}
          />
          <Row label="Created At" value={formatDateTime(row.created_at)} />
        </Box>

        {/* HOTEL DETAILS */}
        {bookingDetails?.type === "HOTEL" && (
          <>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6" sx={{ mb: 1 }}>
                Hotel Booking Details
              </Typography>

              <Row label="Hotel Name" value={bookingDetails.hotelName} />
              <Row label="Address" value={bookingDetails.hotelAddress} />
              <Row label="Room Type" value={bookingDetails.roomType} />
              <Row label="Rooms" value={bookingDetails.rooms} />
              <Row
                label="Stay Duration"
                value={`${bookingDetails.stayDuration} nights`}
              />
              <Row label="Check-in" value={bookingDetails.checkIn} />
              <Row label="Check-out" value={bookingDetails.checkOut} />
            </Box>

            <Divider sx={{ my: 2 }} />
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6" sx={{ mb: 1 }}>
                Guest Details
              </Typography>
              <Row label="Guest Name" value={bookingDetails.guestName} />
              <Row label="Age" value={bookingDetails.guestAge} />
              <Row label="Lead Passenger" value={bookingDetails.isLead} />
              <Row
                label="Guest Nationality"
                value={bookingDetails.guestNationality}
              />
            </Box>

            <Divider sx={{ my: 2 }} />
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6" sx={{ mb: 1 }}>
                Pricing & Technical Details
              </Typography>
              <Row
                label="Net Amount"
                value={
                  bookingDetails.netAmount
                    ? `₹${Number(bookingDetails.netAmount).toFixed(2)}`
                    : "-"
                }
              />
              <Row
                label="Base Price"
                value={
                  bookingDetails.basePrice
                    ? `₹${Number(bookingDetails.basePrice).toFixed(2)}`
                    : "-"
                }
              />
              <Row
                label="Tax"
                value={
                  bookingDetails.tax
                    ? `₹${Number(bookingDetails.tax).toFixed(2)}`
                    : "-"
                }
              />
              <Row
                label="Service Fees"
                value={
                  bookingDetails.serviceFees
                    ? `₹${Number(bookingDetails.serviceFees).toFixed(2)}`
                    : "-"
                }
              />
              {/* <Row label="Booking Code" value={bookingDetails.bookingCode} /> */}
            </Box>
          </>
        )}

        {/* FLIGHT DETAILS */}
        {bookingDetails?.type === "FLIGHT" && (
          <>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6" sx={{ mb: 1 }}>
                Flight Details
              </Typography>
              <Row label="PNR" value={bookingDetails.pnr} />
              <Row label="Booking ID" value={bookingDetails.bookingId} />
              <Row label="Journey Type" value={bookingDetails.journeyType} />
              <Row label="Domestic" value={bookingDetails.isDomestic} />

              <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
                Route
              </Typography>
              <Row
                label="From"
                value={`${bookingDetails.originCity} (${bookingDetails.originCode}) - ${bookingDetails.originName}`}
              />
              <Row
                label="To"
                value={`${bookingDetails.destCity} (${bookingDetails.destCode}) - ${bookingDetails.destName}`}
              />
              <Row label="Departure" value={bookingDetails.depTime} />
              <Row label="Arrival" value={bookingDetails.arrTime} />

              <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
                Airline
              </Typography>
              <Row
                label="Airline"
                value={`${bookingDetails.airlineName} (${bookingDetails.airlineCode})`}
              />
              <Row label="Flight Number" value={bookingDetails.flightNumber} />
            </Box>

            <Divider sx={{ my: 2 }} />
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6" sx={{ mb: 1 }}>
                Passenger
              </Typography>
              <Row label="Name" value={bookingDetails.passengerName} />
              <Row label="Email" value={bookingDetails.passengerEmail} />
              <Row label="Phone" value={bookingDetails.passengerPhone} />
              <Row label="City" value={bookingDetails.passengerCity} />
              <Row label="Country" value={bookingDetails.passengerCountry} />
            </Box>

            <Divider sx={{ my: 2 }} />
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6" sx={{ mb: 1 }}>
                Fare
              </Typography>
              <Row
                label="Base Fare"
                value={
                  bookingDetails.baseFare
                    ? `₹${Number(bookingDetails.baseFare).toFixed(2)}`
                    : "-"
                }
              />
              <Row
                label="Tax"
                value={
                  bookingDetails.tax
                    ? `₹${Number(bookingDetails.tax).toFixed(2)}`
                    : "-"
                }
              />
              <Row
                label="Published Fare"
                value={
                  bookingDetails.publishedFare
                    ? `₹${Number(bookingDetails.publishedFare).toFixed(2)}`
                    : "-"
                }
              />
              <Row
                label="Offered Fare"
                value={
                  bookingDetails.offeredFare
                    ? `₹${Number(bookingDetails.offeredFare).toFixed(2)}`
                    : "-"
                }
              />
            </Box>
          </>
        )}

        {/* PAYMENT DETAILS (from payment_response) */}
        <Divider sx={{ my: 2 }} />
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            Payment
          </Typography>
          <Row label="Payment ID" value={paymentEntity.id ?? "-"} />
          <Row label="Order ID" value={paymentEntity.order_id ?? "-"} />
          <Row label="Method" value={paymentEntity.method ?? "-"} />
          {/* <Row label="Status" value={paymentEntity.status ?? "-"} /> */}
          <Row
            label="Amount"
            value={
              paymentEntity.amount
                ? `₹${(paymentEntity.amount / 100).toFixed(2)}`
                : "-"
            }
          />
        </Box>

        {/* REFUND SECTION – ONLY FOR FAILED STATUS */}
        {isRefundAllowed && (
          <>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6" sx={{ mb: 1 }}>
                Refund
              </Typography>

              <Row
                label="Original Amount"
                value={row.amount ? `₹${row.amount}` : "-"}
              />

              <Box sx={{ mt: 1 }}>
                <TextField
                  label="Refund Amount"
                  type="number"
                  fullWidth
                  value={refundAmount}
                  onChange={handleRefundAmountChange}
                  error={Boolean(refundError)}
                  helperText={
                    refundError || "Enter amount up to original value"
                  }
                  inputProps={{ min: 0, step: "0.01" }}
                />
              </Box>
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
