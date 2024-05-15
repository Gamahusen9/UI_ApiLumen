import React, { useEffect, useState } from "react";
import Case from "../../components/Case";
import axios from "axios"
import { useNavigate } from 'react-router-dom'

export default function inbound() {
    return (
        <Case>
            <h1 className="text-white">Ini adalah inbound</h1>
        </Case>
    )
}