import React, { useState, useEffect } from 'react';
import Layout from '../components/Layouts/Layout';
import axios from 'axios';
import { Prices } from '../components/Prices';
import styles from './Home.module.css'
import Loader from '../components/Loader';
import Card from '../components/Card';
import { Link } from 'react-router-dom';

const apiUrl = import.meta.env.VITE_API_URL;

const Home = () => {

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [btnLoading, setBtnLoading] = useState(false)


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
      setBtnLoading(true)
      const { data } = await axios.get(`${apiUrl}/api/v1/product/product-list/${page}`)
      setBtnLoading(false)
      setProducts([...products, ...data?.products])
    } catch (error) {
      setBtnLoading(false)
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
    if (checked.length > 0 || radio.length > 0) {
      setChecked([]);
      setRadio([]);
      getAllProduct();
    }
  };




  return (
    <Layout title={'All Products - Best offers'}>
      <div className={styles.container}>
        <div className={styles.home}>
          <div className={styles.left}>
            <div className={styles.filter}>
              <h5>Filter By Category</h5>
              {loading ?
                <p>Loading...</p>
                : (categories?.map((c) => (
                  <>
                    <div key={c._id} className={styles.input}>
                      <input onChange={(e) => handleFilter(e.target.checked, c._id)} checked={checked.includes(c._id)} type="checkbox" name="category" id="category" />
                      <label htmlFor="category">{c.name}</label>
                    </div>
                    {c?.children?.length > 0 && (
                      c.children.map((sub) => (
                        <div key={sub._id} className={styles.input}>
                          --<input onChange={(e) => handleFilter(e.target.checked, sub._id)} checked={checked.includes(sub._id)} type="checkbox" name="category" id="category" />
                          <label htmlFor="category">{sub.name}</label>
                        </div>
                      ))
                    )}
                  </>
                )))}
            </div>
            <div className={styles.filter}>
              <h5>Filter By Price</h5>
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
            {loading ?
              <Loader />
              :
              <>
                {products.length===0 ? <h2>There is no product in this range or category!</h2> :<h1 className="text-center">All Products</h1>}
                <div className="d-flex flex-wrap  ">
                  {products.length ===0 ? <p>Try another</p>:
                  products?.map((p) => (
                    <Card product={p} />
                  ))}
                </div>
                <div className="m-2 p-2 text-center">
                  {(checked.length === 0 && radio.length === 0) && products.length >0 && products.length < total && (
                    <button className='btn btn-warning'
                      onClick={(e) => {
                        e.preventDefault()
                        setPage(page + 1);
                      }}
                    >
                      {btnLoading ? "Loading..." : "LoadMore"}
                    </button>
                  )}
                </div>
              </>
            }
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
