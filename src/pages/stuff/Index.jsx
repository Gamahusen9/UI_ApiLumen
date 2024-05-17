import React, { useEffect, useState } from "react";
import Case from "../../components/Case";
import axios from "axios"
import { Link, useNavigate } from 'react-router-dom'
import Alert from "../../components/Alert";

export default function Stuff() {
    const [dataStuff, setStuff] = useState([])
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



    useEffect(() => {
        instance.get('/stuff', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
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

    const deleteStuff = (id) => {
        instance.delete(`/stuff/delete/${id}`)
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
                console.log(err.response.data)
            })
    }
    const handleDeleteStock = (id) => {
        instance.delete(`/stock/delete/${id}`)
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
                console.log(err.response.data)
            })
    }

    const handleCreateStock = (stuffid) => {
        const data = {
            stock: {
                stuff_id  : stuffid,
                total_available : 0,
                total_defect : 0
            }
        }
        console.log(stuffid);

            instance.post('/stock/create', data.stock)
                .then(res => {
                    setTimeout(() => {
                        location.reload()
                    }, 500);
                    setMess(res.data.message)
                    setStat(res.data.success)
                })
                .catch(err => {
                    // console.log(err.response.data);
                    setMess(err.response.data.message)
                    setStat(err.response.data.success)
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
                <h1 className="text-white text-2xl font-bold pl-10">STUFF</h1>
                <Link to="/stuff/create">
                    <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 mr-10"><svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7 7V5" />
                    </svg>
                    </button>    </Link>

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
                                Stock
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Stock_defect
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Action
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Kelola stock
                            </th>

                        </tr>
                    </thead>
                    <tbody>
                        {dataStuff.map((stuff, id) => (
                            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">

                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {id + 1}
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
                                    <Link to={`/stuff/edit/${stuff.id}`}>
                                        <button type="button" class="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 m-2">Edit</button>
                                    </Link>
                                    {
                                        stuff.stuffstock === null ?
                                            <button type="button" onClick={() => deleteStuff(stuff.id)} class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800" >Delete</button> : ''
                                    }


                                </td>
                                <td>
                                    {
                                        stuff.stuffstock === null ? (
                                            <button type="submit" onClick={() => handleCreateStock(stuff.id)} class="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Tambah Stock</button>
                                        )
                                            : <>
                                            <Link to={`/stock/edit/${stuff.stuffstock.id}`}>
                                                <p className="text-white"><em>data stock sudah ada</em></p> <button  type="button" class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Edit</button>
                                                </Link>

                                                <button type="button" onClick={() => handleDeleteStock(stuff.stuffstock.id)} class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Delete</button>
                                            </>


                                    }
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </Case>
    )
}