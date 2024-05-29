import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import ModalDelete from "./ModalDelete";
import ModalEdit from "./ModalEdit";
import ModalAdd from "./ModalAdd";


export default function Table({ headers, data, endPointModal, identitasColoumn, inputData, opsiButton, coloumnForTd, title }) {



    const selectedData = data.map(dataElement => {
        const newObject = {};

        coloumnForTd.forEach(element => {
            if (title === "Stuff") {
                if (element === 'total_available' || element === 'total_defect') {
                    if (dataElement.stuffstock === null) {
                        newObject[element] = 0;
                    } else {
                        newObject[element] = dataElement.stuffstock[element] === null ? 0 : dataElement.stuffstock[element];
                    }
                } else {
                    newObject[element] = dataElement[element];
                }
            } else if (title === "Inbound") {
                if (element === 'name' || element === 'category') {
                    newObject[element] = dataElement.stuff[element]
                } else {
                    newObject[element] = dataElement[element]
                }
            } else if (title === "Lending") {
                if (element === 'name' || element === 'category') {
                    newObject[element] = dataElement.stuff[element]
                } else {
                    newObject[element] = dataElement[element]
                }
            } else if (title === 'Restorations') {
                if (element === 'username') {
                    newObject[element] = dataElement.user[element]
                } else {
                    newObject[element] = dataElement[element]

                }
            }

        });

        return newObject;
    });




    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false)
    const [isModalEditOpen, setIsModalEditOpen] = useState(false)
    const [isModalAddOpen, setIsModalAddOpen] = useState(false)
    const [endPointToSend, setEndPointToSend] = useState([])

    function handleModalDelete(id) {
        const endPointDelete = endPointModal['delete']
        const endPointDetail = endPointModal['data_detail']
        const replaceUrlDelete = endPointDelete.replace("{id}", id)
        const replaceUrlDetail = endPointDetail.replace("{id}", id)
        const endPointReplaced = {
            "data_detail": replaceUrlDetail,
            "delete": replaceUrlDelete
        }

        setEndPointToSend(endPointReplaced)
        setIsModalDeleteOpen(true)
    }

    function handleModalAdd() {
        const endPointToSend = {
            "store": endPointModal['store']
        }

        setEndPointToSend(endPointToSend)
        setIsModalAddOpen(true)
    }

    function handleModalEdit(id) {
        const endPointEdit = endPointModal['update']
        const endPointDetail = endPointModal['data_detail']
        const replaceUrlEdit = endPointEdit.replace("{id}", id)
        const replaceUrlDetail = endPointDetail.replace("{id}", id)
        const endPointReplaced = {
            "data_detail": replaceUrlDetail,
            "update": replaceUrlEdit
        }


        setEndPointToSend(endPointReplaced)
        setIsModalEditOpen(true)
    }
    const instance = axios.create({
        baseURL: 'http://localhost:8000',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('access_token')
        }
    })

    function handleRestore(id) {
        const endPointRestore = endPointModal['restore'].replace("{id}", id)


        axios.put(endPointRestore, {}, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            }
        })


            .then(res => {
                window.location.reload()
            })
            .catch(err => {
                console.log(err.response.status);
            })
    }

    function handlePermanentDel(id) {
        const endPointPermanentDelete = endPointModal['delete_permanent'].replace("{id}", id)

        axios.delete(endPointPermanentDelete, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            }
        })

            .then(res => {
                window.location.reload()
            })
            .catch(err => {
                console.log(err);
                if (err.response.status == 401) {
                    Navigate('/login?message=' + encodeURIComponent('Anda belum login'))

                }
            })
    }




    const imgURL = 'http://localhost:8000/uploads/'
    return (
        <>
            <div className="flex justify-between mt-20">
                <h1 className="text-white text-2xl font-bold pl-10">{title}</h1>
                <div className="mr-10">
                    {
                        opsiButton.includes('create') ?
                            <button type="button" onClick={handleModalAdd} class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 mb-5 rounded-lg">Create</button> : ''
                    }
                    {
                        opsiButton.includes('trash') ? <Link to={'/stuff/trash'} class="inline-flex items-center px-4 py-2 text-sm ml-3 font-medium text-center text-white bg-yellow-700 hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-yellow-300 dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800 mb-5 rounded-lg">Trash</Link>
                            : ''
                    }
                </div>
            </div>
            <div className="relative overflow-x-auto flex items-center mt-3 flex flex-col shadow-md rounded-lg m-5">


                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 rounded-lg">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            {headers.map((header, index) => (
                                <th scope="col" className="px-6 py-3" key={index}>{header}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {selectedData.map((items, rowIndex) => (
                            <tr key={rowIndex}>
                                <td className="pl-4">{rowIndex + 1}</td>
                                {coloumnForTd.map((header, colIndex) => (
                                    header !== 'id' && (
                                        header === 'proff_file' ?
                                            <td key={colIndex} className="w-20 h-25"><img src={imgURL + items[header]} alt="" srcset="" /></td>
                                            :
                                            <td key={colIndex} className="px-6 py-4">{items[header]}</td>
                                    )
                                ))}
                                <td className="px-6 py-4">
                                    {
                                        opsiButton.includes('edit') ?
                                            (
                                                <button type="button" onClick={() => handleModalEdit(items.id)} class="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 m-2">Edit</button>
                                            ) : ''
                                    }
                                    {
                                        opsiButton.includes('delete') ? (
                                            <button type="button" onClick={() => handleModalDelete(items.id)} className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800">Delete</button>
                                        ) : ''
                                    } {

                                        opsiButton.includes('permanentDelete') ? (
                                            <button type="button" onClick={() => handlePermanentDel(items.id)} className="font-medium text-red-500 dark:text-red-500 hover:underline ml-3">Permanent Delete</button>
                                        ) : ''
                                    }
                                    {
                                        opsiButton.includes('restore') ? (
                                            <Link to={'/restorations'}>

                                                <button type="button" className="text-white bg-red-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-orange-600 dark:hover:bg-orange-700 focus:outline-none dark:focus:ring-red-800">Restore</button>
                                            </Link>

                                        ) : ''
                                    }
                                </td>
                            </tr>
                        ))}


                    </tbody>
                </table>
            </div>

            <ModalDelete isOpen={isModalDeleteOpen} onClose={() => setIsModalDeleteOpen(false)} endPoint={endPointToSend} identitasColoumn={identitasColoumn}></ModalDelete>
            <ModalEdit isOpen={isModalEditOpen} onClose={() => setIsModalEditOpen(false)} endPoint={endPointToSend} inputData={inputData} title={title}></ModalEdit>
            <ModalAdd isOpen={isModalAddOpen} onClose={() => setIsModalAddOpen(false)} endPoint={endPointToSend} inputData={inputData} title={title}></ModalAdd>


        </>
    );
}
