import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  MenuItem,
  FormControl,
  Pagination,
  Box,
  Avatar,
  Typography,
} from "@mui/material";
import Select from "@mui/material/Select";
import { useDebounce } from "../hooks/debounce";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import BookingDetailsDialog from "./BookingDetailsDialog";
import { refundController } from "../api/refundController";
const DataTable = ({
  data,
  columns,
  table_heading,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const debounceSearchTerm = useDebounce(searchTerm, 500);

  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const filteredData = data.filter((item) =>
    columns.some((column) =>
      String(item[column.key])
        .toLowerCase()
        .includes(debounceSearchTerm.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredData.length / entriesPerPage);
  const displayedData = filteredData.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );
  const handleOpenDialog = (row) => {
    setSelectedRow(row);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedRow(null);
  };

const handleRefund = async ({ orderId, refundAmount, row }) => {
  console.log("Refund initiated:", { orderId, refundAmount, row });

  try {
    const res = await refundController.initiateRefund({
      orderId,
      amount: refundAmount,
    });

    console.log("Refund API success", res);

    if (res?.message) {
      alert(res.message); 
    } else {
      alert("Refund processed successfully");
    }

    setOpenDialog(false); 
  } catch (err) {
    console.error("Refund API failed:", err);

    const msg = err?.message || err?.error || "Refund failed";
    alert(msg);
  }
};


  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: { xs: "center", sm: "center", md: "space-between" },
          alignItems: "center",
          flexWrap: "wrap",
          marginBottom: 2,
        }}
      >
        <Box>
          <Typography
            variant="h4"
            sx={{
              fontSize: "20px",
              fontWeight: "600",
              marginBottom: "5px",
              textAlign: { xs: "center", sm: "center", md: "start" },
              "@media (min-width: 831px) and (max-width: 900px)": {
                textAlign: "start",
              },
            }}
          >
            {table_heading.heading}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: "15px",
              fontWeight: "400",
              marginBottom: "5px",
              textAlign: { xs: "center", sm: "center", md: "start" },
              "@media (min-width: 831px) and (max-width: 900px)": {
                textAlign: "start",
              },
            }}
          >
            {table_heading.para}
          </Typography>
        </Box>

        <Box sx={{ display: "flex" }}>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            {/* <InputLabel id="entries-per-page-label">Entries</InputLabel> */}
            <Select
              labelId="entries-per-page-label"
              value={entriesPerPage}
              sx={{
                backgroundColor: "var(--white-color)",
                marginRight: "10px",
              }}
              onChange={(e) => setEntriesPerPage(parseInt(e.target.value))}
            >
              {[5, 10, 20, 50].map((count) => (
                <MenuItem key={count} value={count}>
                  {count}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            size="small"
            label="Search"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ backgroundColor: "var(--white-color)" }}
          />
        </Box>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: "var(--sidebar-color)" }}>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  sx={{
                    fontSize: "16px",
                    fontWeight: "500",
                    color: "var(--white-color)",
                    textAlign: "center",
                  }}
                  key={column.key}
                >
                  {column.label}
                </TableCell>
              ))}
              <TableCell
                sx={{
                  fontSize: "16px",
                  fontWeight: "500",
                  color: "var(--white-color)",
                }}
              >
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* {console.log(displayedData)}  */}

            {displayedData.length != 0 ? (
              displayedData.map((item) => (
                <TableRow
                  key={item.id}
                  sx={{
                    "&:hover": {
                      backgroundColor: "rgba(0, 0, 0, 0.08)",
                    },
                  }}
                >
                  {columns.map((column) => (
                    <TableCell key={column.key} sx={{ textAlign: "center" }}>
                      {column.key === "avatar" ? (
                        <Avatar
                          src={item[column.key] || <AccountCircleIcon />}
                        />
                      ) : (
                        item[column.key] ?? "-"
                      )}
                    </TableCell>
                  ))}
                  <TableCell>
                    <Button
                      variant="contained"
                      size="small"
                      // onClick={(_, id = item.id) => {
                      //   navigate(actionPath);
                      // }}
                      onClick={() => handleOpenDialog(item)}
                      sx={{
                        backgroundColor: "var(--orange-color)",
                        marginRight: "5px",
                        "&:hover": {
                          backgroundColor: "var(--blue-color)",
                        },
                      }}
                    >
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell sx={{ fontSize: "16px" }}>No Data Found</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: 2 }}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={(_, page) => setCurrentPage(page)}
          sx={{
            "& .MuiButtonBase-root": {
              backgroundColor: "var(--orange-color)",
              color: "var(--white-color)",
            },
            "& .Mui-selected": {
              color: "var(--black-color)",
              backgroundColor: "var(--table-head-color)",
            },
            "& :hover": { color: "var(--black-color)" },
          }}
        />
      </Box>
      <BookingDetailsDialog
        open={openDialog}
        onClose={handleCloseDialog}
        row={selectedRow}
        onRefund={handleRefund}
      />

    </Box>
  );
};

export default DataTable;
