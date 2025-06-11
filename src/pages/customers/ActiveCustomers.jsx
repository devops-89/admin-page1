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

const ActiveCustomers = ({
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

  const table_heading = {
    heading: "Active Customers",
    para: "These are the customers currently marked as active in the system.",
  };

  const activeCustomers = data.filter((customer) => customer.status === "ACTIVE");

  const filteredData = activeCustomers.filter((item) =>
    columns.some((column) =>
      String(item[column.key] || "")
        .toLowerCase()
        .includes(debounceSearchTerm.toLowerCase())
    )
  );

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
              fontSize: "18px",
              fontWeight: "600",
              marginBottom: "5px",
              textAlign: { xs: "center", md: "start" },
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
              textAlign: { xs: "center", md: "start" },
            }}
          >
            {table_heading.para}
          </Typography>
        </Box>

        <Box sx={{ display: "flex" }}>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <Select
              value={pageSize}
              sx={{
                backgroundColor: "var(--white-color)",
                marginRight: "10px",
              }}
              onChange={(e) => setPageSize(parseInt(e.target.value, 10))}
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
                  key={column.key}
                  sx={{
                    fontSize: "16px",
                    fontWeight: "500",
                    color: "var(--white-color)",
                     textAlign:'center'
                  }}
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
            {filteredData.length > 0 ? (
              filteredData.map((item) => (
                <TableRow
                  key={item.id}
                  sx={{ "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.08)" } }}
                >
                  {columns.map((column) => (
                    <TableCell key={column.key} sx={{ textAlign: "center" }}>
                      {(() => {
                        switch (column.key) {
                          case "avatar":
                            return (
                              <Avatar
                                src={item[column.key]}
                                alt={item[column.key]}
                              />
                            );
                          case "created_at":
                            return moment(item[column.key] || "-").format(
                              "Do MMM YYYY"
                            );
                          case "status":
                            return <span className={item[column.key] == 'ACTIVE' ? 'green' : 'red'}>{item[column.key]}</span>
                          case "last_login":
                            return item[column.key]
                              ? moment(item[column.key]).format("Do MMM YYYY")
                              : "-";
                          default:
                            return item[column.key] || "-";
                        }
                      })()}
                    </TableCell>
                  ))}
                  <TableCell>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => navigate("/dashboard/customers/customer-details", {state : {item}})}
                      sx={{
                        backgroundColor: "var(--orange-color)",
                        marginRight: "5px",
                        "&:hover": { backgroundColor: "var(--blue-color)" },
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
                  sx={{ fontSize: "16px", textAlign: "center" }}
                >
                  No Data Found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: 2 }}>
        {filteredData.length > 0 ? <Pagination
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
            "& :hover": { color: "var(--black-color)" },
          }}
        /> : ''}
      </Box>
    </Box>
  );
};

export default ActiveCustomers;
