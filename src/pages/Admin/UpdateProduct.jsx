import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layouts/Layout';
import AdminMenu from '../../components/Layouts/AdminMenu';
import toast from 'react-hot-toast';
import { Select } from 'antd';
import { useNavigate ,useParams } from 'react-router-dom';
import axiosInstance from '../../utils/axiosConfig';

const { Option } = Select;
const apiUrl = import.meta.env.VITE_API_URL;

const UpdateProduct = () => {

    const navigate = useNavigate();
    const params = useParams()
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [shipping, setShipping] = useState('');
    const [quantity, setQuantity] = useState('');
    const [photo, setPhoto] = useState(null);
    const [id , setId] = useState('')
  


    // get a single product
    const getSingleProduct = async (slug)=>{
        try {
            const {data} = await axiosInstance.get(`/api/v1/product/get-product/${params.slug}`)
            setName(data.product.name)
            setDescription(data.product.description)
            setPrice(data.product.price)
            setQuantity(data.product.quantity)
            setShipping(data.product.shipping)
            setCategory(data.product.category._id)
            setId(data.product._id)
        } catch (error) {
            console.log(error);
            toast.error(`Something went wrong in getting ${data.product.name}`);
        }
    }

    useEffect(()=>{
        getSingleProduct()
        //eslint-disable-next-line
    },[])

    // get all category
    const getAllcategory = async () => {
      try {
        const { data } = await axiosInstance.get(`/api/v1/category/get-category`);
        if (data?.success) {
          setCategories(data?.category);
        }
      } catch (error) {
        console.log(error);
        toast.error('Something went wrong in getting category');
      }
    };
  
    useEffect(() => {
      getAllcategory();
    }, []);
  
    const handleUpdate = async (e) => {
      e.preventDefault();
      try {
        const productData = new FormData();
        productData.append('name', name);
        productData.append('price', price);
        productData.append('description', description);
        productData.append('category', category);
        productData.append('shipping', shipping);
        productData.append('quantity', quantity);
        if (photo) {
          productData.append('photo', photo);
        }
  
        const { data } = await axiosInstance.put(`/api/v1/product/update-product/${id}`, productData);
        if (data?.success) {
          toast.success(data?.message);
        } else {
          toast.error(data?.message);
        }
      } catch (error) {
        console.log(error);
        toast.error('Something went wrong');
      }
    };
  

    // handle delete
    const handleDelete = async ()=>{
        try {
            let answer = window.prompt('Are you sure?')
            if(!answer) return;
            const {data} = await axiosInstance.delete(`/api/v1/product/delete-product/${id}`)
            toast.success(data.success)
            navigate('/dashboard/admin/products')
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong');
        }
    }

  return (
    <Layout title={'Dashboard - Create product'}>
    <div className="container-fluid m-3 p-3">
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1>Update Product</h1>
          <div className="m-1 w-75">
            <form onSubmit={handleUpdate}>
              <Select
                bordered={false}
                placeholder="Select a category"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => setCategory(value)}
                value={category}
              >
                {categories?.map((c) => (
                    <React.Fragment key={c._id}>
                      <Option value={c._id}>
                        {c.name}
                      </Option>
                      {c.children?.length > 0 &&
                        c.children.map((sub) => (
                          <Option key={sub._id} value={sub._id}>
                            -- {sub.name}
                          </Option>
                        ))
                      }
                    </React.Fragment>
                  ))}
              </Select>
              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12">
                  {photo ? photo.name : 'Upload Photo'}
                  <input type="file" name="photo" accept="image/*" onChange={(e) => setPhoto(e.target.files[0])} hidden />
                </label>
              </div>
              <div className="mb-3">
                {photo ?(
                  <div className="text-center">
                    <img src={URL.createObjectURL(photo)} alt="Product photo" height="200px" className="img img-responsive" />
                  </div>
                ):(
                    <div className="text-center">
                    <img src={`${apiUrl}/api/v1/product/product-photo/${id}`} alt="Product photo" height="200px" className="img img-responsive" />
                  </div>
                )}
              </div>
              <div className="mb-3">
                <input type="text" value={name} placeholder="Write a name" className="form-control" onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="mb-3">
                <textarea type="text" value={description} placeholder="Write Description" className="form-control" onChange={(e) => setDescription(e.target.value)} />
              </div>
              <div className="mb-3">
                <input type="number" value={price} placeholder="Write a Price" className="form-control" onChange={(e) => setPrice(e.target.value)} />
              </div>
              <div className="mb-3">
                <input type="number" value={quantity} placeholder="Write a quantity" className="form-control" onChange={(e) => setQuantity(e.target.value)} />
              </div>
              <div className="mb-3">
                <Select
                  bordered={false}
                  placeholder="Select Shipping"
                  showSearch
                  size="large"
                  className="form-select mb-3"
                  onChange={(value) => setShipping(value)}
                  value={shipping ? "yes" :"No"}
                >
                  <Option value="false">No</Option>
                  <Option value="true">Yes</Option>
                </Select>
              </div>
              <div className="mb-3">
                <button className="btn btn-primary">UPDATE PRODUCT</button>
              </div>
                <button className="btn btn-danger" onClick={handleDelete}>DELETE PRODUCT</button>
              <div className="mb-3" >
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </Layout>
  )
}

export default UpdateProduct
