import React from 'react'
import styles from './SearchInput.module.css'
import { useSearch } from '../../context/SearchContext'
import { useNavigate } from 'react-router-dom';
import { GoSearch } from "react-icons/go";

const apiUrl = import.meta.env.VITE_API_URL;
import axios from 'axios'

const SearchInput = () => {

    const [values, setValues] = useSearch()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.get(`${apiUrl}/api/v1/product/search/${values.keyword}`)
            setValues({ ...values, results: data })
            console.log(values);
            navigate('/search')
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <form className="d-flex" role="search" onSubmit={handleSubmit}>
                <div className={styles.searchBar}>
                    <input
                        type="search"
                        name="search"
                        id="search"
                        placeholder='Search...'
                        value={values.keyword}
                        onChange={(e) => {
                            setValues({ ...values, keyword: e.target.value })
                        }}
                    />
                    <button type='submit'><GoSearch /></button>
                </div>
            </form>
        </div>
    )
}

export default SearchInput
