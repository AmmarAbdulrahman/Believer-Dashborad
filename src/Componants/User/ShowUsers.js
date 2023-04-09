import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Table , Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
//import Headers from "./Headers.css"

const ShowUsers = () => {

    const navigate = useNavigate();
    const [users,setUsers] = useState([])

    useEffect(() => {
      if(!localStorage.getItem("token")){
        navigate("/signUp")
      }else
        {fetchAllUsers();}
    } , []);


    const fetchAllUsers = () => {
        axios.get("admin/users" , {
            headers : {
                "x-auth-token" : localStorage.getItem("token")
            }
        }).then((res)=>{
            setUsers(res.data)
            console.log(res.data)
        }).catch((err)=>{
            console.log(err)
        })
    }

    const handleDeleteUser = async (_id) => {
      const response = await axios.delete(`admin/users/${_id}`,{headers:{
        "x-auth-token" : localStorage.getItem("token")
      }}).then(()=>{
        fetchAllUsers();
      }).catch((error)=>{
        console.log(error)
      })
    }
  return (
    <div>
      <Header />
            <Table className="table" striped bordered hover>
             <thead>
             <tr className="th">
               <th>#</th>
               <th>Name</th>
               <th>Email</th>
               <th>Gender</th>
               <th>Height</th>
               <th>Weight</th>
               <th>Action</th>
             </tr>
           </thead>
           {
             users.map((user , index) => (
           <tbody key={user._id}>
          
             <tr >
               <td>{index+1}</td>
               <td>{user.name}</td>
               <td>{user.email}</td>
               <td>{user.gender}</td>
               <td>{user.height}</td>
               <td>{user.weight}</td>
               <td><Button variant="danger" onClick={()=>{handleDeleteUser(user._id)}} >Delete</Button></td>
             </tr>
           </tbody>
                 ))}
       </Table>
    </div>
  );
};

export default ShowUsers;
