import React, { useEffect, useState } from "react";
import axios from "axios";
import AlertFalse from "./Alert";

export default function ModalEdit({ isOpen, onClose, endPoint, inputData, title }) {

    if (!isOpen) {
        return null
    }

    const [dataDetail, setDataDetail] = useState([])
    const [message, setMess] = useState([])
    const [stat, setStat] = useState([])

    Object.entries(inputData).map(([item, index]) => {

    })

    const [error, setError] = useState([])

    useEffect(() => {
        axios.get(endPoint['data_detail'], {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            }
        })

            .then(res => {
                setDataDetail(res.data.data)

            })
            .catch(err => {

                if (err.response.status == 401) {
                    Navigate('/login?message=' + encodeURIComponent('Anda belum login'))
                }
            })

    }, [])



    function handleUpdate() {
        const formData = new FormData();
        Object.entries(dataDetail).forEach(([key, value]) => {
            console.log(key + value);
            formData.append(key, value);
        });
        axios.put(endPoint['update'], dataDetail, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            }
        })

            .then(res => {
                setMess(res.data.message)
                setStat(res.data.success)
                setTimeout(() => {
                    window.location.reload()
                }, 1500);
            })
            .catch(err => {
                setMess(err.response.data.message)
                setStat(err.response.data.success)
                setError(err)
            })
    }
    return (
        <>
            <div id="crud-modal" tabindex="-1" aria-hidden="true"

                class="fixed top-0 left-0 w-full h-full flex items-center justify-center">
                <div class="relative p-4 w-full max-w-md max-h-full">
                    {
                        stat === false ? (<AlertFalse alert='false' message={message} />) : ''
                    }
                    {
                        stat === true ? (<AlertFalse alert='true' message={message} />) : ''
                    }
                    <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                                Edit {title}
                            </h3>
                            <button type="button" onClick={onClose}
                                class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                data-modal-toggle="crud-modal">
                                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                                    viewBox="0 0 14 14">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span class="sr-only">Close modal</span>
                            </button>
                        </div>

                        {/* 
                        {
                            Object.keys(error).length > 0 ? (
                                <div role="alert">
                                    <div className="bg-red-500 text-white rounded-t px-4 py-2">
                                        Gagal!
                                    </div>
                                    <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                                        <ul>
                                            {
                                                Object.entries(error).map(([key, value]) => {
                                                    <li key={key}>{key != 'status' && key != 'message' ? value : ''}</li>
                                                })
                                            }
                                        </ul>
                                    </div>
                                </div>
                            ) : ''
                        } */}
                        <form className="p-4 md:p-5">
                            {
                                Object.entries(inputData).map(([key, item], index) => (
                                    <React.Fragment key={index}>
                                        <div className="mb-6">
                                            {
                                                item.tag === "select" ? (
                                                    <>
                                                        <label htmlFor={`category-${index}`}
                                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{item.label}</label>
                                                        <select id={`category-${index}`}
                                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                            onChange={e => setDataDetail({ ...dataDetail, [key]: e.target.value })}>
                                                            <option disabled selected value="">Pilih kategori disini</option>
                                                            {
                                                                title === 'Stuff' ?
                                                                    item.option.map(opt => (
                                                                        <option key={opt} value={opt.name}>{opt.name}</option>
                                                                    ))
                                                                    :

                                                                    item.option.map(opt => (
                                                                        <option key={opt} value={opt.id}>{opt.name}</option>
                                                                    ))
                                                            }
                                                        </select>
                                                    </>
                                                ) : ''
                                            }

                                            {
                                                item.tag === "input" ?
                                                    (
                                                        <div class="mb-6" key={index}>
                                                            <label for={index} class="block text-sm font-medium text-gray-900 dark:text-white capitalize mb-3">
                                                                {item.label}
                                                            </label>
                                                            <input type={item.type} name={index} id={index} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" value={dataDetail[key]} onChange={e => setDataDetail({ ...dataDetail, [key]: e.target.value })} />
                                                        </div>
                                                    ) : ''
                                            }
                                            {
                                                item.tag === "file" ?
                                                    (
                                                        <div class="mb-5">
                                                            <label for="proff_file" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{item.label}</label>
                                                            <input type="file" name={index} id="proff_file" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" onChange={e => setDataDetail({ ...dataDetail, [key]: e.target.files[0] })} placeholder="Upload bukti disini !" />
                                                        </div>
                                                    ) : ''
                                            }
                                            {
                                                item.tag === "date" ?
                                                    (
                                                        <div class="mb-5">
                                                            <label for="date" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{item.label}</label>
                                                            <input type="date" name={index} id="date" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Ketik Nama Barang" value={dataDetail[key]} onChange={e => setDataDetail({ ...dataDetail, [key]: e.target.value })} />
                                                        </div>
                                                    ) : ''
                                            }
                                        </div>
                                    </React.Fragment>
                                ))
                            }
                            <button type="button" onClick={handleUpdate}
                                className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd"
                                        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                        clipRule="evenodd"></path>
                                </svg>
                                Update {title}
                            </button>
                        </form>

                    </div>
                </div>
            </div>
        </>
    )

}