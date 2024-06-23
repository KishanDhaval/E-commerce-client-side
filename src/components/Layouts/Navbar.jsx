import styles from './Navbar.module.css';
import React from 'react';
import { Link , NavLink } from 'react-router-dom';
import { useAuthContext } from "../../hooks/useAuthContext";
import { useLogout } from '../../hooks/useLogout';
import SearchInput from '../Form/SearchInput';
import useCategory from '../../hooks/useCategory';
import { useCart } from '../../context/CartContext';
import { LuShoppingCart } from "react-icons/lu";


const Navbar = () => {

    const { user } = useAuthContext();
    const { logout } = useLogout();
    const { categories } = useCategory()
    const [cart] = useCart()
    


    const handleLogout = () => {
        logout();
    };


    return (
        <nav className={styles.Nav}>
            <div className={styles.logo}>
                <Link to="/" >E-commerce</Link>
            </div>
            <div className={styles.main_menu}>
                <ul className={styles.nav_part2}>
                    <SearchInput />
                    <li><Link to="/" className={styles.active}>Home</Link></li>
                    <li className={styles.has_dropdown}>
                        <Link to="#">Category <i className="fas fa-angle-down"></i></Link>
                        <ul className={styles.sub_menu}>
                            <li><Link to="/categories">All Category</Link></li>
                            {categories?.map((c) => (
                                <li key={c._id}><Link to={`/category/${c.slug}`}>{c.name}</Link></li>
                            ))}
                        </ul>
                    </li>
                    {user ? (
                        <>
                            <li className={styles.has_dropdown}>
                                <Link to="#">{user?.name.split(' ')[0]}<i className="fas fa-angle-down"></i></Link>
                                <ul className={styles.sub_menu}>
                                    <li><Link to={`/dashboard/${user?.role === 1 ? 'admin' : 'user'}`}>Dashboard</Link></li>
                                    <li><Link onClick={handleLogout}>Logout</Link></li>
                                </ul>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className={styles.has_dropdown}>
                                <Link to="/login">Login</Link>
                            </li>
                        </>
                    )}
                    <li>
                        <Link className={cart.length ? styles.cart : styles.tempCart} to="/cart">
                            <LuShoppingCart />
                            Cart
                        </Link>
                    </li>
                </ul>
            </div>

        </nav>
    );
};

export default Navbar;
