import React, { useState, useEffect } from 'react';
import Layout from '../components/Layouts/Layout';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Card from '../components/Card';
const apiUrl = import.meta.env.VITE_API_URL;

const ProductDetail = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate  = useNavigate()
  const [relatedProduct, setRelatedProduct] = useState([])


  useEffect(() => {
    if (slug) {
      getProduct();
    }
  }, [slug]);

  const getProduct = async () => {
    try {
      const { data } = await axios.get(`${apiUrl}/api/v1/product/get-product/${slug}`);
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id)
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(`${apiUrl}/api/v1/product/related-product/${pid}/${cid}`)
      setRelatedProduct(data?.products)
    } catch (error) {
      console.log();
    }
  }

  if (loading) {
    return (
      <Layout>
        <div className="container mt-2">
          <h2>Loading...</h2>
        </div>
      </Layout>
    );
  }

  return (
    <Layout  title={'Ecommerce - product detail'}>
      <div className="row container mt-2">
        <div className="col-md-4">
          <img
            src={`${apiUrl}/api/v1/product/product-photo/${product._id}`}
            className="card-img-top"
            alt={product.name}
          />
        </div>
        <div className="col-md-6">
          <h1 className="text-center">Product Details</h1>
          <h6>Name: {product.name}</h6>
          <h6>Description: {product.description}</h6>
          <h6>Price: ${product.price}</h6>
          <h6>Category: {product.category?.name}</h6>
          <h6>Shipping: {product.shipping ? 'Available' : 'Not Available'}</h6>
          <button className="btn btn-secondary ms-1">Add to cart</button>
        </div>
      </div>
      <hr />
      <div className="row mt-4 ">
        <h1 className="text-center">Similar Products</h1>
        {relatedProduct.length <1 && (<p className='text-center'>No Similar products found</p>)}
        <div className="d-flex flex-wrap">
            {relatedProduct?.map((p) => (
              <Card product={p}/>
            ))}
          </div>

       
      </div>
    </Layout>
  );
};

export default ProductDetail;
