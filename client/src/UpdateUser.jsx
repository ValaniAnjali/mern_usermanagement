import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateUser=()=>{
    const {id}=useParams()
    const [name,setName]=useState()
      const [email,setEmail]=useState()
      const [age,setAge]=useState()
      const navigate=useNavigate()

      useEffect(()=>{
        axios.get('https://merncrudbackend-w96x.onrender.com/getUser/'+id)
        .then(result=>{
            console.log(result)
            setName(result.data.name)
            setAge(result.data.age)
            setEmail(result.data.email)
        })
        .catch(err=>console.log(err))
    },[])
    const Update=(e)=>{
        e.preventDefault()
        axios.put("https://merncrudbackend-w96x.onrender.com/updateUser/"+id,{name,email,age})
    .then(result=>{
        console.log(result)
        navigate('/')
    })
    .catch(err=>console.log(err))
    }
    return(
        <div>
        <form onSubmit={Update}>
        <div className='mb-2'>
                <label htmlFor=''>Name</label>
                <input type="text" placeholder='Enter Name' className='form-control' value={name}
                onChange={(e)=>setName(e.target.value)} />
            </div>
            <div className='mb-2'>
                <label htmlFor=''>Email</label>
                <input type="email" placeholder='Enter Email' className='form-control' value={email}
                onChange={(e)=>setEmail(e.target.value)}/>

            </div>
            <div className='mb-2'>
                <label htmlFor=''>Age</label>
                <input type='text' placeholder='Enter Age' className='form-control' value={age}
                onChange={(e)=>setAge(e.target.value)}/>
            </div>
            <button className="btn btn-success">Update</button>
            </form>
        </div>
    );
}
export default UpdateUser;