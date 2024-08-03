import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layouts/Layout';
import AdminMenu from '../../components/Layouts/AdminMenu';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { Select } from 'antd';
import axiosInstance from '../../utils/axiosConfig';
const { Option } = Select;

const CreateProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [shipping, setShipping] = useState('');
  const [quantity, setQuantity] = useState('');
  const [photo, setPhoto] = useState(null);

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

  const handleCreate = async (e) => {
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

      const { data } = await axiosInstance.post(`/api/v1/product/create-product`, productData);
      if (data?.success) {
        toast.success(data?.message);
        // navigate('/dashboard/admin/products');
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };

  return (
    <Layout title={'Dashboard - Create product'}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Create Product</h1>
            <div className="m-1 w-75">
              <form onSubmit={handleCreate}>
                <Select
                  bordered={false}
                  placeholder="Select a category"
                  size="large"
                  showSearch
                  className="form-select mb-3"
                  onChange={(value) => setCategory(value)}
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
                  {photo && (
                    <div className="text-center">
                      <img src={URL.createObjectURL(photo)} alt="Product photo" height="200px" className="img img-responsive" />
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
                  >
                    <Option value="false">No</Option>
                    <Option value="true">Yes</Option>
                  </Select>
                </div>
                <div className="mb-3">
                  <button className="btn btn-primary">CREATE PRODUCT</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
