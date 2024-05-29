import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import AlertFalse from "./Alert";

export default function ModalAdd({ isOpen, onClose, endPoint, inputData, title }) {
    if (!isOpen) {
        return null
    }

    const [dataDetail, setDataDetail] = useState([])
    const [message, setMess] = useState([])
    const [stat, setStat] = useState([])

    const [error, setError] = useState([])
    const handleChange = (e) => {
        if (e.target.type === 'file') {
            setDataDetail((prevDataDetail) => ({
                ...prevDataDetail,
                [e.target.name]: e.target.files[0]
            }));
        } else {
            const { name, value } = e.target;
            setDataDetail((prevDataDetail) => ({
                ...prevDataDetail,
                [name]: value
            }));
        }
    };


    function handleStore(event) {
        event.preventDefault()
        const formData = new FormData();

        Object.entries(dataDetail).forEach(([key, value]) => {
            formData.append(key, value);
        });
        console.log(dataDetail);
        axios.post(endPoint['store'], formData, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                'Content-Type': 'multipart/form-data'
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
                if (err.response.status == 401) {
                    Navigate('/login?message=' + encodeURIComponent('Anda belum login'))
                } else {
                    setError(err.response.data)
                }
            })
    }

    Object.entries(inputData).map(([item, index]) => {
        console.log(index.tag);
    })

    return (
        <>
            <div id="crud-modal-add" tabindex="-1" aria-hidden="true"
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
                                Add New {title}
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
                        <form class="p-4 md:p-5">
                            {
                                Object.entries(inputData).map(([index, item]) => (
                                    <>
                                        {
                                            item.tag === "select" ? (
                                                <div class="mb-6" key={index}>
                                                    <label for="category" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                        {item.label}
                                                    </label>
                                                    <select id="category" name={index} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" onChange={handleChange}>
                                                        <option selected hidden disabled>Select category</option>
                                                        {
                                                                item.option.map(opt => (
                                                                    <option key={opt} value={opt.id}>{opt.name}</option>
                                                                ))
                                                        }
                                                    </select>
                                                </div>
                                            ) : ''}

                                        {
                                            item.tag === "input" ?
                                                (
                                                    <div class="mb-6" key={index}>
                                                        <label for={index} class="block text-sm font-medium text-gray-900 dark:text-white capitalize mb-3">
                                                            {item.label}
                                                        </label>
                                                        <input type={item.type} name={index} id={index} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" onChange={handleChange} />
                                                    </div>
                                                ) : ''
                                        }
                                        {
                                            item.tag === "file" ?
                                                (
                                                    <div class="mb-5">
                                                        <label for="proff_file" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{item.label}</label>
                                                        <input type="file" name={index} id="proff_file" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Upload bukti disini !" onChange={handleChange} />
                                                    </div>
                                                ) : ''
                                        }
                                        {
                                            item.tag === "date" ?
                                                (
                                                    <div class="mb-5">
                                                        <label for="date" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{item.label}</label>
                                                        <input type="date" name={index} id="date" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Ketik Nama Barang" onChange={handleChange} />
                                                    </div>
                                                ) : ''
                                        }

                                    </>
                                ))
                            }
                            <button onClick={handleStore} type="button" class="text-white inline-flex items-center bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                                <svg class="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path>
                                </svg>
                                Create {title}
                            </button>

                        </form>
                    </div>
                </div>
            </div>
        </>
    )

}