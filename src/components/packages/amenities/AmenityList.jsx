import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import UpdatePackage from "../../../pages/packages/UpdatePackage";
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
  Box
} from "@mui/material";
import { COLORS } from "../../../utils/colors.js";
import ReactLoading from "react-loading";

const AmenityList = ({ data, loading }) => {
  const [page, setPage] = useState(0);
  const rowsPerPage = 5;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const currentRows = data.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: 300,
        }}
      >
        <ReactLoading
          type="bars"
          width={40}
          height={40}
          color={COLORS.PRIMARY}
        />
      </Box>
    );
  }

  return (
    <Paper
      sx={{
        width: "100%",
        overflow: "hidden",
        position: "relative",
        height: 394,
        
      }}
    >
      <TableContainer >
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "black" }}>
               <TableCell sx={{ color: "white" }}>Amenity ID</TableCell>
                <TableCell sx={{ color: "white" }}>Amenity Name</TableCell>
                <TableCell sx={{ color: "white" }}>Actions</TableCell>
              </TableRow>
          </TableHead>
          <TableBody>
            {currentRows.map((row, index) => (
              <TableRow key={index}>
                 <TableCell>{row.amenite_id}</TableCell>
                  <TableCell>{row.amenite_name}</TableCell>

                <TableCell align="center" sx={{ padding: "0px" }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "8px",
                      padding: 1,
                    }}
                  >
                    <UpdatePackage />
                    <Button
                      variant="contained"
                      onClick={() => onDeleteClick(row.category_id)}
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
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={data.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[]}
      />
    </Paper>
  );
};

export default AmenityList;
