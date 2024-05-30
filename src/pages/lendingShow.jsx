import React, { useEffect, useState } from "react";
import Case from "../components/Case";
import axios from "axios"
import { useNavigate, useParams } from 'react-router-dom'
import Table from "../components/Table";
import { DotLoader } from "react-spinners";

export default function LendingShow() {
    const [dataUser, setUser] = useState([])
    const [loading, setLoading] = useState(true)
    const [lending, setLending] = useState([])

    const { id } = useParams()


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
            })
            .catch(err => {
                if (err.response.status == 401) {
                    navigate('/login?message = ' + encodeURIComponent('anda belum login'))

                }
            })
    }

    function getLending() {
        instance.get('/lending', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            }
        })
            .then(res => {
                setLending(res.data.data)
            })
            .catch(err => {
                if (err.response.status == 401) {
                    navigate('/login?message = ' + encodeURIComponent('anda belum login'))

                }
            })
    }





    let tampungDataLending = []


    lending.map(data => {
        console.log(id);
        if (data.user_id == id) {
            tampungDataLending.push(data)
        }
    })
    console.log(tampungDataLending);



    useEffect(() => {
        getUser();
        getLending();
    }, [])





    const headers = [
        "#",
        "Username",
        "Role",
        "Nama barang",
        "Category",
        "Total Barang Stuff",
        "Notes"
    ]
    const coloumnForTd = [
        "id",
        "username",
        "role",
        "name",
        "category",
        "total_stuff",
        "notes"
    ]

    const title = 'LendingShowByUser'

   


    const buttons = [
        // 'create',
        // 'trash',
        // 'edit',
        // 'delete'
    ]


    return (
        <Case>
            {
                loading === true ?

                    <div className="flex justify-center items-center min-h-screen">
                        <DotLoader color="#ffffffff" /> <p className="text-white font-bold">Loading...</p>
                    </div>

                    :
                    <Table headers={headers} data={tampungDataLending}  opsiButton={buttons} coloumnForTd={coloumnForTd} title={title}></Table>
            }
        </Case>
    )
}