import React, { useEffect } from 'react'
import {useState} from 'react'
import Case from './components/Case'
// import Title from './components/Title'
import Card from './components/Card'
import axios from 'axios'


export default function App() {
    const [name, setName] = useState([])//state = variabel
    useEffect(() => {
        axios.get('http://localhost:8000/profile', {
            headers: {
                'Authorization' : 'Bearer ' + localStorage.getItem('access_token'),
            }
        })
        .then(res => {
            setName(res.data.data)
            console.log(profile);
        })
        .catch(err => {
            console.log(err);
            if (err.response.status == 401) {
                navigate('/login?message = ' + encodeURIComponent('anda belum login'))
                
            }
        })
    }, [])


  return (
    <Case>
          <div className='bg-gray-900 flex items-center flex-col min-h-screen pt-20'>
      <Card 
        judul={`Hello ${name.username}`}
        content="Apakah Anda membutuhkan barang untuk waktu tertentu tanpa harus membelinya? Web Stuff hadir untuk memenuhi kebutuhan Anda! Kami adalah platform peminjaman yang dirancang untuk memudahkan Anda mendapatkan berbagai barang yang Anda perlukan dengan cepat dan mudah. "
      />
      </div>
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