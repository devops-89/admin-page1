import GenericTable from "../../components/GenericTable";
import {data} from "../../assets/data";
 const AllHotelers = () => {
    const columns = [
      { key: "id", label: "ID" },
      { key: "profileImage", label: "Profile" },
      { key: "firstName", label: "First Name" },
      { key: "lastName", label: "Last Name" },
      { key: "username", label: "Username" },
      { key: "email", label: "Email" },
      { key: "phone", label: "Phone" },
      { key: "status", label: "Status" },
    ];
  
    return (
      <GenericTable
        data={data.users_page}
        columns={columns}
        onActionClick={(id) => console.log("View user:", id)}
        table_heading={{ heading: "All Hoteliers", para: "View all hoteliers in the system." }}
        actionPath="/dashboard/hoteliers/hotelier-details"
      />
    );
  };

  export default AllHotelers;