import AppLayout from "./components/AppLayout";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login.jsx";
import NotFound from "./pages/NotFound.jsx";
import { createBrowserRouter, RouterProvider,Navigate } from "react-router-dom";
import UsersList from "./pages/users/AllUsers.jsx";
import HotelsList from "./pages/HotelsList.jsx";
import CabsList from "./pages/CabsList.jsx";
import FlightsList from "./pages/FlightsList.jsx";
import ProtectedRoute from "./components/auth/ProtectedRoute.jsx";
import AllHotelers from "./pages/hotelers/AllHotelers.jsx";
import ActiveHotelers from "./pages/hotelers/ActiveHotelers.jsx";
import InactiveHotelers from "./pages/hotelers/InactiveHotelers.jsx";
import Hotelers from "./pages/hotelers/Hotelers.jsx";
import UsersTab from "./pages/users/UsersTab.jsx";
import AllUsers from "./pages/users/AllUsers.jsx";
import ActiveUsers from "./pages/users/ActiveUsers.jsx";
import InactiveUsers from "./pages/users/InactiveUsers.jsx";
import HotlerDetails from "./pages/hotelers/HotlerDetails.jsx";
import UserDetails from "./pages/users/UserDetails.jsx";



function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/dashboard",
      element: (
        <ProtectedRoute>
          <AppLayout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/dashboard/",
          element: <Dashboard />,
        },
        {
          path: "/dashboard/users",
          element: <UsersTab />,
          children: [
            {
              path: "", // Empty path to match "/dashboard/hotlers"
              element: <Navigate to="all" replace />, // Redirect to "all"
            },
            {
              path: "all", 
              element: <AllUsers />,
            },
            {
              path: "active",
              element: <ActiveUsers />,
            },
            {
              path: "inactive",
              element: <InactiveUsers />,
            },
           
          ],
        },
        {
          path:"/dashboard/users/user-details",
          element:<UserDetails />
        },
        {
          path: "/dashboard/hotelers",
          
          element: <Hotelers />,
          children: [
            {
              path: "", // Empty path to match "/dashboard/hotlers"
              element: <Navigate to="all" replace />, // Redirect to "all"
            },
            {
              path: "all", 
              element: <AllHotelers />,
            },
            {
              path: "active",
              element: <ActiveHotelers />,
            },
            {
              path: "inactive",
              element: <InactiveHotelers />,
            },
           
          ]
        },
          {
            path:"/dashboard/hoteler/hoteler-details",
            element:<HotlerDetails />
          }
     ,
        {
          path: "/dashboard/hotels",
          element: <HotelsList />,
        },
        {
          path: "/dashboard/cabs",
          element: <CabsList />,
        },
        {
          path: "/dashboard/flights",
          element: <FlightsList />,
        },
      ],
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
