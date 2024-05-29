import React, { useEffect, useState } from "react";
import Case from "../components/Case";
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import Table from "../components/Table";
import { DotLoader } from "react-spinners";

export default function Inbound() {
    const [dataRestore, setRestore] = useState([])
    const [dataLending, setLending] = useState([])
    const [dataUser, setUser] = useState([])
    const [loading, setLoading] = useState(true)


    const navigate = useNavigate();
    const instance = axios.create({
        baseURL: 'http://localhost:8000',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('access_token')
        }
    })

    function getRestore(params) {
        instance.get('/restoration', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            }
        })
            .then(res => {
                setLoading(false)
                setRestore(res.data.data)
            })
            .catch(err => {
                if (err.response.status == 401) {
                    navigate('/login?message = ' + encodeURIComponent('anda belum login'))

                }
            })
    }

    function getLending(params) {
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

    function getLending(params) {
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


    useEffect(() => {
        getRestore();
        getLending();
        getUser()
    }, [])
    




 

    const endPointModal = {
        "data_detail": "http://localhost:8000/restoration/show/{id}",
        "delete": "http://localhost:8000/restoration/delete/{id}",
        "update": "http://localhost:8000/restoration/patch/{id}",
        "store": "http://localhost:8000/restoration/create"
    }

    const headers = [
        "#",
        "Lending Id",
        "Username",
        "Date Time",
        "Good Stuff",
        "Defec Stuff",
        "Action",
    ]
    const coloumnForTd = [
        "id",
        "lending_id",
        "username",
        "date_time",
        "total_good_stuff",
        "total_defec_stuff"
    ]

    const title = 'Restorations'


    

    const array1 = dataLending.map(obj => ({ id: obj.id, name: obj.username }));

    const inputData = {
        "lending_id": {
            "tag": "select",
            "type": "select",
            "option": array1,
            "label": "Pilih Lending"
        },
        "date_time": {
            "tag": "date",
            "type": "date",
            "option": null,
            "label": "Date"
        },
        "total_good_stuff": {
            "tag": "input",
            "type": "number",
            "option": null,
            "label": "Good Stuff"
        },
        "total_defec_stuff": {
            "tag": "input",
            "type": "number",
            "option": null,
            "label": "Defec Stuff"
        }
    }




    const buttons = [
        'create',
        // 'trash',
        'delete'
    ]

    const identitasColoumn = `index`

    return (
        <Case>
            {
                loading === true ?
                    <div className="flex justify-center items-center min-h-screen">
                        <DotLoader color="#ffffffff" /> <p className="text-white font-bold">Loading...</p>
                    </div> : <Table headers={headers} data={dataRestore} endPointModal={endPointModal} inputData={inputData} opsiButton={buttons} coloumnForTd={coloumnForTd} title={title} identitasColoumn={identitasColoumn}></Table>
            }

        </Case>
    )
}