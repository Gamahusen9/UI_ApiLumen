import React, { useEffect, useState } from "react";
import Case from "../components/Case";
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import Table from "../components/Table";
import { DotLoader } from "react-spinners";

export default function Inbound() {
    const [dataInbound, setInbound] = useState([])
    const [dataStuff, setStuff] = useState([])
    const [loading, setLoading] = useState(true)


    const navigate = useNavigate();
    const instance = axios.create({
        baseURL: 'http://localhost:8000',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('access_token')
        }
    })

    function getInbound(params) {
        instance.get('/inbound', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            }
        })
            .then(res => {
                setLoading(false)
                setInbound(res.data.data)
            })
            .catch(err => {
                if (err.response.status == 401) {
                    navigate('/login?message = ' + encodeURIComponent('anda belum login'))

                }
            })
    }

    function getStuff(params) {
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
    }


    useEffect(() => {
        getInbound();
        getStuff();
    }, [])

    const namesArray = dataStuff.map(obj => ({ id: obj.id, name: obj.name }));
    console.log(namesArray);


    const endPointModal = {
        "data_detail": "http://localhost:8000/inbound/show/{id}",
        "delete": "http://localhost:8000/inbound/delete/{id}",
        "update": "http://localhost:8000/inbound/patch/{id}",
        "store": "http://localhost:8000/inbound/create"
    }

    const headers = [
        "#",
        "Name",
        "Category",
        "Total",
        "Date",
        "Prof_file",
        "Action",
    ]
    const coloumnForTd = [
        "id",
        "name",
        "category",
        "total",
        "date",
        "proff_file"
    ]

    const title = 'Inbound'



    const inputData = {
        "stuff_id": {
            "tag": "select",
            "type": "select",
            "option": namesArray,
            "label": "Nama"
        },
        "total": {
            "tag": "input",
            "type": "number",
            "option": null,
            "label": "Total"
        },
        "date": {
            "tag": "date",
            "type": "date",
            "option": null,
            "label": "Date"
        },
        "proff_file": {
            "tag": "file",
            "type": "file",
            "option": null,
            "label": "Proff_file"
        }
    }




    const buttons = [
        'create',
        'trash',
        'delete'
    ]

    const identitasColoumn = `index`

    return (
        <Case>
            {
                loading === true ?
                    <div className="flex justify-center items-center min-h-screen">
                        <DotLoader color="#ffffffff" /> <p className="text-white font-bold">Loading...</p>
                    </div> : <Table headers={headers} data={dataInbound} endPointModal={endPointModal} inputData={inputData} opsiButton={buttons} coloumnForTd={coloumnForTd} title={title} identitasColoumn={identitasColoumn}></Table>
            }

        </Case>
    )
}