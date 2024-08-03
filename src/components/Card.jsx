import React from 'react'
import toast from 'react-hot-toast'
import styles from './Card.module.css'
import { useCart } from '../context/CartContext';
const apiUrl = import.meta.env.VITE_API_URL;
import {useNavigate} from 'react-router-dom'

const Card = ({product}) => {
    const navigate = useNavigate()
    const [cart , setCart]  = useCart()
    return (
        <div>
            <div key={product._id} className={styles.card} >
                <img
                    src={`${apiUrl}/api/v1/product/product-photo/${product._id}`}
                    className={styles.img}
                    alt={product.name}
                />
                <div className={styles.description}>
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">{product.description.substring(0, 30)}...</p>
                    <p className={styles.price}>$ {product.price}</p>
                    <div className={styles.buttons}>
                        <button className={styles.moreBtn} onClick={() => navigate(`/product/${product.slug}`)}>More details</button>
                        <button className={styles.addBtn} onClick={() => {
                            setCart([...cart,product])
                            localStorage.setItem("cart", JSON.stringify([...cart, product]))
                            toast.success("Item added to cart ")
                        }}>Add to cart</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card
