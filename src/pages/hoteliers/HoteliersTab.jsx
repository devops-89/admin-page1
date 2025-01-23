import React, { useEffect, useState } from "react";
import { Tabs, Tab, Box, CircularProgress } from "@mui/material";
import AllHoteliers from "./AllHoteliers";
import ActiveHoteliers from "./ActiveHoteliers";
import InactiveHoteliers from "./InactiveHoteliers";
import { CustomerController } from "../../api/customerController";
import { useDebounce } from "../../hooks/debounce";
import { hoteler_list } from "../../assets/data";

const HoteliersTab = () => {
  
  const [activeTab, setActiveTab] = useState(0);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalDoc, setTotalDoc] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const debounceSearchTerm = useDebounce(searchTerm, 500);

  const columns = [
    { key: "avatar", label: "Profile" },
    { key: "full_name", label: "Name" },
    { key: "role", label: "Role" },
    { key: "email", label: "Email" },
    { key: "phone_no", label: "Phone No." },
    { key: "address", label: "Address" },
    { key: "city", label: "City" },
    { key: "state", label: "State" },
    { key: "status", label: "Status" }
  ];
  

  const totalPages = Math.ceil(totalDoc / pageSize);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await CustomerController.getCustomerList(
          pageSize,
          page,
          debounceSearchTerm
        );
        // setData(res.data.data.docs);
        setData(hoteler_list);
        setTotalDoc(res.data.data.totalDocs);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [page, pageSize, debounceSearchTerm]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <>
      {data.length > 0 ? (
        <Box>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            centered
            sx={{
              "& .MuiTabs-indicator": {
                display: "none",
              },
              "& .Mui-selected": {
                color: "var(--white-color)!important",
                backgroundColor: "var(--orange-color)",
              },
            }}
          >
            <Tab label="All Hoteliers" />
            <Tab label="Active Hoteliers" />
            <Tab label="Inactive Hoteliers" />
          </Tabs>

          <Box sx={{ marginTop: 3 }}>
            {activeTab === 0 && (
              <AllHoteliers
                data={data}
                setPageSize={setPageSize}
                pageSize={pageSize}
                totalDoc={totalDoc}
                setTotalDoc={setTotalDoc}
                setPage={setPage}
                columns={columns}
                setSearchTerm={setSearchTerm}
                searchTerm={searchTerm}
                debounceSearchTerm={debounceSearchTerm}
                totalPages={totalPages}
              />
            )}

            {activeTab === 1 && (
              <ActiveHoteliers
                data={data}
                setPageSize={setPageSize}
                pageSize={pageSize}
                totalDoc={totalDoc}
                setTotalDoc={setTotalDoc}
                setPage={setPage}
                columns={columns}
                setSearchTerm={setSearchTerm}
                searchTerm={searchTerm}
                debounceSearchTerm={debounceSearchTerm}
                totalPages={totalPages}
              />
            )}

            {activeTab === 2 && (
              <InactiveHoteliers
                data={data}
                setPageSize={setPageSize}
                pageSize={pageSize}
                totalDoc={totalDoc}
                setTotalDoc={setTotalDoc}
                setPage={setPage}
                columns={columns}
                setSearchTerm={setSearchTerm}
                searchTerm={searchTerm}
                debounceSearchTerm={debounceSearchTerm}
                totalPages={totalPages}
              />
            )}
          </Box>
        </Box>
      ) : (
        <Box sx={{ textAlign: "center", marginTop: 4 }}>
          <CircularProgress />
        </Box>
      )}
    </>
  );
};

export default HoteliersTab;
