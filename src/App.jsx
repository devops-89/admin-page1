import AppLayout from "./components/AppLayout";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login.jsx";
import NotFound from "./pages/NotFound.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

function App() {

  const router = createBrowserRouter([
    {
      path:'/',
      element : <AppLayout/>,
      children : [
        {
          path:'/',
          element : <Dashboard/>
        },
        {
          path:'/about',
          element : <About/>
        }
      ]
    },

    {
      path:'/login',
      element : <Login/> 
    },

    {
      path:'*',
      element : <NotFound/>
    }

    

  ]);



  return <RouterProvider router={router}/>
}

export default App;
