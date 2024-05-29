import React, { useEffect, useState } from "react";
import Case from "../components/Case";
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import Table from "../components/Table";
import { DotLoader } from "react-spinners";

export default function Inbound() {
    const [dataInbound, setInbound] = useState([])
    const [dataStuff, setStuff] = useState([])
    const [dataProfile, setProfile] = useState([])
    const [loading, setLoading] = useState(true)


    const navigate = useNavigate();
    const instance = axios.create({
        baseURL: 'http://localhost:8000',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('access_token')
        }
    })

    function getInbound() {
        instance.get('/lending', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            }
        })
            .then(res => {

                setInbound(res.data.data)
            })
            .catch(err => {
                if (err.response.status == 401) {
                    navigate('/login?message = ' + encodeURIComponent('anda belum login'))

                }
            })
    }

    function getStuff() {
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

    function getProfile() {
        instance.get('/profile', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            }
        })
            .then(res => {
                setLoading(false)
                setProfile(res.data.data)
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
        getProfile();
    }, [])

    const namesArray = dataStuff.map(obj => ({ id: obj.id, name: obj.name }));


    const endPointModal = {
        "data_detail": "http://localhost:8000/lending/show/{id}",
        "delete": "http://localhost:8000/lending/delete/{id}",
        "update": "http://localhost:8000/lending/patch/{id}",
        "store": "http://localhost:8000/lending/create"
    }

    let headers;
    let buttons;


    if (dataProfile.role == 'admin') {
        headers = [
            "#",
            "Name",
            "Category",
            "Date Time",
            "Username",
            "Notes",
            "Total Stuff",
            // "Action"
        ],
            buttons = [
                // 'create',
                // 'trash',
                // 'edit',
                // 'delete'
            ]
    } else {
        headers = [
            "#",
            "Name",
            "Category",
            "Date Time",
            "Username",
            "Notes",
            "Total Stuff",
            "Action"
        ],
            buttons = [
                'create',
                'trash',
                'edit',
                'delete',
                'restore'
            ]
    }

    const coloumnForTd = [
        "id",
        "name",
        "category",
        "date_time",
        "username",
        "notes",
        "total_stuff"
    ]

    const title = 'Lending'




    const inputData = {
        "stuff_id": {
            "tag": "select",
            "type": "select",
            "option": namesArray,
            "label": "Stuff"
        },
        "date_time": {
            "tag": "date",
            "type": "date",
            "option": null,
            "label": "Date"
        },
        "username": {
            "tag": "input",
            "type": "text",
            "option": null,
            "label": "Name"
        },
        "notes": {
            "tag": "input",
            "type": "text",
            "option": null,
            "label": "Notes"
        },
        "total_stuff": {
            "tag": "input",
            "type": "number",
            "option": null,
            "label": "Total Stuff"
        }
    }




    return (
        <Case>
            {
                loading === true ?
                    <div className="flex justify-center items-center min-h-screen">
                        <DotLoader color="#ffffffff" />
                        <br />
                        <p className="text-white font-bold">Loading..</p>
                    </div> : <Table headers={headers} data={dataInbound} endPointModal={endPointModal} inputData={inputData} opsiButton={buttons} coloumnForTd={coloumnForTd} title={title}></Table>
            }

        </Case>
    )
}