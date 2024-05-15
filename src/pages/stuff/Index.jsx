import React, { useEffect, useState } from "react";
import Case from "../../components/Case";
import axios from "axios"
import { Link, useNavigate } from 'react-router-dom'

export default function Stuff(){
    const [ dataStuff, setStuff ]= useState([])
    const navigate = useNavigate();
    useEffect(() => {
        axios.get('http://localhost:8000/stuff', {
            headers :{
                'Authorization' : 'Bearer ' + localStorage.getItem('access_token')
            }
        })
        .then(res => {
            setStuff(res.data.data)
        })
        .catch(err => {
            if (err.response.status == 401) {
                navigate('/login?message = ' + encodeURIComponent('anda belum login'))
                
            }
        })
    }, [])
    return(
        <Case>
            <div className="flex justify-between mt-20">
    <h1 className="text-white text-2xl font-bold pl-10">STUFF</h1>
    <Link to= "/stuff/create">
    <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 mr-10"><svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7 7V5"/>
</svg>
</button>    </Link>

            </div>


<div class="relative overflow-x-auto flex items-center  m-10 mt-3 flex flex-col shadow-md rounded-lg">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 rounded-lg">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr> 
                <th scope="col" class="px-6 py-3">
                    No
                </th>
                <th scope="col" class="px-6 py-3">
                    Stuff
                </th>
                <th scope="col" class="px-6 py-3">
                    Category
                </th>
                <th scope="col" class="px-6 py-3">
                    Stock
                </th>
                <th scope="col" class="px-6 py-3">
                    Stock_defect
                </th>
                <th scope="col" class="px-6 py-3">
                    Action
                </th>

            </tr>
        </thead>
        <tbody>
            {dataStuff.map((stuff,id) => (
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {id+1}
                </th>
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {stuff.name}
                </th>
                <td class="px-6 py-4">
                    {stuff.category}
                </td>
                <td class="px-6 py-4">
                    

                    {
                        stuff.stuffstock === null ? 0 : stuff.stuffstock.total_available  
                    }
                </td>
                <td class="px-6 py-4">
                    

                    {
                        stuff.stuffstock === null ? 0 : stuff.stuffstock.total_defect  
                    }
                </td>
                <td class="px-6 py-4">
                    <Link to='/stuff/edit'>
                    <a href="#" class="font-medium text-sky-600 dark:text-sky-500 hover:underline mr-3">Edit</a>
                    </Link>
                    <a href="#" class="font-medium text-red-600 dark:text-red-500 hover:underline mr-3">Delete</a>
                </td>
            </tr>
                        ))}
        </tbody>
    </table>
</div>

        </Case>
    )
}