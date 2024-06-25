import React, { useState } from 'react'
import Layout from '../components/Layouts/Layout'
import { useSearch } from '../context/SearchContext'
import Card from '../components/Card';

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
                            <Card  product={p} />
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    )
}
export default Search
