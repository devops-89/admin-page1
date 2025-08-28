import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import UpdatePackage from '../../pages/packages/UpdatePackage';
import { Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, TablePagination, Button,Box} from "@mui/material";

const PackageList = ({ data }) => {
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;

 const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const currentRows = data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: 'black' }}>
              <TableCell sx={{ color: 'white' }}>Package Name</TableCell>
              <TableCell sx={{ color: 'white' }}>Package Days</TableCell>
              <TableCell sx={{ color: 'white' }}>Package Price</TableCell>
                <TableCell sx={{ color: 'white' }}>PackageType</TableCell>
                  <TableCell sx={{ color: 'white' }}>Selling Price</TableCell>
              <TableCell sx={{ color: 'white' }}>Actions</TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {currentRows.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.package_name}</TableCell>
                <TableCell>{row.package_day}</TableCell>
                <TableCell>{row.package_price}</TableCell>
                  <TableCell>{row.package_type}</TableCell>
                  <TableCell>{row.selling_price}</TableCell>
                <TableCell align='center' sx={{padding:"0px"}}>
                  <Box sx={{display:"flex",justifyContent:"center",alignItems:"center",height:"100%",gap:"8px",padding:1}}>
                     <UpdatePackage packageData={row} />
                     <Button
                      variant="contained"
                      onClick={() => onDeleteClick(item.id)}
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

export default PackageList;