import React, { useState, useEffect } from 'react';
import Layout from '../components/Layouts/Layout';
import axios from 'axios';
import { Checkbox, Radio } from 'antd';
import { Prices } from '../components/Prices';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

const apiUrl = import.meta.env.VITE_API_URL;

const Home = () => {
  const navigate = useNavigate()
  
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total , setTotal] = useState(0)
  const [page , setPage] = useState(1)
  const [loading , setLoading] = useState(false)
  const [cart , setCart]  = useCart()




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
    const getTotal = async ()=>{
      try {
        const {data} = await axios.get(`${apiUrl}/api/v1/product/product-count`)
        setTotal(data?.total)      
      } catch (error) {
        console.log(error);
      }
    }

    // loadMore
    const loadMore =async()=>{
      try {
        setLoading(true)
        const {data} =await axios.get(`${apiUrl}/api/v1/product/product-list/${page}`)
        setLoading(false)
        setProducts([...products ,...data?.products])
      } catch (error) {
        setLoading(false)
        console.log(error);       
      }
    }

    // for loadmore button change on  number of page change
    useEffect(()=>{
     if(page === 1) return
     loadMore()
    },[page])


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
      <div className="row ">
        <div className="col-md-2 ">
          <h4 className="text-center">Filter by category</h4>
          <div className="d-flex flex-column ms-2 ">
            {categories?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
                checked={checked.includes(c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>
          <h4 className="text-center">Filter by Price</h4>
          <div className="d-flex flex-column ms-2">
            <Radio.Group
              onChange={(e) => setRadio(e.target.value)}
              value={radio}
            >
              {Prices?.map((p) => (
                <div key={p.id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <button  className="m-3 btn btn-danger" onClick={resetFilters}>
            Reset Filters
          </button>
        </div>
        <div className="col-md-9">
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
                  <button className="btn btn-primary ms-1" onClick={()=>navigate(`/product/${p.slug}`)}>More details</button>
                  <button className="btn btn-secondary ms-1" onClick={()=>{
                    setCart([...cart , p])
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
            onClick={(e)=>{
              e.preventDefault()
              setPage(page + 1);
            }}
            >
              {loading ? "Loading..." :"LoadMore"}
            </button>
          )}
        </div>
        </div>
        
      </div>
    </Layout>
  );
};

export default Home;
