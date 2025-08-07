import axios from 'axios'
import { Button } from 'bootstrap'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

const User = () => {
    const [users,setUsers]=useState([])
    useEffect(()=>{
        axios.get('https://merncrudbackend-w96x.onrender.com/')
        .then(result=>{
            console.log(result)
            setUsers(result.data)})
        .catch(err=>console.log(err))
    },[])
    // const handleDelete=(id)=>{
    //     axios.delete('/deleteUser/'+id)
    //     .then(res=>console.log(res))
    //     .catch(err=>console.log(err))
    // }
    const handleDelete = (id) => {
  axios.delete(`https://merncrudbackend-w96x.onrender.com/deleteUser/${id}`)
    .then(res => {
      console.log(res);
      // Optional: Refresh the list after delete
      setUsers(prev => prev.filter(user => user._id !== id));
    })
    .catch(err => console.log(err));
}

    
  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
        <div className='w-50 bg-white rounded-p-3'>
            <Link to='/create' className='btn btn-success'> Add +</Link>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Age</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((users)=>{
                           return  <tr key={users._id}>
                                <td>{users.name}</td>
                                <td>{users.email}</td>
                                <td>{users.age}</td>
                                <td>
                                    <Link to={`/update/${users._id}`} className='btn btn-success'>Edit</Link>
                                    
                                    <button className='btn btn-danger' onClick={(e)=>{
                                        handleDelete(users._id)
                                    }}>Delete</button>
                                </td>
                            </tr>
                        })
                    }
                </tbody>
                
            </table>    
        </div>

    </div>
  )
}

export default User