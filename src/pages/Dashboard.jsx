import React, { useEffect, useState } from 'react'
import Case from '../components/Case'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts'
import { DotLoader } from 'react-spinners'
import Profile from './Profile'


export default function dashboard() {
    const [user, setUser] = useState([])
    const [stuff, setStuff] = useState([])
    const [profile, setProfile] = useState([])
    const [lendings, setLending] = useState([])
    const [checkProces, setCheckProses] = useState(false)
    const [lending, setLendingGrouped] = useState([])
    const [loading, setLoading] = useState(true)

    const navigate = useNavigate()

    useEffect(() => {
        getDataUser();
        getDataStuff();
        getDataLendings();
        getDataIdUser();
        getLending();
    }, [checkProces]);


    const instance = axios.create({
        baseURL: 'http://localhost:8000',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('access_token')
        }
    })


    function getDataLendings() {
        instance.get('/lending', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
            }
        })

            .then(res => {
                const data = res.data.data
                const groupData = {}

                data.forEach(element => {
                    const date = new Date(element.date_time)
                    const formattedData = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
                    if (!groupData[formattedData]) {
                        groupData[formattedData] = []
                    }

                    groupData[formattedData].push(element)



                    const processedData = Object.keys(groupData).map((date) => ({
                        date,
                        totalStuff: groupData[date].reduce((acc, element) => acc + element.total_stuff, 0)
                    }))


                    setLendingGrouped(processedData)

                    setCheckProses(true)
                });


            })

            .catch(err => {
                if (err.response.status == 401) {
                    navigate('/login?message=' + encodeURIComponent('Anda Belum Login'))
                }
            })
    }


    function getDataUser() {
        instance.get('/user', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
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

    function getDataIdUser(){
        instance.get('/profile', {
            headers: {
                'Authorization' : 'Bearer ' + localStorage.getItem('access_token')
            }
        })

            .then(res => {
                setProfile(res.data.data)
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




    function getDataStuff() {
        instance.get('/stuff', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
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




    let lendingBelumRestore = []

    lendings.map(data => {
        if (data.restorations) {
            lendingBelumRestore.push(data)
        }
    })
    let countLendingByUser = []
    lendings.map(data => {
        if (data.user_id === profile.id) {
            countLendingByUser.push(data)
        }
    })

    return (
        <Case>
            {
                loading === true ?
                    <div className="flex justify-center items-center min-h-screen">
                        <DotLoader color="#ffffffff" /> <p className='text-white font-bold'>Loading...</p>
                    </div>
                    :
                    <>
                        <div className="flex flex-wrap justify-center m-10">
                            <div className="p-4 w-1/2">
                                <div className="flex rounded-lg h-full dark:bg-gray-800 bg-teal-400 p-8 flex-col">
                                    <div className="flex items-center mb-3">
                                        <div
                                            className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full dark:bg-indigo-500 bg-indigo-500 text-white flex-shrink-0">
                                            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                                stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                                                <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                                            </svg>
                                        </div>
                                        <h2 className="text-white dark:text-white text-lg font-medium">Data Stuff</h2>
                                    </div>
                                    <div className="flex flex-col justify-between flex-grow">
                                        {
                                            <h1 className="text-white dark:text-white text-lg font-medium">{stuff.length}</h1>
                                        }

                                    </div>
                                </div>
                            </div>
                            <div className="p-4 w-1/2">
                                <div className="flex rounded-lg h-full dark:bg-gray-800 bg-teal-400 p-8 flex-col">
                                    <div className="flex items-center mb-3">
                                        <div
                                            className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full dark:bg-indigo-500 bg-indigo-500 text-white flex-shrink-0">
                                            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                                stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                                                <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                                            </svg>
                                        </div>
                                        <h2 className="text-white dark:text-white text-lg font-medium">Data Lending By User</h2>
                                    </div>
                                    <div className="flex flex-col justify-between flex-grow">
                                        {
                                            <h1 className="text-white dark:text-white text-lg font-medium">{countLendingByUser.length}</h1>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="p-4 w-1/2">
                                <div className="flex rounded-lg h-full dark:bg-gray-800 bg-teal-400 p-8 flex-col">
                                    <div className="flex items-center mb-3">
                                        <div
                                            className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full dark:bg-indigo-500 bg-indigo-500 text-white flex-shrink-0">
                                            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                                stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                                                <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                                            </svg>
                                        </div>
                                        <h2 className="text-white dark:text-white text-lg font-medium">Data Lending Belum Di Restore</h2>
                                    </div>
                                    <div className="flex flex-col justify-between flex-grow">
                                        {
                                            <h1 className="text-white dark:text-white text-lg font-medium">{lendingBelumRestore.length}</h1>
                                        }
                                    </div>
                                </div>
                            </div>

                            <div className="p-4 w-1/2">
                                <div className="flex rounded-lg h-full dark:bg-gray-800 bg-teal-400 p-8 flex-col">
                                    <div className="flex items-center mb-3">
                                        <div
                                            className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full dark:bg-indigo-500 bg-indigo-500 text-white flex-shrink-0">
                                            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                                stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                                                <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                                            </svg>
                                        </div>
                                        <h2 className="text-white dark:text-white text-lg font-medium">Data User</h2>
                                    </div>
                                    <div className="flex flex-col justify-between flex-grow">
                                        <h1 className="text-white dark:text-white text-lg font-medium">{user.length}</h1>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-4 w-1/2">

                            <BarChart className='ml-20' width={1200} height={300} data={lending}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="totalStuff" fill="blue" />
                            </BarChart>

                        </div>
                    </>
            }

        </Case>


    )
}

{/* 
    <div className='bg-gray-900 flex items-center flex-col min-h-screen pt-20'>
        <div className="bg-gray-800 border-t border-gray-600 shadow rounded-lg max-w-lg w-full p-6">
      <Title name="Dashboard" page="Home" lang="React JS"></Title>
            <h4 className='text-white text-2xl'>Hello {name}</h4>
            <p className='text-lg text-gray-400 leading-relaxed'>A JavaScript library for building user interfaces</p>
        </div>
              <Card judul="Produktif" content="        Lorem ipsum dolor sit amet consectetur adipisicing elit. Et nostrum, magni id repellat facere quia vitae ullam sit quas doloribus! Incidunt libero obcaecati dolor dicta eveniet exercitationem aperiam nulla, fugiat iusto illum, recusandae repellendus voluptatum, quia modi praesentium aliquid quasi? Tenetur voluptatum molestiae quidem repellat esse ab totam accusantium harum?

"></Card>

    </div> */}