import React, { useState, useEffect } from 'react';
import Layout from '../components/Layouts/Layout';
import axios from 'axios';
import { Checkbox, Radio } from 'antd';
import { Prices } from '../components/Prices';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';
import styles from './Home.module.css'

const apiUrl = import.meta.env.VITE_API_URL;

const Home = () => {
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
    <Layout title={'All Products - Best offers'}>
      <div className={styles.container}>
        <div className={styles.home}>
          <div className={styles.left}>
            <div className={styles.filter}>
              <h3>Filter By Category</h3>
              {categories?.map((c) => (
                <div key={c._id} className={styles.input}>
                  <input onChange={(e) => handleFilter(e.target.checked, c._id)} checked={checked.includes(c._id)} type="checkbox" name="category" id="category" />
                  <label htmlFor="category">{c.name}</label>
                </div>
              ))}
            </div>
            {JSON.stringify()}
            <div className={styles.filter}>
              <h3>Filter By Price</h3>
              {Prices?.map((p) => (
                <div key={p.id} className={styles.input}>
                  <input onChange={() => setRadio(p.array)} checked={radio === p.array} type="radio" name="filste" id="filste" />
                  <label htmlFor="filste">{p.name}</label>
                </div>
              ))}

            </div>
            <button className={styles.filterReset} onClick={resetFilters}>
              reset filter
            </button>
          </div>
          <div className={styles.right}>
            <h1 className="text-center">All Products</h1>
            <div className="d-flex flex-wrap">
              {products?.map((p) => (
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
                    <button className="btn btn-primary ms-1" onClick={() => navigate(`/product/${p.slug}`)}>More details</button>
                    <button className="btn btn-secondary ms-1" onClick={() => {
                      setCart([...cart, p])
                      localStorage.setItem("cart", JSON.stringify([...cart, p]))
                      toast.success("Item added to cart ")
                    }}>Add to cart</button>
                  </div>
                </div>
              ))}
            </div>
            <div className="m-2 p-2">
              {products && products.length < total && (
                <button className='btn btn-warning'
                  onClick={(e) => {
                    e.preventDefault()
                    setPage(page + 1);
                  }}
                >
                  {loading ? "Loading..." : "LoadMore"}
                </button>
              )}
            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
};

export default Home;
