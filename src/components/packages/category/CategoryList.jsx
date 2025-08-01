import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import UpdateCategory from "./UpdateCategory";
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
  Typography,
  Box,
} from "@mui/material";
import ReactLoading from "react-loading";
import { COLORS } from "../../../utils/colors";
const CategoryList = ({ data, loading }) => {
  const [page, setPage] = useState(0);
  const rowsPerPage = 4;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const currentRows =
    data?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) || [];

    if(data.length<=0){
      return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: 300,
        }}
      >
        <Typography variant="h6" sx={{ color: COLORS.RED }}>
          No Package Categories Available!
        </Typography>
      </Box>
    );
    }

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
        minHeight: 394,
        
      }}
    >
      <TableContainer >
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "black" }}>
              <TableCell sx={{ color: "white" }}>Category ID</TableCell>
              <TableCell sx={{ color: "white" }}>Category Name</TableCell>
              <TableCell sx={{ color: "white" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentRows.map((row, index) => (
              <TableRow key={index}>
               <TableCell>
                <img
                  src={row.category_image}
                  alt={row.category_name}
                  style={{
                    width: 40,
                    height: 40,
                    objectFit: "cover",
                    borderRadius: "50%",
                  }}
                />
              </TableCell>
                <TableCell>{row.category_name}</TableCell>
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
                   <UpdateCategory categoryData={row} />
                  
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

export default CategoryList;
