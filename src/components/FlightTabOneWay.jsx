import React, { useEffect, useMemo, useState } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import GenericTable from "./GenericTable.jsx";
import { bookingController } from "../api/bookingController.js";

const safeParse = (v) => {
  if (!v) return {};
  if (typeof v === "object") return v;
  try {
    return JSON.parse(v);
  } catch {
    return {};
  }
};
const formatOrderTime = (isoString) => {
  if (!isoString) return "-";
  const date = new Date(isoString);

  const fmt = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const parts = fmt.formatToParts(date).reduce((acc, p) => {
    acc[p.type] = p.value;
    return acc;
  }, {});

  // Ensure uppercase AM/PM
  const day = parts.day ?? "";
  const month = parts.month ?? "";
  const year = parts.year ?? "";
  const hour = parts.hour ?? "";
  const minute = parts.minute ?? "";
  const dayPeriod = (parts.dayPeriod || "").toUpperCase();

  return `${day} ${month} ${year}, ${hour}:${minute} ${dayPeriod}`;
};

// const formatIST = (iso) => {
//   if (!iso) return "-";
//   const d = new Date(iso);
//   const fmt = new Intl.DateTimeFormat("en-GB", {
//     timeZone: "Asia/Kolkata",
//     day: "2-digit",
//     month: "short",
//     year: "numeric",
//     hour: "2-digit",
//     minute: "2-digit",
//     hour12: true,
//   });
//   const p = fmt
//     .formatToParts(d)
//     .reduce((a, x) => ({ ...a, [x.type]: x.value }), {});
//   return `${p.day} ${p.month} ${p.year}, ${p.hour}:${p.minute} ${(
//     p.dayPeriod || ""
//   ).toUpperCase()}`;
// };
// // const airportCode = (od) =>
// //   od?.Airport?.AirportName || od?.Airport?.CityName || "-";
const countPax = (arr = [], type) =>
  arr.filter((p) => Number(p?.PaxType) === type).length;

// const cabinClassText = (n) => {
//   switch (Number(n)) {
//     case 2:
//       return "Economy";
//     case 3:
//       return "Premium Economy";
//     case 4:
//       return "Business";
//     case 5:
//       return "Premium Business";
//     case 6:
//       return "First";
//     default:
//       return "-";
//   }
// };

const normalizeJourneyType = (val = "") => {
  const v = String(val).toUpperCase().replace(/\s+/g, "");
  if (v === "ONEWAY" || v === "ONE-WAY") return "ONEWAY";
  if (["ROUNDTRIP", "ROUND-TRIP", "RETURN", "ROUNDWAY"].includes(v))
    return "ROUNDTRIP";
  if (["MULTICITY", "MULTI-CITY", "MULTIWAY"].includes(v)) return "MULTICITY";
  return "UNKNOWN";
};

const FlightTabOneWay = ({ onView }) => {
  const columns = useMemo(
    () => [
      { key: "journey_scope", label: "Journey" },
      { key: "price_amount", label: "Price" },
      { key: "order_time", label: "Order Time" },
      //   { key: "from", label: "From" },
      //   { key: "to", label: "To" },
      //   { key: "depart_date", label: "Departure Date" },
      { key: "adult", label: "Adults" },
      { key: "children", label: "Children" },
      { key: "infant", label: "Infants" },
      //   { key: "class", label: "Class" },
      { key: "status", label: "Status" },
    ],
    []
  );

  const [rows, setRows] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const table_heading = useMemo(
    () => ({
      heading: "One-way bookings",
      para: rows.length
        ? "Explore, book, and track your flights conveniently."
        : "No Data Found",
    }),
    [rows.length]
  );

  useEffect(() => {
    let cancel = false;
    (async () => {
      setLoading(true);
      setError("");
      try {
        const res = await bookingController.getBookings({
          page,
          limit: pageSize,
          orderType: "FLIGHT",
        });
        const docs = res?.data?.docs ?? (Array.isArray(res) ? res : []);
        const filtered = docs.filter(
          (d) => normalizeJourneyType(d?.journey_type) === "ONEWAY"
        );

        const mapped = filtered.map((b) => {
          const orderTime = formatOrderTime(b.created_at);
          const req = safeParse(b.order_request);
          //   const succ = safeParse(b.success_response);
          const pax = Array.isArray(req?.Passengers) ? req.Passengers : [];

          //   const seg0 =
          //     succ?.Response?.Response?.FlightItinerary?.Segments?.[0] || null;
          //   const from = seg0 ? airportCode(seg0.Origin) : "-";
          //   const to = seg0 ? airportCode(seg0.Destination) : "-";
          //   const depart = formatIST(seg0?.Origin?.DepTime);
          //   const cabin = cabinClassText(seg0?.CabinClass);

          return {
            ...b,
            journey_scope: b.journey,
            price_amount: b.amount,
            order_time: orderTime,
            // from,
            // to,
            // depart_date: depart,
            adult: countPax(pax, 1),
            children: countPax(pax, 2),
            infant: countPax(pax, 3),
            // class: cabin,
            status: b.status ?? "-",
          };
        });

        if (!cancel) {
          setRows(mapped);
          const totalAll = res?.data?.totalDocs;
          setPageSize(totalAll);
        }
      } catch (e) {
        if (!cancel) setError(e?.message || "Failed to load flight bookings");
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
    <GenericTable
      data={rows}
      columns={columns}
      table_heading={table_heading}
      onActionClick={(id) => onView?.(id)}
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
  );
};

export default FlightTabOneWay;
