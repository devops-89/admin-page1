import React, { useState, useEffect } from 'react';
import { PackageController } from '../../api/package.controller';
import PackageList from '../../components/packages/PackageList';
import {
 
  Typography, Box,
} from '@mui/material';
import ReactLoading from "react-loading";
import {COLORS} from "../../utils/colors";



const AllPackage = () => {
  const [packageList, setPackageList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    PackageController.getPackages()
      .then((response) => {
        setPackageList(response?.data?.data || []);
        setError('');
      })
      .catch((error) => {
        console.error(error);
        setError('Failed to load packages. Please try again later.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

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

  return <PackageList data={packageList} />;
};

export default AllPackage;

