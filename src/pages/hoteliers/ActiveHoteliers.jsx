import GenericTable from "../../components/GenericTable";
import {data} from "../../assets/data";
const ActiveHotelers = () => {
    const columns = [
      { key: "id", label: "ID" },
      { key: "profileImage", label: "Name" },
      { key: "firstName", label: "First Name" },
      { key: "lastName", label: "Last Name" },
      { key: "username", label: "Username" },
      { key: "email", label: "Email" },
      { key: "phone", label: "Phone" },
      { key: "status", label: "Status" },
    ];
  
    const filteredData = data.users_page.filter((user) => user.status.toLowerCase() === "active");
  
    return (
      <GenericTable
        data={filteredData}
        columns={columns}
        onActionClick={(id) => console.log("View active user:", id)}
        table_heading={{ heading: "All Active Hotelers", para: "View all active hotelers in the system." }}
         actionPath="/dashboard/hoteler/hoteler-details"
      />
    );
  };

  export default ActiveHotelers;