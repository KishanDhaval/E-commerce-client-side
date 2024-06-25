import React, { useState, useEffect } from 'react'
import Layout from '../components/Layouts/Layout'
import { useAuthContext } from '../hooks/useAuthContext'
import { useCart } from '../context/CartContext'
import { Link, useNavigate } from 'react-router-dom';
import DropIn from "braintree-web-drop-in-react";
import axios from 'axios';
import toast from 'react-hot-toast'
const apiUrl = import.meta.env.VITE_API_URL;
const CartPage = () => {

  const { user } = useAuthContext()
  const [cart, setCart] = useCart()
  const [clientToken, setClientToken] = useState('')
  const [instance, setInstance] = useState('')
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate()

  // delete item
  const removeCartItem = async (pid) => {
    try {
      let myCart = [...cart]
      let index = myCart.findIndex(item => item._id === pid)
      myCart.splice(index, 1)
      setCart(myCart)
      localStorage.setItem('cart', JSON.stringify(myCart))
    } catch (error) {
      console.log(error);
    }
  }

  // get payment token gatway
  const getToken = async () => {
    try {
      const { data } = await axios.get(`${apiUrl}/api/v1/product/braintree/token`)
      setClientToken(data?.clientToken)
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }


  const handlePayment = async () => {
    try {
      setLoading(true)
      const { nonce } = await instance.requestPaymentMethod()
      const { data } = await axios.post(`${apiUrl}/api/v1/product/braintree/payment`, {
        nonce, cart
      })
      setLoading(false)
      localStorage.removeItem('cart')
      setCart([])
      navigate('/dashboard/user/orders')
      toast.success("Payment Completed successfully")
    } catch (error) {
      setLoading(false)
      console.log(error);
    }
  }

  // total price
  const totalPrice = () => {
    try {
      let total = 0
      cart?.map((item) => (
        total = total + item.price
      ))
      return total.toLocaleString('en-US', {
        style: 'currency',
        currency: "USD"
      })
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getToken()
  }, [user])

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2 mb-3">
              {
                `Hello, ${user?.token ? user?.name : ''}`
              }
            </h1>
            <h4 className="text-center">
              {cart?.length > 0 ? `${cart.length} items in your cart ${user?.token ? "" : 'please login to chekout'}` : (<p>Cart is empty <Link style={{color:'#0f32a3', textDecoration: 'none'}} to='/'>explore</Link> " & make order now!!!</p>)}
            </h4>
          </div>
        </div>
        {cart.length > 0 &&
          <div className="row">
            <div className="col-md-8">
              {cart?.map((p) => (
                <div key={p._id} className="row mb-2 card flex-row">
                  <div className="col-md-4 m">
                    <img
                      src={`${apiUrl}/api/v1/product/product-photo/${p._id}`}
                      className="card-img-top"
                      alt={p.name}
                    />
                  </div>
                  <div className="col-md-8 p-3">
                    <h3>
                      {p.name}
                    </h3>
                    <h6>{p.description}</h6>
                    <h6>${p.price}</h6>
                    <button className='btn btn-danger' onClick={() => removeCartItem(p._id)}>remove</button>
                  </div>
                </div>
              ))}
            </div>
            <div className="col-md-4 text-center">
              <h3>Cart Summery</h3>
              <p>Total | Checkout | Payment</p>
              <hr />
              <h4>Total : {totalPrice()}</h4>
              {user?.address ?
                <>
                  <div className="mb-3">
                    <h4>Current Address :</h4>
                    <h5>{user?.address}</h5>
                    <button className='btn btn-outline-warning' onClick={() => navigate('/dashboard/user/profile')}>Update Address</button>
                  </div>
                </>
                :
                <>
                  <div className="mb-3">
                    {
                      user?.token ?
                        (

                          <button
                            className='btn btn-outline-warning'
                            onClick={() => navigate('/dashboard/user/profile')}
                          >
                            Update Address
                          </button>
                        )
                        :
                        (
                          <button
                            className='btn btn-outline-warning'
                            onClick={() => navigate('/login', {
                              state: '/cart'
                            })}
                          >
                            Please login to checkout
                          </button>
                        )
                    }
                  </div>
                </>
              }

              <div className="mt-2">
                {
                  !clientToken || !cart?.length ? ('') : (
                    <>
                      <DropIn
                        options={{
                          authorization: clientToken,
                          paypal: {
                            flow: 'vault'
                          }
                        }}
                        onInstance={(instance) => setInstance(instance)}
                      />

                      <button className='btn btn-primary' onClick={handlePayment} disabled={loading || !instance || !user?.address}>
                        {loading ? 'Processing' : 'Make Payment'}
                      </button>
                    </>
                  )
                }

              </div>
            </div>
          </div>
        }
      </div>
    </Layout>
  )
}

export default CartPage
