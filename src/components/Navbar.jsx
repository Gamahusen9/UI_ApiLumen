import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {
    const [isLogin, setIsLogin] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        axios.get('http://localhost:8000/profile', {
            headers: {
                'Authorization' : 'Bearer' + localStorage.getItem('access_token'),
            }
        })
        .then(res => {
            setIsLogin(true)
            if (location.pathname === '/login') {
                navigate('/profile')
            }
        })
        .catch(err => {
            setIsLogin(false)
            if (err.response.status == 401 && location.pathname != '/login') {
                navigate('/login?message=' + encodeURIComponent('Anda belum login'))
                
            }
        })
    }, [navigate])
    return (
        <div className="bg-blue-600 py-2">
            <div className="grid grid-cols-12">
                <section className="col-span-10 col-start-2">
                    <div className="flex items-center">
                        <Link
                            className="mr-2 text-sm font-semibold uppercase text-white"
                            to="/"
                        >
                            INVENTARIS APP
                        </Link>
                        <Link to="/login"><small className="text-white ml-2">Login</small></Link>
                        <div>
                            {
                                isLogin ? (<Link to="/profile"><small className="text-white ml-2">Profile</small></Link>): ''
                            }
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}