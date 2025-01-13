import GenericTable from "../../components/GenericTable";
import {data} from "../../assets/data";
const InactiveUsers = () => {
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
  
    const filteredData = data.users_page.filter((user) => user.status.toLowerCase() === "inactive");
  
    return (
      <GenericTable
        data={filteredData}
        columns={columns}
        onActionClick={(id) => console.log("View inactive user:", id)}
        table_heading={{ heading: "All Inactive Users", para: "View all inactive users in the system." }}
        actionPath="/dashboard/users/user-details"
      />
    );
  };

  export default InactiveUsers;