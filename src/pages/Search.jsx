import React, { useState } from 'react'
import Layout from '../components/Layouts/Layout'
import { useSearch } from '../context/SearchContext'
const apiUrl = import.meta.env.VITE_API_URL;


const Search = () => {

    const [values, setValues] = useSearch()
    return (
        <Layout title={'Search results'}>
            <div className="Container">
                <div className="text-center">
                    <h1>Search Results</h1>
                    <h6>{values?.results.length < 1 ? "No product found" : `Found ${values?.results.length}`}</h6>
                    <div className="d-flex flex-wrap mt-4">
                        {values?.results.map((p) => (
                            <div key={p._id} className="card m-2" style={{ width: '18rem' }}>
                                <img
                                    src={`${apiUrl}/api/v1/product/product-photo/${p._id}`}
                                    className="card-img-top"
                                    alt={p.name}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{p.name}</h5>
                                    <p className="card-text">{p.description.substring(0, 30)}...</p>
                                    <p className="card-text">$ {p.price}</p>
                                    <button className="btn btn-primary ms-1">More details</button>
                                    <button className="btn btn-secondary ms-1">Add to cart</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Search
