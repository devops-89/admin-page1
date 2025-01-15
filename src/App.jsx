import AppLayout from "./components/AppLayout";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login.jsx";
import NotFound from "./pages/NotFound.jsx";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import HotelsList from "./pages/HotelsList.jsx";
import CabsList from "./pages/CabsList.jsx";
import FlightsList from "./pages/FlightsList.jsx";
import ProtectedRoute from "./components/auth/ProtectedRoute.jsx";
import Hotelers from "./pages/hotelers/Hotelers.jsx";
import UsersTab from "./pages/users/UsersTab.jsx";
import HotlerDetails from "./pages/hotelers/HotlerDetails.jsx";
import UserDetails from "./pages/users/UserDetails.jsx";
import AddPackage from "./pages/packages/AddPackage.jsx";

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
        },
        {
          path: "/dashboard/users/user-details",
          element: <UserDetails />,
        },
        {
          path: "/dashboard/hotelers",
          element: <Hotelers />,
        },
        {
          path: "/dashboard/hoteler/hoteler-details",
          element: <HotlerDetails />,
        },
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
          path: "/dashboard/packages",
          element: <AddPackage />,
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
