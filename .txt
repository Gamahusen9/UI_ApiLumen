import React, { useEffect, useState }from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function profile() {
  const [dataProfile, setDataProfile] =
  useState({});

  useEffect(() => {
    axios.get('http://localhost:8000/profile',{    
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('access_token')
      }
  })
  .then(res =>{
    setDataProfile(res.data.data)
  })
  .catch(err => {
    console.log(err)
  })

  }, []);

  const navigate = useNavigate();

  function handleLogout() {
    axios.get('http://localhost:8000/logout',{
        headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('access_token')
        }   
      })
      .then(res => {
        localStorage.removeItem('access_tokenn')
        navigate('/Login');
      })
      .catch(err => {
          console.log(err)
  })
  }

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
                <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
                    <div className="flex flex-col items-center p-6">

                        <div class="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                            <svg class="absolute w-12 h-12 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
                        </div>

                        <h5 className="mb-1 text-2xl font-semibold text-gray-900 dark:text-white">{dataProfile.username}</h5>
                        <span className="text-sm text-gray-500 dark:text-gray-400">{dataProfile.email}</span>
                        <div className="flex mt-6 space-x-4">
                            <a href="#" className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800">Dashboard</a>
                        </div>
                    </div>
                </div>
        </div>
    </>
  );
};