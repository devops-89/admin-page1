import React, { useState, useEffect } from 'react';
import { PackageController } from '../../api/package.controller';
import PackageList from '../../components/packages/PackageList';
import {
  Typography,
  Box,
  Pagination,
  Stack
} from '@mui/material';
import ReactLoading from 'react-loading';
import { COLORS } from '../../utils/colors';

const LIMIT = 10;

const AllPackage = () => {
  const [packageList, setPackageList] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchPackages = async (currentPage) => {
    setLoading(true);
    try {
      const response = await PackageController.getPackages(LIMIT, currentPage);
      const data = response?.data?.data?.items || [];
      const totalPagesFromApi = response?.data?.data?.meta?.totalPages || 1;

      setPackageList(data);
      setTotalPages(totalPagesFromApi);
      setError('');
    } catch (err) {
      console.error(err);
      setError('Failed to load packages. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPackages(page);
  }, [page]);

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
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

  if (error) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  if (packageList.length === 0) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <Typography>No packages available.</Typography>
      </Box>
    );
  }

  return (
    <Box>
      {/* Just pass data to PackageList, do not use pagination inside it */}
      <PackageList data={packageList} />

      {/* External Pagination only */}
      {/* <Stack alignItems="center" mt={4} mb={4}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={(event, value) => setPage(value)}
          color="primary"
        />
      </Stack> */}
    </Box>
  );
};

export default AllPackage;
