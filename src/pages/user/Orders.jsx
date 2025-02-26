import React, { useState, useEffect } from 'react'
import Layout from '../../components/Layouts/Layout'
import UserMenu from '../../components/Layouts/UserMenu'
import axios from 'axios'
import moment from 'moment'
const apiUrl = import.meta.env.VITE_API_URL;

import { useAuthContext } from '../../hooks/useAuthContext';
import axiosInstance from '../../utils/axiosConfig'

const Orders = () => {
    const { user } = useAuthContext()

    const [orders, setOrders] = useState([])

    const getOrder = async () => {
        try {
            const { data } = await axiosInstance.get(`/api/v1/auth/orders`)
            setOrders(data?.orders)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (user?.token) getOrder()
    }, [user?.token])

    return (
        <Layout title={'your Orders'}>
            <div className="container-fluid p-3 ">
                <div className="row">
                    <div className="col-md-3">
                        <UserMenu />
                    </div>

                    <div className="col-md-9">
                        <h1 className='text-center'>All Orders</h1>
                        {
                            orders?.map((o, i) => {
                                return (
                                    <div className="border shadow">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th scope='col'>#</th>
                                                    <th scope='col'>Status</th>
                                                    <th scope='col'>Buyer</th>
                                                    <th scope='col'>Order date</th>
                                                    <th scope='col'>Payment</th>
                                                    <th scope='col'>Quantity</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>{i + 1}</td>
                                                    <td>{o?.status}</td>
                                                    <td>{o?.buyer.name}</td>
                                                    <td>{moment(o?.createAt).fromNow()}</td>
                                                    <td>{o?.payment.success ? 'Success' : "Failed"}</td>
                                                    <td>{o?.products?.length}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <div className="container">
                                            {o?.products?.map((p,i) => (
                                                <div key={p._id} className="row mb-2 card flex-row">
                                                    <div className="col-md-4 m">
                                                        <img
                                                            src={`${apiUrl}/api/v1/product/product-photo/${p._id}`}
                                                            className="card-img-top"
                                                            alt={p.name}
                                                        />
                                                    </div>
                                                    <div className="col-md-8">
                                                        <p>
                                                            {p.name}
                                                        </p>
                                                        <p>{p.description.substring(0, 30)}</p>
                                                        <p>$ {p.price}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Orders
