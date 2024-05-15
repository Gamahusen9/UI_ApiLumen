import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Stuff from "./pages/stuff/Index"
import StuffCreate from "./pages/stuff/Create"
import StuffEdit from "./pages/stuff/Edit"

export const router = createBrowserRouter([
    { path: '/', element: <App /> },
    { path: '/login', element: <Login /> },
    { path: '/profile', element: <Profile />},
    { path: '/stuff', element: <Stuff />},
    { path: '/stuff/create', element: <StuffCreate />},
    { path: '/stuff/edit', element: <StuffEdit />},

])