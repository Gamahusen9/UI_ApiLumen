import React, { useEffect, useState } from "react";
import Case from "../../components/Case";
import axios from "axios"
import { useNavigate, useParams } from 'react-router-dom'
import AlertFalse from "../../components/Alert";

export default function stuffEdit() {
    const [dataBef, setDataBef] = useState([])
    const [mess, setMess] = useState([])
    const [stat, setStat] = useState([])
    const [forms, setForms] = useState({
        name: '',
        category: ''
    })
    const [error, setError] = useState([])
    const { id } = useParams()
    const instance = axios.create({
        baseURL: 'http://localhost:8000',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('access_token')
        }
    })
    const navigate = useNavigate();

    useEffect(() => {
        instance.get(`/stuff/show/${id}`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            }
        })

            .then(res => {
                setDataBef(res.data.data)
            })
            .catch(err => {
                if (err.reponse.status == 401) {
                    navigate('/login?message = ' + encodeURIComponent(('anda belum login')))

                }
            })
    }, [])

    const handleUpdateData = (event) => {
        event.preventDefault()

        instance.put(`/stuff/patch/${id}`, forms)
            .then(res => {
                setTimeout(() => {
                    navigate('/stuff')
                }, 2000);
                setMess(res.data.message)
                setStat(res.data.success)
            })
            .catch(err => {
                setError(err.response.data)
            })
    }


    return (
        <Case>
            {
                stat === false ? (<AlertFalse alert='false' message={mess} />) : ''
            }
            {
                stat === true ? (<AlertFalse alert='true' message={mess} />) : ''
            }
            <div className="block m-auto h-screen bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-900 dark:border-gray-700">
                <div className="items-center m-5 pb-10 pt-10">

                    <div className="flex flex-col items-center justify-center">
                        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                            <div className="flex justify-center">
                                <h5 className="pt-10 text-3xl font-medium text-blue-900 dark:text-white">STUFF EDIT</h5>
                            </div>
                            <form onSubmit={handleUpdateData} class="max-w-sm mx-auto m-10 p-5">
                                <div class="mb-5">
                                    <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama</label>
                                    <input type="text" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={dataBef.name} onChange={e => setForms({ ...forms, name: e.target.value })} />
                                </div>
                                <div class="mb-5">
                                    <label for="category" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Kategori Barang</label>
                                    <select id="category" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={e => setForms({ ...forms, category: e.target.value })}>
                                        <option selected>Pilih Kategori</option>
                                        <option value="HTL">Hotel</option>
                                        <option value="KLN">Kuliner</option>
                                        <option value="Teknisi/Sarpras">Sarpras</option>
                                    </select>
                                    <p className="text-white font-bold">Category sebelumnya: {dataBef.category}</p>
                                </div>
                                <div className="flex justify-end">
                                    <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Case>
    )
}