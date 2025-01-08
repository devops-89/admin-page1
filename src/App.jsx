import AppLayout from "./components/AppLayout";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login.jsx";
import NotFound from "./pages/NotFound.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UsersList from "./pages/UsersList.jsx";
import HotelsList from "./pages/HotelsList.jsx";
import CabsList from "./pages/CabsList.jsx";
import FlightsList from "./pages/FlightsList.jsx";
import ProtectedRoute from "./components/auth/ProtectedRoute.jsx";

function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Login />,
    },
    {
      path: '/dashboard',
      element: <ProtectedRoute><AppLayout /></ProtectedRoute>,
      children: [
        {
          path: "/dashboard/",
          element: <Dashboard />
        },
        {
          path: "/dashboard/about",
          element: <About />
        },
        {
          path: "/dashboard/users",
          element: <UsersList />
        },
        {
          path: "/dashboard/hotels",
          element: <HotelsList />
        },
        {
          path: "/dashboard/cabs",
          element: <CabsList />
        },
        {
          path: "/dashboard/flights",
          element: <FlightsList />
        },
      ]
    },

    {
      path: '*',
      element: <NotFound />
    }



  ]);



  return <RouterProvider router={router} />
}

export default App;
