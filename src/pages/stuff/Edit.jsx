import React, { useEffect, useState } from "react";
import Case from "../../components/Case";
import axios from "axios"
import { useNavigate } from 'react-router-dom'

export default function stuffEdit(){
    return(
        <Case>
            <h1 className="text-white">Ini adalah edit Stuff</h1>
        </Case>
    )
}