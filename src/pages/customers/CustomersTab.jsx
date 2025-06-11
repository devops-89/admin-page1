import React, { useEffect, useState } from "react";
import { Tabs, Tab, Box } from "@mui/material";
import AllCustomers from "./AllCustomers";
import ActiveCustomers from "./ActiveCustomers";
import InactiveCustomers from "./InactiveCustomers";
import { CustomerController } from "../../api/customerController";
import { useDebounce } from "../../hooks/debounce";
import { COLORS } from "../../utils/colors";
import ReactLoading from "react-loading";

const CustomersTab = () => {
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
    { key: "email", label: "Email" },
    { key: "phone_number", label: "Phone" },
    { key: "status", label: "Status" },
    { key: "created_at", label: "Created At" },
    { key: "last_login", label: "Last Login" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await CustomerController.getCustomerList({
          page,
          limit: pageSize,
          search: debounceSearchTerm,
        });
        setData(result?.data?.data?.docs || []);
        setTotalDoc(result?.data?.data?.totalDocs || 0);
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
              "& .MuiTabs-indicator": { display: "none" },
              "& .Mui-selected": {
                color: "var(--white-color)!important",
                backgroundColor: "var(--orange-color)",
              },
            }}
          >
            <Tab label="All Customers" />
            <Tab label="Active Customers" />
            <Tab label="Inactive Customers" />
          </Tabs>

          <Box sx={{ marginTop: 3 }}>
            {activeTab === 0 && (
              <AllCustomers
                data={data}
                columns={columns}
                setSearchTerm={setSearchTerm}
                searchTerm={searchTerm}
                debounceSearchTerm={debounceSearchTerm}
                pageSize={pageSize}
                setPageSize={setPageSize}
                setPage={setPage}
                page={page}
                totalDoc={totalDoc}
              />
            )}
            {activeTab === 1 && (
              <ActiveCustomers
                 data={data}
                columns={columns}
                setSearchTerm={setSearchTerm}
                searchTerm={searchTerm}
                debounceSearchTerm={debounceSearchTerm}
                pageSize={pageSize}
                setPageSize={setPageSize}
                setPage={setPage}
                page={page}
                totalDoc={totalDoc}
              />
            )}
            {activeTab === 2 && (
              <InactiveCustomers
                  data={data}
                columns={columns}
                setSearchTerm={setSearchTerm}
                searchTerm={searchTerm}
                debounceSearchTerm={debounceSearchTerm}
                pageSize={pageSize}
                setPageSize={setPageSize}
                setPage={setPage}
                page={page}
                totalDoc={totalDoc}
              />
            )}
          </Box>
        </Box>
      ) : (
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
      )}
    </>
  );
};

export default CustomersTab;
