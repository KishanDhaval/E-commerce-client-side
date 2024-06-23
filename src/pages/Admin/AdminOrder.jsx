import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layouts/Layout';
import AdminMenu from '../../components/Layouts/AdminMenu';
import axios from 'axios';
import moment from 'moment';
import { Select } from 'antd';
import { useAuthContext } from '../../hooks/useAuthContext';

const apiUrl = import.meta.env.VITE_API_URL;

const AdminOrder = () => {
  const { Option } = Select;
  const { user } = useAuthContext();

  const [statusOptions] = useState(['Not Process', 'Processing', 'Shipped', 'Delivered', 'Cancelled']);
  const [orders, setOrders] = useState([]);

  
    const getOrders = async () => {
      try {
        const { data } = await axios.get(`${apiUrl}/api/v1/auth/all-orders`);
        setOrders(data?.orders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
    useEffect(() => {
    if (user?.token) {
      getOrders();
    }
  }, [user?.token]);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
        const {data} = await axios.put(`${apiUrl}/api/v1/auth/order-status/${orderId}` ,{status : newStatus})
        getOrders()
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  return (
    <Layout title={'Order Detail'}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">All Orders</h1>
            {orders?.map((order, index) => (
              <div key={order._id} className="border shadow mb-3 p-3">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Status</th>
                      <th scope="col">Buyer</th>
                      <th scope="col">Order date</th>
                      <th scope="col">Payment</th>
                      <th scope="col">Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{index + 1}</td>
                      <td>
                        <Select
                          bordered={false}
                          onChange={(value) => handleStatusChange(order._id, value)}
                          defaultValue={order.status}
                        >
                          {statusOptions.map((status, i) => (
                            <Option key={status} value={status}>
                              {status}
                            </Option>
                          ))}
                        </Select>
                      </td>
                      <td>{order?.buyer.name}</td>
                      <td>{moment(order?.createdAt).fromNow()}</td>
                      <td>{order?.payment.success ? 'Success' : 'Failed'}</td>
                      <td>{order?.products?.length}</td>
                    </tr>
                  </tbody>
                </table>
                <div className="container">
                  {order?.products?.map((product) => (
                    <div key={product._id} className="row mb-2 card flex-row">
                      <div className="col-md-4 m">
                        <img
                          src={`${apiUrl}/api/v1/product/product-photo/${product._id}`}
                          className="card-img-top"
                          alt={product.name}
                        />
                      </div>
                      <div className="col-md-8">
                        <p>{product.name}</p>
                        <p>{product.description.substring(0, 30)} . . .</p>
                        <p>$ {product.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminOrder;
