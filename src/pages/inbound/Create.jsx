import React, { useEffect, useState } from "react";
import Case from "../../components/Case";
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import Alert from "../../components/Alert";


export default function inboundCreate() {
    const [dataStuff, setStuff] = useState([])
    const [mess, setMess] = useState([])
    const [stat, setStat] = useState([])

    const [selectedFile, setSelectedFile] = useState(null);
    const onInputChange = (event) => {
        const { name, value } = event.target;
        setForms({ ...forms, [name]: value });
    };



    const [forms, setForms] = useState({
        stuff_id: '',
        total: '',
        date: '',
        proff_file: null
    })

    const [error, setError] = useState([])
    const navigate = useNavigate()
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


    const handleCreateInbound = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('stuff_id', forms.stuff_id);
        formData.append('total', forms.total);
        formData.append('date', forms.date);
        formData.append('proff_file', forms.proff_file);

        instance.post('/inbound/create', formData)
            .then(res => {
                setTimeout(() => {
                    navigate('/inbound')
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

            <div className="items-center  pb-10 pt-10">
                {/* {
                        Object.keys(error).length > 0 ? (
                            <div role="alert">
                                <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
                                    Gagal!
                                </div>
                                <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                                    <ul>
                                        {
                                            error.message
                                            // Object.entries(error).map(([key, value], i) => (
                                            //     <li key={key}>{key != "status" ? i+1 + '. ' + value : ''}</li>
                                            // ))
                                        }
                                    </ul>
                                </div>
                            </div>
                        ) : ''
                    } */}

                <div className="flex flex-col items-center justify-center">
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="flex justify-center">
                            <h5 className="pt-10 text-3xl font-medium text-blue-900 dark:text-white">INBOUND CREATE</h5>
                        </div>

                        <form onSubmit={handleCreateInbound} class="max-w-sm mx-auto m-10 p-5">
                            <div class="mb-5">
                                <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama Barang</label>
                                <select id="name" name="stuff_id" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={e => setForms({ ...forms, stuff_id: e.target.value })}>
                                    <option selected>Pilih Kategori</option>
                                    {dataStuff.map((stuff, id) => (
                                        <option value={stuff.id}>{stuff.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div class="mb-5">
                                <label for="total" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Total</label>
                                <input type="number" id="total" name="total" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Ketik Nama Barang" onChange={e => setForms({ ...forms, total: e.target.value })} />
                            </div>
                            <div class="mb-5">
                                <label for="date" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tanggal</label>
                                <input type="date" name="date" id="date" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Ketik Nama Barang" onChange={e => setForms({ ...forms, date: e.target.value })} />
                            </div>
                            <div class="mb-5">
                                <label for="proff_file" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Bukti</label>
                                <input type="file" name="proff_file" id="proff_file" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Upload bukti disini !" onChange={e => setForms({ ...forms, proff_file: e.target.files[0] })} />
                            </div>
                            <div className="flex justify-end">
                                <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Case>
    )
}