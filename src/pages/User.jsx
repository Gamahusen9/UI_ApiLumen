import React, { useEffect, useState } from "react";
import Case from "../components/Case";
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import Table from "../components/Table";
import { DotLoader } from "react-spinners";

export default function Inbound() {
    const [dataUser, setUser] = useState([])
    const [loading, setLoading] = useState(true)



    const navigate = useNavigate();
    const instance = axios.create({
        baseURL: 'http://localhost:8000',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('access_token')
        }
    })

    function getUser(params) {
        instance.get('/user', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            }
        })
            .then(res => {
                setLoading(false)
                setUser(res.data.data)
                console.log(res.data.data);
            })
            .catch(err => {
                if (err.response.status == 401) {
                    navigate('/login?message = ' + encodeURIComponent('anda belum login'))

                }
            })
    }




    useEffect(() => {
        getUser();
    }, [])



    const endPointModal = {
        "data_detail": "http://localhost:8000/user/show/{id}",
        "delete": "http://localhost:8000/user/delete/{id}",
        "update": "http://localhost:8000/user/patch/{id}",
        "store": "http://localhost:8000/user/create",
        "trash": "/user/trash"

    }

    const headers = [
        "#",
        "Username",
        "Email",
        "Role",
        "Action"
    ]
    const coloumnForTd = [
        "id",
        "username",
        "email",
        "role",
    ]

    const title = 'User'

    const categoryOption = [
        { id: 'admin', name: 'Admin' },
        { id: 'staff', name: 'Staff' },
    ]



    const inputData = {
        "username": {
            "tag": "input",
            "type": "text",
            "option": null,
            "label": "Username"
        },
        "email": {
            "tag": "input",
            "type": "email",
            "option": null,
            "label": "Email"
        },
        "role": {
            "tag": "select",
            "type": "select",
            "option": categoryOption,
            "label": "Name"
        },

        "password": {
            "tag": "input",
            "type": "password",
            "option": null,
            "label": "Password"
        }
    }



    const buttons = [
        'create',
        'trash',
        'edit',
        'delete',
        'lendingShow', 
    ]


    return (
        <Case>
            {
                loading === true ?

                    <div className="flex justify-center items-center min-h-screen">
                        <DotLoader color="#ffffffff" /> <p className="text-white font-bold">Loading...</p>
                    </div>

                    :
                    <Table headers={headers} data={dataUser} endPointModal={endPointModal} inputData={inputData} opsiButton={buttons} coloumnForTd={coloumnForTd} title={title}></Table>
            }
        </Case>
    )
}