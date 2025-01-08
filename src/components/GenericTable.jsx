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
  Select,
  FormControl,
  InputLabel,
  Pagination,
  Box,
  Avatar,
  colors,
} from "@mui/material";

const DataTable = ({ data, columns, onActionClick }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredData = data.filter((item) =>
    columns.some((column) =>
      String(item[column.key])
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredData.length / entriesPerPage);
  const displayedData = filteredData.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 2,
        }}
      >
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel id="entries-per-page-label">Entries</InputLabel>
          <Select
            labelId="entries-per-page-label"
            value={entriesPerPage}
            sx={{margin:'8px'}}
            onChange={(e) => setEntriesPerPage(parseInt(e.target.value, 10))}
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
        />
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{backgroundColor:'var(--table-head-color)'}}>
            <TableRow>
              {columns.map((column) => (
                <TableCell sx={{fontSize:'16px', fontWeight:'500'}} key={column.key}>{column.label}</TableCell>
              ))}
              <TableCell sx={{fontSize:'16px', fontWeight:'500'}}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>

            {/* {console.log(displayedData)}  */}


            { 
            
            displayedData.length!=0 ? (
            
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
                  <TableCell key={column.key}>{[column.key]=='profileImage'?<Avatar alt={item.firstName} src={item[column.key]} /> : item[column.key]}</TableCell>
                ))}
                <TableCell>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => onActionClick(item.id)}
                    sx={{backgroundColor:"var(--orange-color)", marginRight: "5px"}}
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>



            ))): <TableRow><TableCell sx={{fontSize:'16px'}}>No Data Found</TableCell></TableRow>}

          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: 2 }}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={(_, page) => setCurrentPage(page)}
          sx={{'& .MuiButtonBase-root':{backgroundColor:"var(--orange-color)", color:'var(--white-color)'}, '& .Mui-selected':{color:'var(--black-color)', backgroundColor:"var(--table-head-color)"}, '&:hover':{color:'var(--black-color)'}}}
        />
      </Box>
    </Box>
  );
};

export default DataTable;
