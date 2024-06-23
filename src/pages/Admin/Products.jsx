import React, { useState, useEffect } from 'react'
import AdminMenu from '../../components/Layouts/AdminMenu'
import Layout from '../../components/Layouts/Layout'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'

const apiUrl = import.meta.env.VITE_API_URL;

const Products = () => {

    const [products, setProducts] = useState([])

    // get all product
    const getAllProduct = async () => {
        try {
            const { data } = await axios.get(`${apiUrl}/api/v1/product/get-products`)
            setProducts(data.products)  
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong')
        }
    }

    //lifecycle method
    useEffect(() => {
        getAllProduct()
    }, [])

    return (
        <Layout title={'Dashboard - Products'}>
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9 ">
                        <h1 className='text-center'>All Product List</h1>
                        <div className="d-flex flex-wrap">
                            {products?.map(p => (
                                <Link key={p._id} className='product-link' to={`/dashboard/admin/update-product/${p.slug}`}>
                                    <div className="card m-2" style={{ width: '18rem' }}>
                                        <img src={`${apiUrl}/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} />
                                        <div className="card-body">
                                           <h5 className="card-title">{p.name}</h5>
                                          <p className="card-text">{p.description}</p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Products
