import React, { useState, useEffect } from "react";

import Grid from "@mui/material/Grid2";
import AddCategory from "../../components/packages/category/AddCategory";
import { PackageController } from "../../api/package.controller";
import CategoryList from "../../components/packages/category/CategoryList";
import AmenityList from "../../components/packages/amenities/AmenityList";
import AddAmenity from "../../components/packages/amenities/AddAmenity";
import AddPackageDay from "../../components/packages/packageDay/AddPackageDay";
import { Divider,Box,Typography } from "@mui/material";
import PackageDayList from "../../components/packages/packageDay/PackageDayList";

const PackageSettings = () => {
  const [categoryList, setCategoryList] = useState([]);
  const [categoryListLoading, setCategoryListLoading] = useState(true);

  const [amenityList, setAmenityList] = useState([]);
  const [amenityListLoading, setAmenityListLoading] = useState(true);

  const [packageDayList,setPackageDayList]=useState([]);
  const [packageDayListLoading,setPackageDayListLoading]=useState(true);

  // handlers start
   // Handler when a new category is added
  const handleCategoryAdded = (newCategory) => {
    setCategoryList((prev) => [...prev, newCategory]);
  };

  const handleAmenityAdded = (newAmenity) => {
    setAmenityList((prev) => [...prev, newAmenity]);
  };

  const handlePackageDayAdded = (newPackageDay) => {
    setPackageDayList((prev) => [...prev, newPackageDay]);
  };

// handlers end

  useEffect(() => {
    // getting categories api
    PackageController.getCategories()
      .then((response) => {
        setCategoryList(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setTimeout(() => {
          setCategoryListLoading(false);
        }, 1000);
      });

    //   getting amenities api
    PackageController.getAmenities()
      .then((response) => {
        console.log("amenities List: ", response);
        setAmenityList(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setTimeout(() => {
          setAmenityListLoading(false);
        }, 1000);
      });

    //   getting package day list
     PackageController.getPackageDayList()
      .then((response) => {
        console.log("package day List: ", response);
        setPackageDayList(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setTimeout(() => {
          setPackageDayListLoading(false);
        }, 1000);
      });


  }, []);

  return (
    <>
      {/* Manager Category */}
      <Box>
      <Grid>
        <Box>
          <Typography
            variant="h4"
            sx={{
              fontSize: "18px",
              fontWeight: "600",
              marginBottom: "5px",
              textAlign: { xs: "center", sm: "center", md: "start" },
              "@media (min-width: 831px) and (max-width: 900px)": {
                textAlign: "start",
              },
            }}
          >
            Manage Package Categories
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: "15px",
              fontWeight: "400",
              marginBottom: "15px",
              textAlign: { xs: "center", sm: "center", md: "start" },
              "@media (min-width: 831px) and (max-width: 900px)": {
                textAlign: "start",
              },
            }}
          >
            Create and organize categories for hotel packages easily.
          </Typography>
        </Box>
      </Grid>
      <Grid container spacing={2}>
        <Grid size={8} >
          {/* Amenity List */}
          <CategoryList data={categoryList} loading={categoryListLoading} />
        </Grid>
        {/* Add Amenity Form */}
        <Grid size={4} >
          <AddCategory onAddSuccess={handleCategoryAdded} />
        </Grid>
      </Grid>
      </Box>

      <Divider sx={{ marginBlock: "20px" }} />

      {/* Manage Amenities */}
      <Box>
      <Grid>
        <Box>
          <Typography
            variant="h4"
            sx={{
              fontSize: "18px",
              fontWeight: "600",
              marginBottom: "5px",
              textAlign: { xs: "center", sm: "center", md: "start" },
              "@media (min-width: 831px) and (max-width: 900px)": {
                textAlign: "start",
              },
            }}
          >
           Manage Package Amenities
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: "15px",
              fontWeight: "400",
              marginBottom: "15px",
              textAlign: { xs: "center", sm: "center", md: "start" },
              "@media (min-width: 831px) and (max-width: 900px)": {
                textAlign: "start",
              },
            }}
          >
          Add, update, or remove amenities for hotel packages.
          </Typography>
        </Box>
      </Grid>
      <Grid container spacing={2}>
        <Grid size={8}>
          {/* Amenity List */}
          <AmenityList data={amenityList} loading={amenityListLoading} />
        </Grid>
        {/* Add Amenity Form */}
        <Grid size={4}>
          <AddAmenity onAddSuccess={handleAmenityAdded} />
        </Grid>
      </Grid>
      </Box>

         <Divider sx={{ marginBlock: "20px" }} />

      {/* Manage package Day */}
      <Box>
         <Grid>
        <Box>
          <Typography
            variant="h4"
            sx={{
              fontSize: "18px",
              fontWeight: "600",
              marginBottom: "5px",
              textAlign: { xs: "center", sm: "center", md: "start" },
              "@media (min-width: 831px) and (max-width: 900px)": {
                textAlign: "start",
              },
            }}
          >
           Manage Package Day
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: "15px",
              fontWeight: "400",
              marginBottom: "15px",
              textAlign: { xs: "center", sm: "center", md: "start" },
              "@media (min-width: 831px) and (max-width: 900px)": {
                textAlign: "start",
              },
            }}
          >
          Add, update, or remove amenities for hotel packages.
          </Typography>
        </Box>
      </Grid>
       <Grid container spacing={2}>
        <Grid size={8}>
          {/* Amenity List */}
          <PackageDayList data={packageDayList} loading={packageDayListLoading} />
        </Grid>
        {/* Add Amenity Form */}
        <Grid size={4}>
         <AddPackageDay onAddSuccess={handlePackageDayAdded} />
        </Grid>
      </Grid>
      </Box>
    </>
  );
};

export default PackageSettings;
