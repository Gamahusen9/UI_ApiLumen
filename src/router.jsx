import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard"
import Profile from "./pages/Profile"
import Stuff from "./pages/Stuff"
import StuffTrash from "./pages/TrashStuff"
import Inbound from "./pages/Inbound"
import InboundCreate from "./pages/inbound/Create"
import Lending from "./pages/Lending"
import User from "./pages/User"
import Restorations from "./pages/Restore"


export const router = createBrowserRouter([
    { path: '/', element: <App /> },
    { path: '/login', element: <Login /> },
    { path: '/dashboard', element: <Dashboard /> },
    { path: '/profile', element: <Profile /> },
    //stuff
    { path: '/stuff', element: <Stuff /> },
    { path: '/stuff/trash', element: <StuffTrash /> },
    //Inbound
    { path: '/inbound', element: <Inbound /> },
    { path: '/inbound/create', element: <InboundCreate />},
    // Lending
    { path: '/lending', element: <Lending />},
    // User
    { path: '/user', element: <User />},
    // Restorations
    { path: '/restorations', element: <Restorations />}
])