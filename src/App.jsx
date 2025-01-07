import AppLayout from "./components/AppLayout";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login.jsx";
import NotFound from "./pages/NotFound.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UsersList from "./pages/UsersList.jsx";

function App() {

  const router = createBrowserRouter([
    {
      path:'/',
      element :  <Login/>,
     
    },

    {
      path:'/dashboard',
      element : <AppLayout />,
      children:[
        {
          path:"/dashboard/",
          element:<Dashboard />
        },
        {
          path:"/dashboard/about",
          element:<About />
        },
        {
          path:"/dashboard/users",
          element:<UsersList />
        },

      ]
    },

    {
      path:'*',
      element : <NotFound/>
    }

    

  ]);



  return <RouterProvider router={router}/>
}

export default App;
