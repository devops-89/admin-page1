import React, { useEffect, useState } from "react";
import { Tabs, Tab, Box, CircularProgress } from "@mui/material";
import AllUsers from "../users/AllUsers";
import ActiveUsers from "../users/ActiveUsers";
import InactiveUsers from "../users/InactiveUsers";
import { UserController } from "../../api/userController";
import { useDebounce } from "../../hooks/debounce";

const UsersTab = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalDoc, setTotalDoc] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const debounceSearchTerm = useDebounce(searchTerm, 500);

  const columns = [
    { key: "avatar", label: "Profile" },
    { key: "full_name", label: "First Name" },
    { key: "email", label: "Email" },
    { key: "phone_number", label: "Phone" },
    { key: "status", label: "Status" },
    { key: "created_at", label: "Created At" },
    { key: "last_login", label: "Last Login" },
  ];

  const totalPages = Math.ceil(totalDoc / pageSize);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await UserController.getUserList(
          pageSize,
          page,
          debounceSearchTerm
        );
        setData(res.data.data.docs);
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
            <Tab label="All Users" />
            <Tab label="Active Users" />
            <Tab label="Inactive Users" />
          </Tabs>

          <Box sx={{ marginTop: 3 }}>
            {activeTab === 0 && (
              <AllUsers
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
              <ActiveUsers
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
              <InactiveUsers
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

export default UsersTab;
