import GenericTable from "../../components/GenericTable";
import {hoteler_list} from "../../assets/data";
 const AllHotelers = () => {
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
  
  
    return (
      <GenericTable
        data={hoteler_list}
        columns={columns}
        onActionClick={(id) => console.log("View user:", id)}
        table_heading={{ heading: "All Hoteliers", para: "View all hoteliers in the system." }}
        actionPath="/dashboard/hoteliers/hotelier-details"
      />
    );
  };

  export default AllHotelers;