import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from '@mui/material';
import { customerTable } from '../../assets/data.js'

const PaginatedTable = ({ flightColumns }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0); 
    };

    const currentRows = customerTable.FLIGHT_BOOKINGS.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <Paper>
            <TableContainer>
                <Table>
                    <TableHead sx={{backgroundColor:'var(--black-color)'}}>
                        <TableRow>
                            {flightColumns.map((flghtcol) => (
                                <TableCell sx={{color:'var(--white-color)'}} key={flghtcol.key}>{flghtcol.label}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currentRows.map((tableData, index) => (
                            <TableRow key={index}>
                                <TableCell>{tableData.BOOKING_ID}</TableCell>
                                <TableCell>{tableData.PASSENGER_NAME}</TableCell>
                                <TableCell>{tableData.FLIGHT_NUMBER}</TableCell>
                                <TableCell>{tableData.DEPARTURE_DATE}</TableCell>
                                <TableCell>{tableData.ARRIVAL_DATE}</TableCell>
                                <TableCell>{tableData.SEAT}</TableCell>
                                <TableCell>{tableData.PRICE}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 15]}
                component="div"
                count={customerTable.FLIGHT_BOOKINGS.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
};

export default PaginatedTable;
