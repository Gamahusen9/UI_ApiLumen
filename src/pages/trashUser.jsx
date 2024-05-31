import React, { useEffect, useState } from "react";
import Case from "../components/Case";
import axios from "axios";
import Table from "../components/Table";
import { Navigate } from "react-router-dom";


export default function trashUser() {
    const [userTrash, setuserTrash] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8000/user/trash', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            }
        })

            .then(res => {
                console.log(res.data.data);
                setuserTrash(res.data.data)
            })
            .catch(err => {
                console.log(err);
                if (err.response.status == 401) {
                    Navigate('/login?message=' + encodeURIComponent('Anda belum login'))
                }
            })
    }, [])


    const headers = [
        "#",
        "Username",
        "Email",
        "Role"
    ]

    const inputData = {}

    const title = 'Trash User'

    const coloumnIdentitasDelete = "name"

    const buttons = [
        "trashButtonTd",
        "permanentDelete"
    ]

    const coloumnForTd = [
        "username",
        "email",
        "role",
    ]

    const endPointModal = {
        "restore": "http://localhost:8000/stuff/restore/{id}",
        "delete_permanent": "http://localhost:8000/stuff/permanentDel/{id}",
        "trash" : "/user/trash"
    }

    return (
        <>
            <Case>
                <Table headers={headers} data={userTrash} endPointModal={endPointModal} inputData={inputData} titleModal={title} identitasColoumn={coloumnIdentitasDelete} opsiButton={buttons} coloumnForTd={coloumnForTd}></Table>
            </Case>
        </>
    )
}