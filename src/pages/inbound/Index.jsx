import React, { useEffect, useState } from "react";
import Case from "../../components/Case";
import axios from "axios"
import { Link, useNavigate } from 'react-router-dom'
import Alert from "../../components/Alert";

export default function Stuff() {
    const [dataInbound, setInbound] = useState([])
    const [mess, setMess] = useState([])
    const [stat, setStat] = useState([])


    const navigate = useNavigate();
    const [error, setError] = useState([]);
    const instance = axios.create({
        baseURL: 'http://localhost:8000',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('access_token')
        }
    })
    const imgURL =  'http://localhost:8000/uploads/'
    useEffect(() => {
        instance.get('/inbound', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            }
        })
            .then(res => {
                console.log(imgURL);
                setInbound(res.data.data)
            })
            .catch(err => {
                if (err.response.status == 401) {
                    navigate('/login?message = ' + encodeURIComponent('anda belum login'))

                }
            })
    }, [])


    const deleteInbound = (id) => {
        instance.delete(`/inbound/delete/${id}`)
            .then(res => {
                setTimeout(() => {
                    location.reload()
                }, 2000);
                setMess(res.data.message)
                setStat(res.data.success)
            })
            .catch(err => {

                setMess(err.response.data.message)
                setStat(err.response.data.success)
                setError(err.response.data)
            })
    }
    return (
        <Case>
            {
                stat === false ? (<Alert alert='false' message={mess} />) : ''
            }   
            {
                stat === true ? (<Alert alert='true' message={mess} />) : ''
            }


            <div className="flex justify-between mt-20">
                <h1 className="text-white text-2xl font-bold pl-10">INBOUND STUFF</h1>
                <Link to="/inbound/create">
                    <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 mr-10"><svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7 7V5" />
                    </svg>
                    </button>
                </Link>
            </div>


            <div class="relative overflow-x-auto flex items-center mt-3 flex flex-col shadow-md rounded-lg">
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
                                Total
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Date_Time
                            </th>

                            <th scope="col" class="px-6 py-3">
                                Bukti
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Action
                            </th>


                        </tr>
                    </thead>
                    <tbody>
                        {dataInbound.map((inbound, id) => (
                            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">

                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {id + 1}
                                </th>
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {inbound.stuff.name}
                                </th>
                                <td class="px-6 py-4">
                                    {inbound.stuff.category}
                                </td>
                                <td class="px-6 py-4">
                                    {inbound.total}
                                </td>
                                <td class="px-6 py-4">
                                    {inbound.date}
                                </td>
                                <td class="px-6 py-4">
                                    <img className="w-20 h-25" src={imgURL + inbound.proff_file} alt="" />
                                </td>
                                <td class="px-6 py-4">
                                            <button type="button" onClick={() => deleteInbound(inbound.id)} class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800" >Delete</button> 
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </Case>
    )
}