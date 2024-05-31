import React, { useEffect, useState } from "react";
import Case from "../components/Case";
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import Table from "../components/Table";
import { DotLoader, FadeLoader } from "react-spinners";

export default function Stuff() {
    const [dataStuff, setStuff] = useState([])
    const [loading, setLoading] = useState(true)


    const navigate = useNavigate();
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
                setLoading(false)
                setStuff(res.data.data)
            })
            .catch(err => {
                setLoading(false)
                if (err.response.status == 401) {
                    navigate('/login?message = ' + encodeURIComponent('anda belum login'))

                }
            })
    }, [])

    const endPointModal = {
        "data_detail": "http://localhost:8000/stuff/show/{id}",
        "delete": "http://localhost:8000/stuff/delete/{id}",
        "update": "http://localhost:8000/stuff/patch/{id}",
        "store": "http://localhost:8000/stuff/create",
        "trash": "/stuff/trash"

    }

    const headers = [
        "#",
        "Name",
        "Category",
        "Total Available",
        "Total Defec",
        "Action",
    ]
    const coloumnForTd = [
        "id",
        "name",
        "category",
        "total_available",
        "total_defect"
    ]

    const title = 'Stuff'

    const categoryOption = [
        { id: 'KLN', name: 'KLN' },
        { id: 'HTL', name: 'HTL' },
        { id: 'Teknisi/Sarpras', name: 'Teknisi/Sarpras' }

    ]
    const inputData = {
        "name": {
            "tag": "input",
            "type": "text",
            "option": null,
            "label": "Nama"
        },
        "category": {
            "tag": "select",
            "type": "select",
            "option": categoryOption,
            "label": "Category"
        },
    }



    const buttons = [
        'create',
        'trash',
        'edit',
        'delete'
    ];

    const identitasColoumn = "name"





    return (
        <Case>
            {
                loading === true ?

                    <div className="flex justify-center items-center min-h-screen">
                        <DotLoader color="#ffffffff" /> <p className="text-white font-bold">Loading...</p>
                    </div>

                    :
                    <Table headers={headers} data={dataStuff} endPointModal={endPointModal} inputData={inputData} opsiButton={buttons} coloumnForTd={coloumnForTd} title={title} identitasColoumn={identitasColoumn}></Table>
            }

        </Case>
    )
}