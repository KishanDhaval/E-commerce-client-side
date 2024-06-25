import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layouts/Layout'
import AdminMenu from '../../components/Layouts/AdminMenu'
import axios from 'axios'
const apiUrl = import.meta.env.VITE_API_URL;

const Users = () => {

  const [users , setUsers]=  useState([])

    const getAllUser = async()=>{
        try {
            const {data} = await axios.get(`${apiUrl}/api/v1/auth/all-users`)
            setUsers(data.users)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        getAllUser()
    },[])

    return (
        <Layout title={'Dashboard - All users'}>
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h1>All users</h1>
                           <table className="table">
                           <thead>
                               <tr>
                                   <th scope='col'>#</th>
                                   <th scope='col'>Name</th>
                                   <th scope='col'>email</th>
                                   <th scope='col'>Address</th>
                                   <th scope='col'>Phone</th>
                               </tr>
                           </thead>
                        {users?.map((user,i)=>(
                           <tbody>
                               <tr>
                                   <td>{i + 1}</td>
                                   <td>{user?.name}</td>
                                   <td>{user?.email}</td>
                                   <td>{user?.address }</td>
                                   <td>{user?.phone}</td>
                               </tr>
                           </tbody>
                        ))}
                        </table>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Users
