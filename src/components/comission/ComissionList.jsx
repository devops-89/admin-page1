import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import UpdatePackage from "../../pages/packages/UpdatePackage";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Button,
  Box,
} from "@mui/material";

const ComissionList = ({ data = [], onDeleteClick }) => {
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const currentRows =
    data?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) || [];

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "black" }}>
              <TableCell sx={{ color: "white" }}>Type</TableCell>
              <TableCell sx={{ color: "white" }}>Commission Type</TableCell>
              <TableCell sx={{ color: "white" }}>Percentage</TableCell>
              <TableCell sx={{ color: "white" }}>Status</TableCell>
              <TableCell sx={{ color: "white" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentRows?.map((row, index) => {
              if (!row) return null; // Safety check
              return (
                <TableRow key={row.id || index}>
                  <TableCell>{row?.type || "N/A"}</TableCell>
                  <TableCell>{row?.commission_type || "N/A"}</TableCell>
                  <TableCell>{row?.percentage ?? "N/A"}</TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        px:"4px",
                        py:"2px",
                        borderRadius: 10,
                        color: row?.status === true ? "green" : "red",
                        fontWeight: "bold",
                        textAlign: "center",
                        border: row?.status === true ? "2px solid green" : "2px solid red",
                      }}
                    >
                      {row?.status === true ? "ACTIVE" : "INACTIVE"}
                    </Box>
                  </TableCell>
                  <TableCell align="center" sx={{ padding: "0px" }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100%",
                        gap: "8px",
                        padding: 1,
                      }}
                    >
                      <UpdatePackage packageData={row} />
                      <Button
                        variant="contained"
                        onClick={() => onDeleteClick(row?.id)}
                        sx={{
                          minWidth: "32px",
                          padding: "4px",
                          backgroundColor: "var(--orange-color)",
                          "&:hover": {
                            backgroundColor: "var(--blue-color)",
                          },
                        }}
                      >
                        <DeleteIcon fontSize="small" />
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={data?.length || 0}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[]}
      />
    </Paper>
  );
};

export default ComissionList;
