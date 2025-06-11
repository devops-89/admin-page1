import React from "react";
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
  Select,
} from "@mui/material";
import moment from "moment";
import { useNavigate } from "react-router-dom";
const InactiveCustomers = ({
  data,
  columns,
  setSearchTerm,
  searchTerm,
  debounceSearchTerm,
  pageSize,
  totalPages,
  page,
  setPage,
  setPageSize,
}) => {
  const navigate = useNavigate();
  const tableHeading = {
    heading: "Inactive Customers",
    para: "These are the customers currently marked as inactive in the system.",
  };
  const inactiveCustomers = data.filter(
    (customer) => customer.status === "INACTIVE"
  );
  const filteredData = inactiveCustomers.filter((item) =>
    columns.some((column) =>
      String(item[column.key] || "")
        .toLowerCase()
        .includes(debounceSearchTerm.toLowerCase())
    )
  );
  return (
    <Box>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: { xs: "center", md: "space-between" },
          alignItems: "center",
          flexWrap: "wrap",
          mb: 2,
        }}
      >
        <Box>
          <Typography
            variant="h4"
            sx={{
              fontSize: "18px",
              fontWeight: 600,
              mb: "5px",
              textAlign: { xs: "center", md: "start" },
            }}
          >
            {tableHeading.heading}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: "15px",
              fontWeight: 400,
              textAlign: { xs: "center", md: "start" },
            }}
          >
            {tableHeading.para}
          </Typography>
        </Box>
        {/* Controls */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <FormControl size="small" sx={{ minWidth: 120, mr: 1 }}>
            <Select
              value={pageSize}
              onChange={(e) => setPageSize(parseInt(e.target.value))}
              sx={{ backgroundColor: "var(--white-color)" }}
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
      {/* Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: "var(--sidebar-color)" }}>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.key}
                  sx={{
                    fontSize: "16px",
                    fontWeight: 500,
                    color: "var(--white-color)",
                    textAlign: "center",
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
              <TableCell
                sx={{
                  fontSize: "16px",
                  fontWeight: 500,
                  color: "var(--white-color)",
                }}
              >
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.length > 0 ? (
              filteredData.map((item) => (
                <TableRow
                  key={item.id}
                  sx={{ "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.08)" } }}
                >
                  {columns.map((column) => (
                    <TableCell key={column.key} sx={{ textAlign: "center" }}>
                      {(() => {
                        const value = item[column.key];
                        switch (column.key) {
                          case "avatar":
                            return (
                              <Avatar src={value} alt={value} />
                            );
                          case "created_at":
                          case "last_login":
                            return value
                              ? moment(value).format("Do MMM YYYY")
                              : "-";
                          case "status":
                            return (
                              <span className={value === "ACTIVE" ? "green" : "red"}>
                                {value}
                              </span>
                            );
                          default:
                            return value || "-";
                        }
                      })()}
                    </TableCell>
                  ))}
                  <TableCell>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() =>
                        navigate("/dashboard/customers/customer-details", {
                          state: { item },
                        })
                      }
                      sx={{
                        backgroundColor: "var(--orange-color)",
                        mr: 1,
                        "&:hover": {
                          backgroundColor: "var(--blue-color)",
                        },
                      }}
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length + 1}
                  sx={{ textAlign: "center", fontSize: "16px" }}
                >
                  No Data Found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Pagination */}
      {filteredData.length > 0 && (
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(_, newPage) => setPage(newPage)}
            sx={{
              "& .MuiButtonBase-root": {
                backgroundColor: "var(--orange-color)",
                color: "var(--white-color)",
              },
              "& .Mui-selected": {
                color: "var(--black-color)",
                backgroundColor: "var(--table-head-color)",
              },
              "& :hover": {
                color: "var(--black-color)",
              },
            }}
          />
        </Box>
      )}
    </Box>
  );
};
export default InactiveCustomers;