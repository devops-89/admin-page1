import React, { useEffect, useMemo, useState } from "react";
import GenericTable from "../components/GenericTable.jsx";
// import { data } from "../assets/data.js";
import { bookingController } from "../api/bookingController.js";
import FullScreenDialog from "../components/FullScreenDialog.jsx";
import { CircularProgress, Box, Typography } from "@mui/material";

const safeParse = (maybeJson) => {
  if (!maybeJson) return {};
  if (typeof maybeJson === "object") return maybeJson;
  try {
    return JSON.parse(maybeJson);
  } catch {
    return {};
  }
};
// const formatOrderTime = (isoString) => {
//   if (!isoString) return "-";
//   const date = new Date(isoString);

//   const fmt = new Intl.DateTimeFormat("en-GB", {
//     timeZone: "Asia/Kolkata",
//     day: "2-digit",
//     month: "short",
//     year: "numeric",
//     hour: "2-digit",
//     minute: "2-digit",
//     hour12: true,
//   });

//   const parts = fmt.formatToParts(date).reduce((acc, p) => {
//     acc[p.type] = p.value;
//     return acc;
//   }, {});

//   // Ensure uppercase AM/PM
//   const day = parts.day ?? "";
//   const month = parts.month ?? "";
//   const year = parts.year ?? "";
//   const hour = parts.hour ?? "";
//   const minute = parts.minute ?? "";
//   const dayPeriod = (parts.dayPeriod || "").toUpperCase();

//   return `${day} ${month} ${year}, ${hour}:${minute} ${dayPeriod}`;
// };

const HotelsList = () => {
  const columns = [
    // { key: "id", label: "ID" },
    // { key: "city", label: "City" },
    { key: "hotel_name", label: "Hotel Name" },
    // { key: "order_time", label: "Order Time" },
    { key: "room", label: "Room" },
    { key: "check_in", label: "Check In" },
    { key: "check_out", label: "Check Out" },
    { key: "status", label: "Status" },
  ];

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const [rows, setRows] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleView = (id) => {
    setSelectedId("hotelList_" + id);
    setOpenDialog(true);
  };

  const table_heading = {
    heading: "Hotel Bookings",
    para: "Browse, book, and manage your hotel stays with ease.",
  };

  useEffect(() => {
    let cancel = false;

    (async () => {
      setLoading(true);
      setError("");
      try {
        const res = await bookingController.getBookings({
          page,
          limit: pageSize,
          orderType: "HOTEL",
        });

        const docs = res?.data?.docs ?? (Array.isArray(res) ? res : []);

        const mapped = docs.map((b) => {
          const req2 = safeParse(b.order_request_second);
          // const req1 = safeParse(b.order_request);

          return {
            ...b,
            hotel_name: req2.hotelName ?? "-",
            // order_time: formatOrderTime(b.created_at),
            room: req2.roomType ?? "-",
            check_in: req2.checkIn ?? "-",
            check_out: req2.checkOut ?? "-",
            status: b.status ?? "-",
          };
        });

        if (!cancel) {
          setRows(mapped);
          const computedTotal =
            res?.data?.totalDocs ?? res?.total ?? res?.count ?? docs.length ?? 0;
          setPageSize(computedTotal);  
        }
      } catch (e) {
        if (!cancel) setError(e?.message || "Failed to load hotel bookings");
      } finally {
        if (!cancel) setLoading(false);
      }
    })();

    return () => {
      cancel = true;
    };
  }, [page, pageSize]);

  if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
        <CircularProgress />
      </Box>
    );
  if (error) return <Typography color="error">{error}</Typography>;
  return (
    <>
      <GenericTable
        data={rows}
        columns={columns}
        onActionClick={handleView}
        table_heading={table_heading}
        serverPagination
        total={total}
        page={page}
        pageSize={pageSize}
        onPageChange={setPage}
        onPageSizeChange={(sz) => {
          setPageSize(sz);
          setPage(1);
        }}
      />
      <FullScreenDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        selectedId={selectedId}
      />
    </>
  );
};

export default HotelsList;
