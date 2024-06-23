import React ,{useState , useEffect}from 'react'
import Layout from '../components/Layouts/Layout'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom';

const apiUrl = import.meta.env.VITE_API_URL;

const CategoryProduct = () => {
const params = useParams()
    const [products , setProducts] = useState([])
    const [category , setCategory] = useState([])
    const navigate = useNavigate()

    const getProductByCat =async()=>{
        try {
            const {data} = await axios.get(`${apiUrl}/api/v1/product/product-category/${params.slug}`)
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

export default CategoryProduct
