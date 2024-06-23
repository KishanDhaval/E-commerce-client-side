import React from 'react'
import { useState, useEffect } from 'react'
import AdminMenu from '../../components/Layouts/AdminMenu'
import Layout from '../../components/Layouts/Layout'
import toast from 'react-hot-toast';
import axios from 'axios'
import CategoryForm from '../../components/Form/CategoryForm'
const apiUrl = import.meta.env.VITE_API_URL;
import { Modal } from 'antd';


const CreateCategory = () => {


  const [categories, setCategories] = useState([])
  const [name, setName] = useState('')
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState()
  const [updatedName, setUpdatedName] = useState()

  // handle form
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post(`${apiUrl}/api/v1/category/create-category`, { name })
      if (data?.success) {
        toast.success(`${data.message}`)
        getAllcategory()
      } else {
        toast.error(`${data.message}`)
      }
    } catch (error) {
      console.log(error);
      toast.error('something went wrong in input form')

    }
  }


  // get All category
  const getAllcategory = async () => {
    try {
      const { data } = await axios.get(`${apiUrl}/api/v1/category/get-category`)
      if (data?.success) {
        setCategories(data?.category)
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong in getting category")
    }
  }

  useEffect(() => {
    getAllcategory()
  }, [])


  // update category
  const handleUpdate = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.put(`${apiUrl}/api/v1/category/update-category/${selected._id}`, { name: updatedName })
      if (data.success) {
        toast.success(data.message)
        setSelected(null)
        setUpdatedName('')
        setVisible(false)
        getAllcategory()
      }
      else {
        toast.error('data.message')
      }
    } catch (error) {
      toast.error('Something went wrong')
    }
  }


  // delete category
  const handleDelete = async (pid) => {
    try {
      const { data } = await axios.delete(`${apiUrl}/api/v1/category/delete-category/${pid}`)
      if (data.success) {
        toast.success(data.message)
        getAllcategory()
      }
      else {
        toast.error('data.message')
      }
    } catch (error) {
      toast.error('Something went wrong')
    }
  }


  return (
    <Layout title={'Dashboard - Create category'}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Manage Category</h1>
            <div className="p-3 w-50">
              <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName} />
            </div>
            <div className="w-75">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">name</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((c) => (
                    <tr key={c._id}>
                      <>
                        <td >{c.name}</td>
                        <td>
                          <button className='btn btn-primary ms-2'
                            onClick={() => {
                              setVisible(true);
                              setUpdatedName(c.name);
                              setSelected(c)
                            }}
                          >
                            Edit
                          </button>
                          <button className='btn btn-danger ms-2'
                            onClick={() => handleDelete(c._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Modal
              onCancel={() => setVisible(false)}
              footer={null}
              open={visible}
            >
              <CategoryForm value={updatedName} setValue={setUpdatedName} handleSubmit={handleUpdate}></CategoryForm>
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default CreateCategory
