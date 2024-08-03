import React ,{useState , useEffect}from 'react'
import Layout from '../components/Layouts/Layout'
import axios from 'axios'
import { useParams } from 'react-router-dom';
import Card from '../components/Card';
import axiosInstance from '../utils/axiosConfig';

const apiUrl = import.meta.env.VITE_API_URL;

const CategoryProduct = () => {
const params = useParams()
    const [products , setProducts] = useState([])
    const [category , setCategory] = useState([])

    const getProductByCat =async()=>{
        try {
            const {data} = await axiosInstance.get(`/api/v1/product/product-category/${params.slug}`)
            setProducts(data?.products)
            setCategory(data?.category)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
       if(params?.slug) getProductByCat()
    },[params?.slug])

  return (
    <Layout>
      <div className="container">
        <h4 className='text-center'>category :{category?.name}</h4>
        <h6 className='text-center'>{products?.length} result found</h6>
       <div className="row">
       <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <Card product={p}/>
            ))}
          </div>
       </div>
      </div>
    </Layout>
  )
}
export default CategoryProduct
