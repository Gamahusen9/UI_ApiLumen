import React, { useEffect, useState } from "react";
import Case from "../components/Case";
import axios from "axios";
import Table from "../components/Table";
import { Navigate } from "react-router-dom";


export default function TrashStuff() {
    const [stuffTrash, setStuffTrash] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8000/stuff/trash', {
            headers: {
                'Authorization' : 'Bearer ' + localStorage.getItem('access_token')
            }
        })

        .then(res => {
            console.log(res.data.data);
            setStuffTrash(res.data.data)
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
        "Name", 
        "Category",
        "action"
    ]

    const inputData = {}

    const title = 'Stuff'

    const coloumnIdentitasDelete = "name"

    const buttons = [
        "restore", 
        "permanentDelete"
    ]

    const coloumnForTd = [
        "id",
        "name",
        "category",
    ]

    const endPointModal = {
        "restore" : "http://localhost:8000/stuff/restore/{id}",
        "delete_permanent" : "http://localhost:8000/stuff/permanentDel/{id}"
    }

    return (
        <>
        <Case>
            <Table headers={headers} data={stuffTrash} endPointModal={endPointModal} inputData={inputData} titleModal={title} identitasColoumn={coloumnIdentitasDelete} opsiButton={buttons} coloumnForTd={coloumnForTd}></Table>
        </Case>
        </>
    )
}