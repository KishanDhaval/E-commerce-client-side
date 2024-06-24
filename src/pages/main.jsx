import React from 'react'
import styles from './main.module.css'
import Cart from '../../../cart/src/components/Cart'
import Layout from '../components/Layouts/Layout';
import axios from 'axios';
import { Checkbox, Radio } from 'antd';
import { Prices } from '../components/Prices';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

const main = () => {
    const navigate = useNavigate()

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [checked, setChecked] = useState([]);
    const [radio, setRadio] = useState([]);
    const [total, setTotal] = useState(0)
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const [cart, setCart] = useCart()



    // Get all products
    const getAllProduct = async () => {
        try {
            setLoading(true)
            const { data } = await axios.get(`${apiUrl}/api/v1/product/product-list/${page}`);
            setLoading(false)
            setProducts(data.products);
        } catch (error) {
            setLoading(false)
            console.log(error);
        }
    };

    useEffect(() => {
        getAllProduct();
    }, []);

    // Get all categories
    const getAllcategory = async () => {
        try {
            const { data } = await axios.get(`${apiUrl}/api/v1/category/get-category`);
            if (data?.success) {
                setCategories(data?.category);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllcategory();
        getTotal()
    }, []);

    // Filter by category
    const handleFilter = (value, id) => {
        const updatedChecked = value ? [...checked, id] : checked.filter(c => c !== id);
        setChecked(updatedChecked);
    };

    // Get filtered products
    const filterProduct = async () => {
        try {
            const { data } = await axios.post(`${apiUrl}/api/v1/product/product-filter`, { checked, radio });
            setProducts(data.products);
        } catch (error) {
            console.log(error);
        }
    };

    // getTotal count
    const getTotal = async () => {
        try {
            const { data } = await axios.get(`${apiUrl}/api/v1/product/product-count`)
            setTotal(data?.total)
        } catch (error) {
            console.log(error);
        }
    }

    // loadMore
    const loadMore = async () => {
        try {
            setLoading(true)
            const { data } = await axios.get(`${apiUrl}/api/v1/product/product-list/${page}`)
            setLoading(false)
            setProducts([...products, ...data?.products])
        } catch (error) {
            setLoading(false)
            console.log(error);
        }
    }

    // for loadmore button change on  number of page change
    useEffect(() => {
        if (page === 1) return
        loadMore()
    }, [page])


    // Fetch products or filter products based on checked and radio states
    useEffect(() => {
        if (checked.length || radio.length) {
            filterProduct();
        } else {
            getAllProduct();
        }
    }, [checked, radio]);

    // Reset filters
    const resetFilters = () => {
        setChecked([]);
        setRadio([]);
        getAllProduct();
    };


    return (
        <div className={styles.container}>
            <div className={styles.home}>
                <div className={styles.left}>
                    <div className={styles.filter}>
                        <h2>Filter By Category</h2>
                        {categories?.map((c) => (
                            <div key={c._id} className={styles.input}>
                                <input onChange={(e) => handleFilter(e.target.checked, c._id)} type="checkbox" name="category" id="category" />
                                <label htmlFor="category">{c.name}</label>
                            </div>
                        ))}
                    </div>
                    <div className={styles.filter}>
                        <h2>Filter By Price</h2>
                        {Prices?.map((p) => (
                            <div key={p.id} className={styles.input}>
                                <input onChange={(e) => setRadio(e.target.value)} value={p.array} type="radio" name="filste" id="filste" />
                                <label htmlFor="filste">{p.name}</label>
                            </div>
                        ))}
                    </div>
                    <button className={styles.filterReset}>reset filter</button>
                </div>
                <div className={styles.right}>
                    <Cart />
                </div>
            </div>
        </div >
    )
}

export default main
