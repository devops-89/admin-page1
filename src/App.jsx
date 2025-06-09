import AppLayout from "./components/AppLayout";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login.jsx";
import NotFound from "./pages/NotFound.jsx";

import PackageSettings from "./pages/packages/PackageSettings.jsx";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import HotelsList from "./pages/HotelsList.jsx";
import CabsList from "./pages/CabsList.jsx";
import FlightsList from "./pages/FlightsList.jsx";
import ProtectedRoute from "./components/auth/ProtectedRoute.jsx";
import CustomersTab from "./pages/customers/CustomersTab.jsx";
import CustomerDetails from "./pages/customers/CustomerDetails.jsx";
import AddPackage from "./pages/packages/AddPackage.jsx";
import AllPackage from "./pages/packages/AllPackage.jsx";

import AddStaff from "./pages/staff/AddStaff.jsx";
import AddHoteliers from "./pages/hoteliers/AddHoteliers.jsx";
import Profile from './pages/profile/Profile.jsx';
import HotelierDetails from "./pages/hoteliers/HotelierDetails.jsx";
import HoteliersTab from "./pages/hoteliers/HoteliersTab.jsx";
import Home from "./pages/website/Home.jsx";
import HelicopterList from "./pages/HelicopterList.jsx";
import DestinationWeddingList from "./pages/DestinationWeddingList.jsx";
import SelfDriveList from "./pages/SelfDriveList.jsx";
import Activities from "./pages/Activities.jsx";
import OutstationCabs from "./pages/OutstationCabs.jsx";



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

        // dashboard 
        {
          path: "/dashboard/",
          element: <Dashboard />,
        },

        // customers 
        {
          path: "/dashboard/customers",
          element: <CustomersTab />,
        },
        {
          path: "/dashboard/customers/customer-details",
          element: <CustomerDetails />,
        },

        // hotelers 
        {
          path: "/dashboard/hoteliers",
          element: <HoteliersTab />,
        },
        {
          path: "/dashboard/hotelier/add-hotelier",
          element: <AddHoteliers />,
        },
        {
          path: "/dashboard/hoteliers/hotelier-details",
          element: <HotelierDetails />,
        },

        // booking
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
        {
          path: "/dashboard/helicopters",
          element: <HelicopterList />,
        },
        {
          path: "/dashboard/destination-wedding",
          element: <DestinationWeddingList />,
        },
        {
          path: "/dashboard/self-drive",
          element: <SelfDriveList />,
        },
         {
          path: "/dashboard/outstation-cabs",
          element: <OutstationCabs />,
        },
         {
          path: "/dashboard/activities",
          element: <Activities />,
        },

        // package 
        {
          path: "/dashboard/packages",
          element: <AllPackage />,
        },
        {
          path: "/dashboard/add-packages",
          element: <AddPackage />,
        },
         {
          path:"/dashboard/package-settings",
          element:<PackageSettings />
        },


        // staff 
        {
          path: "/dashboard/add-staff",
          element: <AddStaff />,
        },
        {
          path: "/dashboard/profile",
          element: <Profile />,
        },

        {
          path: "/dashboard/home",
          element: <Home />,
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
