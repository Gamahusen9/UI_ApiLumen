import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Stuff from "./pages/stuff/Index"
import StuffCreate from "./pages/stuff/Create"
import StuffEdit from "./pages/stuff/Edit"
import StockEdit from "./pages/stock/Edit"
import Inbound from "./pages/inbound/Index";
import InboundCreate from "./pages/inbound/Create"


export const router = createBrowserRouter([
    { path: '/', element: <App /> },
    { path: '/login', element: <Login /> },
    { path: '/profile', element: <Profile />},
    //stuff
    { path: '/stuff', element: <Stuff />},
    { path: '/stuff/create', element: <StuffCreate />},
    { path: '/stuff/edit/:id', element: <StuffEdit />},
    //stock
    { path: '/stock/edit/:id', element: <StockEdit />},
    //Inbound
    { path: '/inbound', element: <Inbound />},
    { path: '/inbound/create', element: <InboundCreate />},
    // { path: '/lending', element: <Lending />},
    // { path: '/user', element: <User />}

])